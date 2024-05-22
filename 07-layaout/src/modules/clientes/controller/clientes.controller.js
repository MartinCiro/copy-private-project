const clienteUtils = require("../utils/clientes.utils");

async function crearPermiso(dataPermiso) {
  const { id, nombre, descripcion } = dataPermiso;

  clienteUtils.validar(id, "el id");
  clienteUtils.validar(nombre, "el nombre");

  return await clienteUtils
    .crearPermiso(dataPermiso)
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

async function getListarPermiso(element) {
  try {
    return await clienteUtils.getListarPermiso(element);
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

async function actualizaPermiso(options) {
  const { id, nombre, descripcion  } = options;
  clienteUtils.validar(id, "el elemento a modificar");
  await clienteUtils.actualizaPermiso(options).catch((error) => {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ocurrió un error inesperado y el cliente no ha sido actualizado",
    };
  });
}

async function eliminarPermisos(iden) {
  const { id } = iden;

  clienteUtils.validar(id, "el id");
  try {
    return await clienteUtils.eliminarPermisos({ id });
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

async function getListarRol(id_rol) {
  return clienteUtils
    .getListarRol(id_rol)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error.status_cod) throw error;
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error inesperado y el usuario no ha sido creado",
      };
    });
}

async function crearRol(dataRol) {
  const { rol, descripcion } = dataRol;

  clienteUtils.validar(rol, "el nombre del rol");
  clienteUtils.validar(descripcion, "la descripción");

  return await clienteUtils
    .crearRol(dataRol)
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

async function actualizaRol(options) {
  const { id, nombre, descripcion  } = options;
  clienteUtils.validar(id, "el elemento a modificar");
  await clienteUtils.actualizaRol(options).catch((error) => {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ocurrió un error inesperado y el cliente no ha sido actualizado",
    };
  });
}

async function eliminarRoles(iden) {
  const { id } = iden;

  clienteUtils.validar(id, "el id");
  try {
    return await clienteUtils.eliminarRoles({ id });
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

async function crearUsuario(dataRol, estado = "activo") {
  const { nombreCompleto, nomUser, email, cel, f_Naci, pass } = dataRol;
  const fechaRegistro = new Date();
  const id_rol = 3;
  
  clienteUtils.validar(nombreCompleto, "el nombre completo del usuario.");
  clienteUtils.validar(nomUser, "el nombre de usuario.");
  clienteUtils.validar(email, "el email del usuario.");
  clienteUtils.validar(cel, "el numero de celular.");
  clienteUtils.validar(f_Naci, "la fecha de nacimiento.");
  clienteUtils.validar(pass, "la contraseña");
  dataRol.id_rol = id_rol;
  //typeof(dataRol.estado) == "undefined" ? (dataRol.estado = estado) : null;
  dataRol.fechaReg = fechaRegistro;
  dataRol.estado = estado;

  if(f_Naci.split("-")[0].length < 3 || f_Naci.split("-")[1].length > 2 || f_Naci.split("-")[2].length > 2) {
    throw {
      ok: false,
      status_cod: 500,
      data: "La fecha de nacimiento tiene un formato incorrecto, el formato es yyyy-mm-dd",
    }
  }
  return await clienteUtils
    .crearUsuario(dataRol)
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

async function listarUsuario(nom_user) {
  return clienteUtils
    .listarUsuario(nom_user)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error.status_cod) throw error;
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error inesperado y el usuario no ha sido creado",
      };
    });
}

async function actualizarUsuario(options) {
  const { nombreCompleto, email, cel, f_Naci, pass, nomUser, fechaRegistro, id_rol, estado  } = options;
  clienteUtils.validar(nomUser, "el usuario a modificar");
  await clienteUtils.actualizarUsuario(options).catch((error) => {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ocurrió un error inesperado y el cliente no ha sido actualizado",
    };
  });
}

async function eliminarUsuario(nomUser) {
  clienteUtils.validar(nomUser, "el nombre de usuario");
  try {
    return await clienteUtils.eliminarUsuario(nomUser);
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
  getListarPermiso,
  actualizaPermiso,
  crearPermiso,
  eliminarPermisos,
  getListarRol,
  crearRol,
  actualizaRol,
  eliminarRoles,
  crearUsuario, 
  listarUsuario, 
  actualizarUsuario, 
  eliminarUsuario,
};
