const express = require("express");

const router = express.Router();

let profesores = [
  {
    id: 1,
    nombre: "Camila",
    imagen: "images/CAMILA - BOXEO.JPG",
    rol: "Boxeo",
    sexo: "F",
    descripcion: "Camila es profesora de Boxeo en Oxigenarte hace 6 meses.",
  },
  {
    id: 2,
    nombre: "Candelaria",
    imagen: "images/CANDELARIA - PILATES.JPG",
    rol: "Pilates",
    sexo: "F",
    descripcion:
      "Candelaria es profesora de Pilates en Oxigenarte hace más de un año.",
  },
  {
    id: 3,
    nombre: "Carolina",
    imagen: "images/CAROLINA - FITNESS.JPG",
    rol: "Fitness",
    sexo: "F",
    descripcion:
      "Carolina es profesora de Fitness en Oxigenarte hace 12 meses.",
  },
  {
    id: 4,
    nombre: "Diego",
    imagen: "images/DIEGO - MUSCULACIÓN.JPG",
    rol: "Musculación",
    sexo: "M",
    descripcion:
      "Diego es profesor de Musculación en Oxigenarte hace más de dos años.",
  },
  {
    id: 5,
    nombre: "Elías",
    imagen: "images/ELÍAS - MUSCULACIÓN.JPG",
    rol: "Musculación",
    sexo: "M",
    descripcion: "Elías es profesor de Musculación en Oxigenarte hace 5 años.",
  },
  {
    id: 6,
    nombre: "Lorena",
    imagen: "images/LORENA - FITNESS.JPG",
    rol: "Fitness",
    sexo: "F",
    descripcion:
      "Lorena es profesora de Fitness en Oxigenarte hace más de dos años.",
  },
  {
    id: 7,
    nombre: "Lucía",
    imagen: "images/LUCÍA - PILATES.JPG",
    rol: "Pilates",
    sexo: "F",
    descripcion:
      "Lucía es profesora de Pilates en Oxigenarte hace más de dos años.",
  },
  {
    id: 8,
    nombre: "Mauro",
    imagen: "images/MAURO - MUSCULACIÓN.JPG",
    rol: "Musculación",
    sexo: "M",
    descripcion: "Mauro es profesor de Musculación en Oxigenarte hace un año.",
  },
];

router.get("/obtener", (req, res) => {
  try {
    res.status(200).send(profesores);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/agregar", (req, res) => {
  try {
    const profesor = req.body;
    profesores.push(profesor);
    res.status(200).send(profesores);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
