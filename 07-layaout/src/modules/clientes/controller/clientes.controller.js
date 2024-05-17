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

async function listarRol(id_rol) {
  if (!id_rol)
    throw {
      ok: false,
      status_cod: 400,
      data: "No se ha proporcionado el id",
    };

  return clienteUtils
    .consultarRol(id_rol)
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
  const { nombre, descripcion } = dataRol;

  clienteUtils.validar(nombre, "el nombre");
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

module.exports = {
  listarRol,
  getListarPermiso,
  actualizaPermiso,
  crearPermiso,
  eliminarPermisos,
  crearRol  
};
