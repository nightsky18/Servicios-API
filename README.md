#  Taller de Servicios APIs - REST API CRUD Empleados

**Estudiantes:** Mateo Berrio Cardona, Esteban Cano Ramirez, Yeimy Daniela Herrera Bedoya, Mariana Montoya Sepúlveda    
**Materia:** Pruebas y Gestión de la Configuración  
**Profesor:** David Fernando Mejia Tabares  
**Universidad:** Politécnico Colombiano Jaime Isaza Cadavid  
**Fecha de Entrega:** 14 de marzo de 2026  

[![Node.js](https://img.shields.io/badge/Node.js-v20+-18C5E7?style=flat&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v4+-FFFFFF?style=flat&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-v7+-47A248?style=flat&logo=mongodb)](https://mongodb.com)

---

##  Tabla de Contenidos
1. [¿Qué vamos a hacer?](#-qué-vamos-a-hacer)
2. [Requerimientos del Taller](#-requerimientos-del-taller)
3. [Tecnologías y Por Qué](#-tecnologías-y-por-qué)
4. [Modelo de Datos (10 Campos)](#-modelo-de-datos-10-campos)
5. [Estructura del Proyecto](#-estructura-del-proyecto)
6. [Pruebas con Postman](#-pruebas-con-postman)
7. [Pruebas con SoapUI](#-pruebas-con-soapui)


---

## ¿Qué vamos a hacer?

### Resumen
Desarrollaremos **desde cero** una API REST completa que permita gestionar información de empleados en una base de datos. La API tendrá operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y la probaremos con dos herramientas profesionales: **Postman** y **SoapUI**.

Usamos HTTP con métodos estándar:
- **GET** →  (leer)
- **POST** →  (crear)
- **PUT/PATCH** →  (modificar)
- **DELETE** →  (borrar)

---

## Requerimientos del Taller

El profesor pidió cumplir **4 objetivos**:

### Objetivo 1: Crear nuestra propia REST API
- Lenguaje: **Node.js con Express**
- Base de datos: **MongoDB** (NoSQL, en la nube con Atlas)
- CRUD completo sobre un modelo de **10 campos con tipos variados**

### Objetivo 2: Probar nuestra API
- Herramienta 1: **Postman** (interfaz gráfica amigable)
- Herramienta 2: **SoapUI** (más técnica, usada en empresas)
- Documentar con capturas de pantalla

### Objetivo 3: Buscar una API gratuita en internet
- Se propone: **JSONPlaceholder** (https://jsonplaceholder.typicode.com)
- API fake REST muy usada para aprender y probar

### Objetivo 4: Probar la API pública
- Mismas herramientas: Postman + SoapUI
- Comparar cómo funciona vs nuestra API

**Nota** Todo en GitHub con commits profesionales.

---

##  Tecnologías y Por Qué

| Tecnología | ¿Qué es? | ¿Por qué la usamos? |
|------------|----------|---------------------|
| **Node.js** | JavaScript del lado del servidor | Rápido, popular, mismo lenguaje frontend/backend |
| **Express.js** | Framework web minimalista | Simplifica crear rutas HTTP en 10 líneas vs 100 |
| **MongoDB** | Base de datos NoSQL (JSON-like) | Flexible, gratis con Atlas, no necesita SQL |
| **Mongoose** | ODM para MongoDB | Define estructura (schema) y valida datos |
| **Postman** | Cliente API con interfaz gráfica | Fácil: click botones vs escribir comandos |
| **SoapUI** | Herramienta profesional API testing | Usada en QA real, automatiza pruebas |

---

## Modelo de Datos (10 Tipos de Datos DIFERENTES)

### Entidad: **Empleado**
Cumple requerimiento de **10 campos con 10 TIPOS DIFERENTES** de MongoDB/Mongoose:

| # | Campo | Tipo | Ejemplo | ¿Por qué este tipo? |
|---|-------|------|---------|---------------------|
| 1 | `nombre` | **String** | "Ana María López" | Texto estándar para nombres |
| 2 | `edad` | **Number** | 28 | Entero simple para cálculos |
| 3 | `fechaContratacion` | **Date** | "2024-01-15" | Fecha con zona horaria |
| 4 | `activo` | **Boolean** | true | Estado binario empleado |
| 5 | `habilidades` | **Array** | ["JavaScript", "React"] | Lista dinámica de skills |
| 6 | `jefe` | **ObjectId** | "65f1a2..." | Referencia otro empleado |
| 7 | `salarioPreciso` | **Decimal128** | 3850000.75 | Dinero con decimales precisos |
| 8 | `metadata` | **Mixed** | `{"lastLogin": "..."}` | JSON flexible sin schema |
| 9 | `configuraciones` | **Map** | `{"idioma": "es"}` | Mapa clave-valor |
| 10 | `fotoPerfil` | **Buffer** | Binary (base64) | Imagen binaria almacenada |

### Tipos de Datos 

#### 1. String (Texto)
- **Uso:** Nombres, emails, descripciones
- **Validaciones:** minlength, maxlength, trim, lowercase

#### 2. Number (Números enteros/decimales)
- **Uso:** Edad, cantidades, IDs numéricos
- **Validaciones:** min, max, integer

#### 3. Date (Fechas)
- **Uso:** Timestamps, fechas contratación, cumpleaños
- **Formato:** ISO 8601: `2026-03-05T22:30:00Z`

#### 4. Boolean (Verdadero/Falso)
- **Uso:** Estados activo/inactivo, permisos, flags
- **Valores:** `true` o `false`

#### 5. Array (Listas)
- **Uso:** Múltiples valores del mismo tipo
- **Ejemplo:** Lista habilidades, tags, roles

#### 6. ObjectId (Referencias)
- **Uso:** Relacionar documentos (como FK en SQL)
- **Formato:** 24 caracteres hexadecimal: `507f1f77bcf86cd799439011`

#### 7. Decimal128 (Decimales precisos)
- **Uso:** Dinero, medidas precisas
- **Ventaja:** No pierde precisión (vs Number float)
- **Ejemplo:** `2850000.50` (salario exacto)

#### 8. Mixed (Flexible)
- **Uso:** JSON sin estructura predefinida
- **Ventaja:** Acepta cualquier tipo/estructura
- **Ejemplo:** Metadata con campos variables

#### 9. Map (Clave-Valor)
- **Uso:** Configuraciones, traducciones
- **Ventaja:** Acceso por clave dinámica
- **Ejemplo:** `{"idioma": "es", "tema": "dark"}`

#### 10. Buffer (Binario)
- **Uso:** Imágenes, archivos, datos encriptados
- **Formato:** Base64 en JSON
- **Ejemplo:** Foto perfil pequeña (< 16MB)

### Ejemplo JSON Completo

```json
{
  "nombre": "María Fernanda Gómez",
  "edad": 29,
  "fechaContratacion": "2023-08-20T00:00:00Z",
  "activo": true,
  "habilidades": ["Python", "Django", "PostgreSQL", "AWS"],
  "jefe": "65f1a2b3c4d5e6f7g8h9i0j1",
  "salarioPreciso": 4200000.50,
  "metadata": {
    "lastLogin": "2026-03-05T18:45:30Z",
    "preferencias": {
      "tema": "light",
      "notificacionesEmail": false
    },
    "certificaciones": ["AWS Certified", "Scrum Master"]
  },
  "configuraciones": {
    "idioma": "es",
    "timezone": "America/Bogota",
    "formatoFecha": "DD/MM/YYYY",
    "moneda": "COP"
  },
  "fotoPerfil": "iVBORw0KGgoAAAANSUhEUgAAAAUA..."
}

```
## 📁 Estructura del Proyecto

- Servicios-API/
- │
- ├── 📂 config/ # Configuraciones
- │ └── db.js # Conexión MongoDB con Mongoose
- │
- ├── 📂 models/ # Modelos de Datos (Schemas)
- │ └── Empleado.js # Schema 10 campos + validaciones
- │
- ├── 📂 controllers/ # Lógica de Negocio (CRUD)
- │ └── empleadosController.js # Funciones: crear, listar, actualizar, eliminar
- │
- ├── 📂 routes/ # Rutas/Endpoints HTTP
- │ └── empleados.js # Define POST/GET/PUT/PATCH/DELETE
- │
- ├── 📂 docs/ # Documentación y Pruebas
- │ ├── postman-empleados.json # Colección Postman nuestra API
- │ ├── postman-public.json # Colección Postman API pública
- │ ├── soapui-empleados.xml # Proyecto SoapUI nuestra API
- │ ├── soapui-public.xml # Proyecto SoapUI API pública
- │ └── 📂 screenshots/ # Capturas pruebas
- │ ├── postman-create.png
- │ ├── postman-get-all.png
- │ ├── soapui-delete.png
- │ └── ...
- │
- ├── 📂 node_modules/ # Dependencias (NO TOCAR, generado por npm)
- │
- ├── .env # Variables entorno (MongoDB URI, PORT) -- No pública
- ├── .gitignore #  (node_modules, .env)
- ├── package.json # Dependencias y scripts proyecto
- ├── package-lock.json # Versiones exactas dependencias
- ├── server.js # ARCHIVO PRINCIPAL - Inicia servidor Express
- ├── README.md # Este archivo
- └── LICENSE # Licencia MIT

# 🧪 Pruebas con Postman y SoapUI 

##  Pruebas con Postman

**¿Qué es Postman?** Cliente HTTP gráfico para probar APIs sin escribir código.

### 📄 Documentación Publicada
🔗 **[Ver colección completa en Postman Docs](https://documenter.getpostman.com/view/38562704/2sBXierZW7)**

La documentación incluye todos los endpoints con ejemplos de request y response.

### Pruebas realizadas (13 casos — API Propia)

| # | Nombre | Método | Endpoint | Resultado Esperado |
|---|--------|--------|----------|--------------------|
| 1 | Crear empleado válido | `POST` | `/api/empleados` | 201 ✅ |
| 2 | Crear múltiples empleados | `POST` | `/api/empleados` | 201 ✅ |
| 3 | Edad menor de 18 | `POST` | `/api/empleados` | 400 ❌ |
| 4 | Nombre muy corto | `POST` | `/api/empleados` | 400 ❌ |
| 5 | Sin salarioPreciso | `POST` | `/api/empleados` | 400 ❌ |
| 6 | ObjectId inválido en jefe | `POST` | `/api/empleados` | 400 ❌ |
| 7 | Listar todos | `GET` | `/api/empleados` | 200 ✅ |
| 8 | Obtener por ID | `GET` | `/api/empleados/:id` | 200 ✅ |
| 9 | ID inexistente | `GET` | `/api/empleados/000...` | 404 ❌ |
| 10 | Actualizar parcial | `PATCH` | `/api/empleados/:id` | 200 ✅ |
| 11 | Reemplazar completo | `PUT` | `/api/empleados/:id` | 200 ✅ |
| 12 | Eliminar empleado | `DELETE` | `/api/empleados/:id` | 200 ✅ |
| 13 | DELETE inexistente | `DELETE` | `/api/empleados/000...` | 404 ❌ |


## SoapUI
**¿Qué es?** Herramienta pro para testing REST/SOAP (QA empresarial).

### Pasos Rápidos
1. **New REST Project:** URI `http://localhost:3000/api/empleados`
2. **Resources:** `/` (GET/POST), `/:id` (GET/PATCH/DELETE)
3. **Headers:** `Content-Type: application/json`
4. **Assertions:** Status 200, Response <500ms

**Exportar:** `docs/soapui-empleados.xml`

## 🌐 JSONPlaceholder (API Pública)
**Base:** `https://jsonplaceholder.typicode.com`

| Endpoint | Método | Ejemplo |
|----------|--------|---------|
| `/users` | GET | Lista 10 usuarios |
| `/users/1` | GET | Usuario Leanne Graham |
| `/posts` | POST | `{title:"Mi post", body:"...", userId:1}` → 201 |

**Exportar:** `postman-public.json` + `soapui-public.xml` + screenshots

# 📞 Contacto 
**Autor:** Mariana Montoya Sepúlveda  
**Email:** [mariana_montoya82221@elpoli.edu.co](mailto:mariana_montoya82221@elpoli.edu.co)  
**GitHub:** [github.com/nightsky18](https://github.com/nightsky18)   

## Referencias y Recursos

### Documentación Oficial
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Postman Learning](https://learning.postman.com/)
- [SoapUI Docs](https://www.soapui.org/docs/)


### APIs Públicas Alternativas
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [ReqRes](https://reqres.in/)
- [PokeAPI](https://pokeapi.co/)
- [OpenWeatherMap](https://openweathermap.org/api)

**Última actualización:** 5 de marzo de 2026  
**Versión:** 1.0 - Didáctica Completa  
**Estado:**  En desarrollo →  Entrega 14/marzo/2026



