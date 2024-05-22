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

module.exports = {
  getListarPermiso,
  actualizaPermiso,
  crearPermiso,
  eliminarPermisos,
  getListarRol,
  crearRol,
  actualizaRol,
  eliminarRoles
};
