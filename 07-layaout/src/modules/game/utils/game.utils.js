const { client_encoding } = require("pg/lib/defaults.js");
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
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function fetchData(endpoint, body, metodo = "post", retries = 3, backoff = 2000) {
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
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : backoff;
      if (retries > 0) {
        console.warn(`Rate limit exceeded. Retrying after ${waitTime / 1000} seconds.`);
        await delay(waitTime);
        return await fetchData(endpoint, body, metodo, retries - 1, backoff * 2);
      } else {
        throw new Error('Too many requests. Please try again later.');
      }
    } else if (error.response && error.response.status === 401) {
      console.log(error.response.data);
    } else {
      console.error(error.response);
      throw {
        ok: false,
        status_cod: error.response.status,
        data: `Ha ocurrido un error consultando la información en la API: ${error.message}`
      };
    }
  }
}



/* async function getListarGames(param) {
  const tiempoEspera = 3000;
  const vectorJuego = [];

  if (param.length > 0) {
    const promises = param.map(async (element) => {
      const bodyJuego = `f screenshots.url, name, summary, genres.name; where id = ${element.id};`;
      const game = await fetchData('games', bodyJuego);
      //game[0].uuid = element.uid;
      return game;
    });
    Promise.allSettled(promises)
      .then((result) => {
        console.log(result)
        result.forEach((promiseResult) => {
          if (promiseResult.status === 'fulfilled') {
            vectorJuego.push(promiseResult.value); // Agregar el valor resuelto al vectorJuego
          } else {
            console.error('Fallo: ', promiseResult.reason); // Manejar cualquier error que pueda ocurrir
          }
        });
      })
      .catch((error) => {
        console.log(error)
        throw {
          ok: false,
          status_cod: 500,
          data: `No se ha encontrado el juego ${param.id}`,
        };
      });
  }
} */


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
  /* getListarGames */
};
