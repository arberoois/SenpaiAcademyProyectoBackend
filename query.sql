-- CREATES:

CREATE TABLE usuarios (
    id serial NOT NULL PRIMARY KEY,
    nombre varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(100) NOT NULL, 
)

CREATE TABLE profesores (
    id serial NOT NULL PRIMARY KEY,
    nombre varchar(100) NOT NULL,
    imagen varchar(100) NOT NULL,
    rol varchar(50) NOT NULL,
    sexo varchar(1) NOT NULL,
    CONSTRAINT profesores_sexo CHECK (sexo == 'F' OR sexo == 'M'),
)

CREATE TABLE subscripciones (
    id serial NOT NULL PRIMARY KEY,
    email varchar(100) NOT NULL,
)

-- INSERTS
INSERT INTO usuarios (nombre, email, password) VALUES ('Agustin','prueba@gmail.com','$2b$10$bDzmEduyyVkIkn5LDyFnZ.Telags0JHEQReN78L6AB1MnnrP8LYSe');
INSERT INTO usuarios (nombre, email, password) VALUES ('Cesar','cesar@gmail.com','$2b$10$bDzmEduyyVkIkn5LDyFnZ.Telags0JHEQReN78L6AB1MnnrP8LYSe'); -- password: 123456

INSERT INTO profesores(nombre,imagen,rol,sexo,descripcion) VALUES ('Agustin','images/random.png', 'Boxeo', 'M', 'Profesor de Boxeo');
INSERT INTO profesores(nombre,imagen,rol,sexo,descripcion) VALUES ('Cesar','images/random.png', 'Fitness', 'M', 'Profesor de Fitness');

INSERT INTO subscripciones(email) VALUES ('arberoois@gmail.com');
