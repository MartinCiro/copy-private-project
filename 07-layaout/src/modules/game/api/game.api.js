const {
  handleApiRequest,
  getListarGame,
  actualizaGame,
  crearGame,
  eliminarGames
} = require("../controller/game.controller");
const ResponseBody = require("../../../shared/model/ResponseBody.model");

const crearGameAPI = async (req, res) => {
  const { id, nombre, descripcion } = req.body;
  try {
    contratoResponse = await crearGame({ id, nombre, descripcion });
    message = new ResponseBody(true, 200, {
      message: "Se ha creado el Game exitosamente",
    });
  } catch (error) {
    if (error.data) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      message = new ResponseBody(false, 500, {
        message:
          "Ha ocurrido un error inesperado. Por favor inténtelo nuevamente más tarde",
      });
    }
  }

  return res.json(message);
};

const listarGameAPI = async (req, res) => {
  const {id} = req.body;
  let message;
  try {
    const resultado = await handleApiRequest();
    message = new ResponseBody(true, 200, resultado);
  } catch (error) {
    if (error.status_cod) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(
        false,
        500,
        "Ocurrió un error en el proceso para listar las fechas"
      );
    }
  }

  return res.json(message);
};

const actualizarGameAPI = async (req, res) => {
  const { id, nombre, descripcion } = req.body;
  try {
    await actualizaGame({ id, nombre, descripcion });
    message = new ResponseBody(true, 200, {
      message: "Se ha actualizado los datos exitosamente",
    });
  } catch (error) {
    if (error.status_cod) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, {
        message:
          "Ha ocurrido un error inesperado. Por favor inténtelo nuevamente más tarde.",
      });
    }
  }

  return res.json(message);
};

const eliminarGameAPI = async (req, res) => {
  const {id}  = req.body;
  let message;
  try {
    const resultado = await eliminarGames({id});
    message = new ResponseBody(true, 200, resultado);
  } catch (error) {
    if (error.status_cod) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(
        false,
        500,
        "Ocurrió un error en el proceso para listar las fechas"
      );
    }
  }

  return res.json(message);
};

module.exports = {
  listarGameAPI,
  actualizarGameAPI,
  crearGameAPI,
  eliminarGameAPI
};