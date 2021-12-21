const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { TOKEN_SECRET } = require("../middlewares/jwt");

const registro = async (req, res, next) => {
  try {
    if (req.body.email && req.body.name && req.body.password) {
      // Formato del mail
      if (/^\S+@\S+\.\S+$/.test(req.body.email) === false) {
        res
          .status(400)
          .json({ code: 400, message: "Formato de email incorrecto" });
        return;
      }

      const existeUser = await db.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [req.body.email]
      );

      if (existeUser.rows.length > 0) {
        return res
          .status(400)
          .json({ code: 400, message: "El usuario ya existe" });
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: password,
      };

      const result = await db.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)",
        [newUser.name, newUser.email, newUser.password]
      );
      if (result.fields) {
        return res.status(201).json({ code: 201, newUser });
      }
    } else {
      return res.status(400).json({
        code: 400,
        message: "Faltan datos (requeridos: email, name, password)",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (req.body.email && req.body.password) {
      if (/^\S+@\S+\.\S+$/.test(req.body.email) === false) {
        res
          .status(400)
          .json({ code: 400, message: "Formato de email incorrecto" });
        return;
      }

      const existeUser = await db.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [req.body.email]
      );
      if (!existeUser.rows.length > 0) {
        return res
          .status(400)
          .json({ code: 400, message: "Usuario no encontrado." });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        existeUser.rows[0].password
      );

      if (!validPassword) {
        return res
          .status(400)
          .json({ code: 400, message: "Contraseña no válida" });
      }

      // Crear el token
      const token = jwt.sign(
        {
          name: existeUser.rows[0].nombre,
          email: existeUser.rows[0].email,
        },
        TOKEN_SECRET
      );

      res.status(200).json({
        code: 200,
        message: "Login exitoso",
        token,
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "Faltan datos (requeridos: email, name, password)",
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registro,
  login,
};
