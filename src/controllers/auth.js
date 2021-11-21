const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("short-uuid");
const { TOKEN_SECRET } = require("../middlewares/jwt");

const registro = async (req, res, next) => {
  console.log("registro", req.body);
  try {
    if (req.body.email && req.body.name && req.body.password) {
      // Formato del mail
      if (/^\S+@\S+\.\S+$/.test(req.body.email) === false) {
        res
          .status(400)
          .json({ code: 400, message: "Formato de email incorrecto" });
        return;
      }

      const existeUser = usuarios.find((u) => {
        return u.mail === req.body.mail;
      });

      if (existeUser) {
        res.status(400).json({ code: 400, message: "El usuario ya existe" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        id: uuid.generate(),
        name: req.body.name,
        email: req.body.email,
        password: password,
      };

      usuarios.push(newUser);

      return res.status(200).json({ code: 200, newUser });
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
  console.log(req.body);
  try {
    const user = usuarios.find((u) => u.email === req.body.email);
    if (!user) {
      return res
        .status(400)
        .json({ code: 400, message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ code: 400, message: "Contraseña no válida" });
    }

    // Crear el token
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      TOKEN_SECRET
    );

    res.status(200).json({
      code: 200,
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registro,
  login,
};

let usuarios = [];
