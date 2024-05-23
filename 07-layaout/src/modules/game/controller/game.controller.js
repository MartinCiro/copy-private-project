const clienteUtils = require("../utils/game.utils");

async function crearGame(dataGame) {
  const { id, nombre, descripcion } = dataGame;

  clienteUtils.validar(id, "el id");
  clienteUtils.validar(nombre, "el nombre");

  return await clienteUtils
    .crearGame(dataGame)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error.status_cod) throw error;
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error inesperado y el rol no ha sido creado",
      };
    });
}

async function getListarGame(element) {
  try {
    return await clienteUtils.getListarGame(element);
  } catch (error) {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ha ocurrido un error consultando la información en base de datos",
    };
  }
}

async function actualizaGame(options) {
  const { id, nombre, descripcion  } = options;
  clienteUtils.validar(id, "el elemento a modificar");
  await clienteUtils.actualizaGame(options).catch((error) => {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ocurrió un error inesperado y el cliente no ha sido actualizado",
    };
  });
}

async function eliminarGames(iden) {
  const { id } = iden;

  clienteUtils.validar(id, "el id");
  try {
    return await clienteUtils.eliminarGames({ id });
  } catch (error) {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ha ocurrido un error consultando la información en base de datos",
    };
  }
}
module.exports = {
  getListarGame,
  actualizaGame,
  crearGame,
  eliminarGames
};
