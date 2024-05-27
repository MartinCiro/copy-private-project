const {
  handleApiRequest,
  dataJuego,
} = require("../controller/game.controller");
const ResponseBody = require("../../../shared/model/ResponseBody.model");

const dataJuegoAPI = async (req, res) => {
  let data;
  let message;
  if(req.length > 3 || req.length == 0) {
    data = req;
  }else {
    const {id, uuid} = req.body;
    data = {id, uuid};
  }
  try {
    const resultado = await dataJuego(data);
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
};

const listarGameAPI = async (req, res) => {
  let message;
  try {
    const resultado = await handleApiRequest();
    dataJuegoAPI(resultado);
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
  dataJuegoAPI,
};
