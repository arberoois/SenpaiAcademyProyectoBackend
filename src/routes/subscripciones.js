const express = require("express");
const { subscribirse } = require("../controllers/subscripciones");

const router = express.Router();

router.post("/", subscribirse);

module.exports = router;
