const {
  getListarPermiso,
  actualizaPermiso,
  crearRol,
  crearPermiso,
  eliminarPermisos,
  getListarRol,
  actualizaRol,
  eliminarRoles,
} = require("../controller/clientes.controller");
const ResponseBody = require("../../../shared/model/ResponseBody.model");

const crearPermisoAPI = async (req, res) => {
  const { id, nombre, descripcion } = req.body;
  try {
    contratoResponse = await crearPermiso({ id, nombre, descripcion });
    message = new ResponseBody(true, 200, {
      message: "Se ha creado el permiso exitosamente",
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

const listarPermisoAPI = async (req, res) => {
  const {id} = req.body;
  let message;
  try {
    const resultado = await getListarPermiso(id);
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

const actualizarPermisoAPI = async (req, res) => {
  const { id, nombre, descripcion } = req.body;
  try {
    await actualizaPermiso({ id, nombre, descripcion });
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

const eliminarPermisoAPI = async (req, res) => {
  const {id}  = req.body;
  let message;
  try {
    const resultado = await eliminarPermisos({id});
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

const crearRolAPI = async (req, res) => {
  const { rol, descripcion } = req.body;

  try {
    contratoResponse = await crearRol({ rol, descripcion });
    message = new ResponseBody(true, 200, {
      message: "Se ha creado el rol exitosamente",
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

const listarRolAPI = async (req, res) => {
  const {id} = req.body;
  let message;
  try {
    const resultado = await getListarRol(id);
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

const actualizarRolAPI = async (req, res) => {
  const { id, nombre, descripcion } = req.body;
  try {
    await actualizaRol({ id, nombre, descripcion });
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

const eliminarRolAPI = async (req, res) => {
  const {id}  = req.body;
  let message;
  try {
    const resultado = await eliminarRoles({id});
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
  listarPermisoAPI,
  actualizarPermisoAPI,
  crearPermisoAPI,
  eliminarPermisoAPI,
  crearRolAPI,
  listarRolAPI,
  actualizarRolAPI,
  eliminarRolAPI
};
