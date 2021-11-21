const express = require("express");
const { verifyToken } = require("../middlewares/jwt");
const { obtener, crear } = require("../controllers/profesores");
const router = express.Router();

router.get("/obtener", obtener);
router.post("/crear", verifyToken, crear);
module.exports = router;
