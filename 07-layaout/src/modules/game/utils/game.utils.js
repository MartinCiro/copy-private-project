const { connApi } = require("../../../interface/DBConn.js");
const { Pool } = require("pg");
const { query } = require("express");
const axios = require('axios');
const validar = (valor, nombre) => {
  if (!valor)
    throw {
      ok: false,
      status_cod: 400,
      data: `No se ha proporcionado ${nombre}`,
    };
};

const existe = (error, datos) => {
  const errorMessages = {
    duplicateEntry: (field) => `El ${field} ya existe`,
  };

  if (error.code === "23505") {
    const field = datos;
    throw {
      ok: false,
      status_cod: 400,
      data: errorMessages.duplicateEntry(field),
    };
  }
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
    console.error(error);
    throw {
      ok: false,
      status_cod: 500,
      data: `Ha ocurrido un error consultando la información en la API`
    };
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
        emitter.emit('allResults', general);
        emitter.emit('initialResults', general);
        emittedInitialResults = true;
        const results = await Promise.allSettled(batchPromises);
        
        for (const result of results) {
          if (result.status === 'fulfilled') {
            general.push(...result.value);
          } else {
            console.error(`Error fetching data at offset ${contador - batchSize + results.indexOf(result)}: ${result.reason}`);
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

/**
 * @param {string} nombre
 * @param {string} nit
 * @param {string} direccion
 * @param {string} id_sede
 * @returns {
 *      Promise<{
 *          ok: boolean,
 *          status_cod: number,
 *          message: string
 *      }}
 */
async function crearGame(dataGame) {
  const pool = await connApi();

  const params = [dataGame.id, dataGame.nombre, dataGame.descripcion];

  return pool
    .query(
      `
        INSERT INTO Game (id_Game, nombre, descripcion)
        VALUES ($1, $2, $3);
    `,
      params
    )
    .then((data) => {
      return data.rows[0];
    })
    .catch((error) => {
      existe(error, "Game");

      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error insertando el Game",
      };
    })
    .finally(() => pool.end);
}

async function getListarGame() {
  const bodyJuegoExterno = "f game, platform, uid; where category=1; limit 500; offset rem;";
  const bodyGeneros = "f id, name; limit 500;";
  const bodyJuegoEspecifico = "f screenshots.url, name, summary; limit 500;";
  const cantidadOffset = 278999;
  const general = [];
  const batchSize = 3; // Número de peticiones simultáneas
  let contador = 0;
  const delayBetweenBatches = 3000;

  try {
    while (contador < cantidadOffset) {
      const batchPromises = [];
      for (let i = 0; i < batchSize && contador < cantidadOffset; i++) {
        contador++;
        const body = bodyJuegoExterno.replace("rem", contador);
        batchPromises.push(fetchData('external_games', body));
      }
      
      // Ejecutar las peticiones en paralelo y esperar a que todas terminen
      const results = await Promise.allSettled(batchPromises);
      
      // Procesar resultados
      for (const result of results) {
        if (result.status === 'fulfilled') {
          general.push(...result.value);
        } else {
          console.error(`Error fetching data at offset ${contador - batchSize + results.indexOf(result)}: ${result.reason}`);
        }
      }
      
      console.log(`Processed ${contador} offsets. Total games fetched: ${general.length}`);
    }
    
    console.log(`Total games fetched: ${general.length}`);
    await delay(delayBetweenBatches);

    /* const juegoExterno = await fetchData('external_games', bodyJuegoExterno);
    //const generos = await fetchData('genres', bodyGeneros);
    const juegoEspecifico = await fetchData('games', bodyJuegoEspecifico);
    console.log(juegoEspecifico)
    juegoExterno.map(externo => {
      //console.log(externo.game)
      console.log(juegoEspecifico.find(especifico => especifico.id.toString() === externo.uid))
        const especifico = juegoEspecifico.find(especifico => especifico.id.toString() === externo.game);

        if (especifico) {
          return {
            ...externo,
            name: especifico.name,
            screenshots: especifico.screenshots,
            summary: especifico.summary
          };
        }
      }); */
    //return juegoExterno && juegoExterno.length > 0 ? juegoExterno : "No se encontró la data";
  } catch (error) {
    console.error(error);
    throw {
      ok: false,
      status_cod: 500,
      data: `Ha ocurrido un error consultando la información en la API`
    };
  }
};
  
async function actualizaGame(options) {
  const { id, nombre, descripcion } = options;

  if (!id) {
    throw new Error("El campo 'id' es obligatorio");
  }

  let fields = [];
  let params = [id];
  let paramIndex = 2;

  if (nombre !== undefined) {
    fields.push(`nombre = $${paramIndex}`);
    params.push(nombre);
    paramIndex++;
  }

  if (descripcion !== undefined) {
    fields.push(`descripcion = $${paramIndex}`);
    params.push(descripcion);
    paramIndex++;
  }

  if (fields.length === 0) {
    throw new Error(
      "Al menos uno de los campos 'nombre' o 'descripcion' debe ser proporcionado"
    );
  }

  const query = `
    UPDATE Game
    SET ${fields.join(", ")}
    WHERE id_Game = $1;
  `;

  const pool = await connApi();
  return pool
    .query(query, params)
    .then((data) => {
      return data.rowCount > 0 ? data.rows : "No existe";
    })
    .catch((error) => {
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error en base de datos actualizando el Game",
      };
    })
    .finally(() => pool.end());
}

async function eliminarGames(id) {
  const pool = await connApi();
  params = [id.id];
  return pool
    .query(`delete from Game where id_Game=$1`, params)
    .then((data) => {
      return data.rowCount > 0
        ? `El ${id} se elimino correctamente`
        : `El ${id} no existe`;
    })
    .catch((error) => {
      console.log(error);
      if (error.status_cod) throw error;
      error.status_cod ? error : null;
      throw {
        ok: false,
        status_cod: 500,
        data: "Ha ocurrido un error consultando la información en la base de datos",
      };
    })
    .finally(() => pool.end());
}

module.exports = {
  validar,
  fetchData,
  delay,
  startFetchingGames,
  getListarGame,
  actualizaGame,
  crearGame,
  eliminarGames
};