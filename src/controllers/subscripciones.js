const uuid = require("short-uuid");

const subscribirse = async (req, res, next) => {
  try {
    res.status(200).send({
      code: 200,
      message: "Subscripcion realizada con exito",
      id: uuid.generate(),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { subscribirse };
