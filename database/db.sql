--creamos la base de datos
CREATE DATABASE memorymaster;

--utilizar la base de datos
use memorymaster;

--creamos la tabla
CREATE TABLE usuario (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    appat VARCHAR(100) NOT NULL,
    apmat VARCHAR(100) NOT NULL,
    user VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

--mostrar todas las tablas
show tables;

-- to describe table
describe usuario;

INSERT INTO `usuario` (`id`, `nombre`, `appat`, `apmat`, `edad`, `user`, `password`) VALUES (1, 'Juan', 'Sanchez', 'Rodriguez', 32, 'demo', '1234');