const db = require("../db");

const subscribirse = async (req, res, next) => {
  try {
    if (req.body.email) {
      const result = await db.query(
        "INSERT INTO subscripciones (email) VALUES ($1)",
        [req.body.email]
      );
      if (result.rowCount > 0) {
        res.status(201).send({ code: 201, message: "Subscripcion creada" });
      }
    } else {
      return res.status(400).json({
        code: 400,
        message: "Faltan datos (requeridos: email)",
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { subscribirse };
