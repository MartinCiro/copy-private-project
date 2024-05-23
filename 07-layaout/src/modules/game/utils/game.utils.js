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
  const body = "fields category,collection,collections,genres,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots.*,slug,status,summary,tags,themes,url; where category=2;";
  try {

    const data =  await fetchData('games', body)

    return data && data.length > 0 ? data : "No se encontró la data";
  } catch (error) {
    console.error(error);
    throw {
      ok: false,
      status_cod: 500,
      data: `Ha ocurrido un error consultando la información en la API`
    };
  }
}
  
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
  getListarGame,
  actualizaGame,
  crearGame,
  eliminarGames
};
