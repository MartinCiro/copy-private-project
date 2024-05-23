const {
  getListarPermiso,
  actualizaPermiso,
  crearRol,
  crearPermiso,
  eliminarPermisos,
  getListarRol,
  actualizaRol,
  eliminarRoles,
  crearUsuario, 
  listarUsuario, 
  actualizarUsuario, 
  eliminarUsuario,
  crearGame, 
  listarGame, 
  actualizarGame, 
  eliminarGame
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

const crearUsuarioAPI = async (req, res) => {
  const { nombreCompleto, email, cel, f_Naci, pass, nomUser } = req.body; 
  try {
    const resultado = await crearUsuario({ nombreCompleto, email, cel, f_Naci, pass, nomUser });
    message = new ResponseBody(true, 200, resultado);
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

const listarUsuarioAPI = async (req, res) => {
  const {nomUser} = req.body;
  let message;
  try {
    const resultado = await listarUsuario(nomUser);
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

const actualizarUsuarioAPI = async (req, res) => {
  const { nombreCompleto, email, cel, f_Naci, pass, nomUser, fechaRegistro, id_rol, estado } = req.body;
  try {
    await actualizarUsuario({ nombreCompleto, email, cel, f_Naci, pass, nomUser, fechaRegistro, id_rol, estado });
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

const eliminarUsuarioAPI = async (req, res) => {
  const {nomUser}  = req.body;
  let message;
  try {
    const resultado = await eliminarUsuario(nomUser);
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

const crearGameAPI = async (req, res) => {
  const { gameId, gameName, gameDescription, nomUser } = req.body;
  
  try {
    const resultado = await crearGame({ gameId, gameName, gameDescription, nomUser });
    message = new ResponseBody(true, 200, resultado);
  } catch (error) {
    console.log(error)
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
  const {nomUser} = req.body;
  let message;
  try {
    const resultado = await listarGame(nomUser);
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
  const { gameId, gameName, gameDescription, nomUser } = req.body;
  try {
    await actualizarGame({ gameId, gameName, gameDescription, nomUser });
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
  const {gameId}  = req.body;
  let message;
  try {
    const resultado = await eliminarGame(gameId);
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
  eliminarRolAPI,
  crearUsuarioAPI, 
  listarUsuarioAPI, 
  actualizarUsuarioAPI, 
  eliminarUsuarioAPI,
  crearGameAPI, 
  listarGameAPI, 
  actualizarGameAPI, 
  eliminarGameAPI
};
