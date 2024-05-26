const { connApi } = require("../../../interface/DBConn.js");
const axios = require('axios');

const validar = (valor, nombre) => {
  if (!valor)
    throw {
      ok: false,
      status_cod: 400,
      data: `No se ha proporcionado ${nombre}`,
    };
};

async function fetchData(endpoint, body, metodo="post") {
  try {
    const config = {
      url: `${connApi.url}${endpoint}`,
      method: metodo,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${connApi.token}`,
        'Client-ID': connApi.clientId,
        'Content-Type': 'text/plain'
      },
      data: body
    };
    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw {
      ok: false,
      status_cod: 500,
      data: `Ha ocurrido un error consultando la información en la API ${error}`
    };
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getListarGames(param) {  
  try {
    if(param.length > 0) {
      const vectorJuego = []
      const promises = param.map(async (element) => {
        const bodyJuego = `f screenshots.url, name, summary, genres.name; where id = ${element.id};`;
        const game = await fetchData('games', bodyJuego);
        game[0].uuid = element.uid;
        vectorJuego.push(game)
      });
      console.log(vectorJuego)
      const result = await Promise.allSettled(promises);
    }
  } catch (error) {
    throw {
      ok: false,
      status_cod: 500,
      data: `No se ha encontrado el juego ${param.id}`,
    };
  }
}

function startFetchingGames() {
  const EventEmitter = require('events');
  const emitter = new EventEmitter();
  const bodyJuegoExterno = "f game, platform, uid; where category=1; limit 500; offset rem;";
  const cantidadOffset = 278999;
  const general = [];
  const batchSize = 2; // Número de peticiones simultáneas
  const delayBetweenBatches = 2000; // 5 segundos de espera entre lotes
  let contador = 0;
  let emittedInitialResults = false;

  async function fetchGames() {
    try {
      while (contador < cantidadOffset) {
        const batchPromises = [];
        for (let i = 0; i < batchSize && contador < cantidadOffset; i++) {
          contador++;
          const body = bodyJuegoExterno.replace("rem", contador);
          batchPromises.push(fetchData('external_games', body));
        }
        const ls = getListarGames(general)
        emitter.emit('allResults', general);
        emitter.emit('initialResults', general);
        emittedInitialResults = true;
        const results = await Promise.allSettled(batchPromises);
        
        for (const result of results) {
          if (result.status === 'fulfilled') {
            general.push(...result.value);
          }
        }
        
        await delay(delayBetweenBatches);
      }
    } catch (error) {
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error insertando el Game",
      };
    }
  }
  fetchGames();
  return emitter;
}



module.exports = {
  validar,
  fetchData,
  delay,
  startFetchingGames,
  getListarGames
};
