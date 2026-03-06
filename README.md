#  Taller de Servicios APIs - REST API CRUD Empleados

**Estudiante:** [Tu Nombre]  
**Materia:** Pruebas y Gestión de la Configuración  
**Fecha:** Marzo 2026  
**Fecha Entrega:** 14 de marzo de 2026  

[![Node.js](https://img.shields.io/badge/Node.js-v20+-18C5E7?style=flat&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v4+-FFFFFF?style=flat&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-v7+-47A248?style=flat&logo=mongodb)](https://mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues-raw/TU_USUARIO/taller-rest-api-empleados)](https://github.com/TU_USUARIO/taller-rest-api-empleados/issues)

## Descripción del Proyecto
API RESTful completa que implementa **CRUD** (Create, Read, Update, Delete) para la entidad **Empleado** con **10 campos de diferentes tipos de datos**:
- **String**: nombre, email, departamento, foto
- **Number**: edad, salario
- **Date**: fechaContratacion
- **Boolean**: activo
- **Array**: habilidades
- **ObjectId**: jefe (referencia)

**Base de datos:** MongoDB Atlas (cluster gratuito M0).  
**Tecnologías:** Node.js, Express.js, Mongoose (ODM).  
**Cumple 100% requerimientos del taller.**

##  Endpoints CRUD (Base URL: `http://localhost:3000/api/empleados`)

| Método | Endpoint                | Descripción                     | Ejemplo Body (POST/PUT/PATCH) |
|--------|-------------------------|---------------------------------|-------------------------------|
| **POST**   | `/`                     | Crear empleado                  | `{ "nombre": "Ana López", "email": "ana@empresa.com", "edad": 28, ... }` |
| **GET**    | `/`                     | Listar todos (JSON array)       | -                             |
| **GET**    | `/:id`                  | Obtener por ID                  | -                             |
| **PUT**    | `/:id`                  | Actualizar completo             | Igual POST                    |
| **PATCH**  | `/:id`                  | Actualizar parcial              | `{ "salario": 2500 }`         |
| **DELETE** | `/:id`                  | Eliminar por ID                 | -                             |

**Respuestas:** JSON estándar con status codes HTTP (200 OK, 201 Created, 404 Not Found, 500 Error).

## Instalación y Ejecución (Paso a Paso)

### Requisitos
- Node.js v20+ ([descargar](https://nodejs.org))
- Cuenta GitHub y MongoDB Atlas (gratuita)
- Postman y SoapUI instalados


