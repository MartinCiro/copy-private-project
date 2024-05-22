const { getConnection } = require("../../../interface/DBConn.js");
const { Pool } = require("pg");
const { query } = require("express");
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
 async function crearPermiso(dataPermiso) {
   const pool = await getConnection();
 
   const params = [dataPermiso.id, dataPermiso.nombre, dataPermiso.descripcion];
 
   return pool
     .query(
       `
        INSERT INTO permiso (id_permiso, nombre, descripcion)
        VALUES ($1, $2, $3);
    `,
       params
     )
     .then((data) => {
       return data.rows[0];
     })
     .catch((error) => {
       existe(error, "permiso");
 
       throw {
         ok: false,
         status_cod: 500,
         data: "Ocurrió un error insertando el permiso",
       };
     })
     .finally(() => pool.end);
 }

async function getListarPermiso(id) {
  const pool = await getConnection();
  if (id===undefined) {
    return pool
      .query(
        "SELECT id_permiso, nombre, descripcion FROM permiso"
      )
      .then((data) => {
        return data.rowCount > 0 ? data.rows : null;
      })
      .catch((error) => {
        if (error.status_cod) throw error;
        error.status_cod ? error : null;
        throw {
          ok: false,
          status_cod: 500,
          data: `Ha ocurrido un error consultando la información en la base de datos`,
        };
      })
      .finally(() => pool.end());
  }else {
    return pool
      .query(
        `
        SELECT id_permiso, nombre, descripcion FROM permiso where id_permiso=$1;
        `,
        [id]
      )
      .then((data) => {
        return data.rowCount > 0 ? data.rows : null;
      })
      .catch((error) => {
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
}

async function actualizaPermiso(options) {
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
    throw new Error("Al menos uno de los campos 'nombre' o 'descripcion' debe ser proporcionado");
  }

  const query = `
    UPDATE permiso
    SET ${fields.join(", ")}
    WHERE id_permiso = $1;
  `;

  const pool = await getConnection();
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
        data: "Ocurrió un error en base de datos actualizando el permiso",
      };
    })
    .finally(() => pool.end());
}

async function eliminarPermisos(id) {
  const pool = await getConnection();
  params = [id.id];
  return pool
    .query(`delete from permiso where id_permiso=$1`, params)
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

async function crearRol(dataRol) {
  const pool = await getConnection();

  const params = [dataRol.rol, dataRol.descripcion];

  return pool
    .query(
      `
       INSERT INTO rol ( nombre, descripcion)
       VALUES ($1, $2);
   `,
      params
    )
    .then((data) => {
      return data.rows[0];
    })
    .catch((error) => {
      existe(error, "rol");

      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error insertando el rol",
      };
    })
    .finally(() => pool.end);
}

async function getListarRol(id) {
 const pool = await getConnection();
 if (id===undefined) {
   return pool
     .query(
       "SELECT id, nombre, descripcion FROM rol"
     )
     .then((data) => {
       return data.rowCount > 0 ? data.rows : null;
     })
     .catch((error) => {
       if (error.status_cod) throw error;
       error.status_cod ? error : null;
       throw {
         ok: false,
         status_cod: 500,
         data: `Ha ocurrido un error consultando la información en la base de datos`,
       };
     })
     .finally(() => pool.end());
 }else {
   return pool
     .query(
       `
       SELECT id, nombre, descripcion FROM rol where id=$1;
       `,
       [id]
     )
     .then((data) => {
       return data.rowCount > 0 ? data.rows : null;
     })
     .catch((error) => {
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
}

async function actualizaRol(options) {
 const { id, nombre, descripcion } = options;

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
   throw new Error("Al menos uno de los campos 'nombre' o 'descripcion' debe ser proporcionado");
 }

 const query = `
   UPDATE rol
   SET ${fields.join(", ")}
   WHERE id = $1;
 `;

 const pool = await getConnection();
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
       data: "Ocurrió un error en base de datos actualizando el permiso",
     };
   })
   .finally(() => pool.end());
}

async function eliminarRoles(id) {
 const pool = await getConnection();
 params = [id.id];
 return pool
   .query(`delete from rol where id=$1`, params)
   .then((data) => {
     return data.rowCount > 0
       ? `El id ${params[0]} se eliminó correctamente`
       : `El id ${params[0]} no existe`;
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
  getListarPermiso,
  actualizaPermiso,
  crearPermiso,
  eliminarPermisos,
  crearRol,
  getListarRol,
  actualizaRol,
  eliminarRoles
};
