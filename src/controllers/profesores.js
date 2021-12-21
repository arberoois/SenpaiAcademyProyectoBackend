const db = require("../db");
const obtener = async (req, res, next) => {
  try {
    const profesores = await db.query("SELECT * FROM profesores");
    if (profesores.rows.length > 0) {
      res.status(200).send({ code: 200, profesores: profesores.rows });
    } else {
      res.status(200).send({ code: 200, message: "No hay profesores" });
    }
  } catch (error) {
    return next(error);
  }
};
const crear = async (req, res, next) => {
  try {
    if (
      req.body.name &&
      req.body.rol &&
      req.body.sexo &&
      req.body.descripcion
    ) {
      const profesor = {
        nombre: req.body.name,
        rol: req.body.rol,
        sexo: req.body.sexo,
        descripcion: req.body.descripcion,
        imagen: "images/random.png",
      };
      const result = await db.query(
        "INSERT INTO profesores (nombre, rol, sexo, descripcion, imagen) VALUES ($1, $2, $3, $4, $5)",
        [
          profesor.nombre,
          profesor.rol,
          profesor.sexo,
          profesor.descripcion,
          profesor.imagen,
        ]
      );
      if (result.rowCount > 0) {
        res.status(201).send({ code: 201, message: "Profesor creado" });
      }
    } else {
      return res.status(400).json({
        code: 400,
        message: "Faltan datos (requeridos: nombre, rol, sexo, descripcion)",
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { obtener, crear };
