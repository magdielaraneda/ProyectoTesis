# ProyectoTesis
Este repositorio contiene un sistema completo que integra un **backend** con Express y MongoDB y un **frontend** con React y Vite. El proyecto utiliza Docker para simplificar el despliegue y ejecución de todos los servicios.


## Tecnologías Utilizadas 🌐

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer, Joi, Socket.IO
- **Frontend**: React, Vite, JS-Cookie
- **Base de datos**: MongoDB
- **Docker**: Para contenedores y orquestación de servicios con Docker Compose.


## Requisitos Previos

### Clona el repositorio:
```
git clone https://github.com/tu-usuario/ProyectoTesis.git
cd ProyectoTesis
```
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas en tu máquina:

1. **Node.js** (versión 16 o superior): [Descargar aquí](https://nodejs.org/)
2. **Docker y Docker Compose**: [Instalar Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. **MongoDB Atlas** (opcional si no deseas usar la instancia local).


## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:
```
/proyectotesis
├── backend/                  # Código fuente del backend
│   ├── src/                  # Lógica principal
│   ├── package.json          # Dependencias del backend
│   ├── package-lock.json     # Bloqueo de dependencias del backend
│   ├── dockerfile            # Dockerfile para el backend
│   └── .gitignore            # Archivos ignorados del backend
│
├── frontend/                 # Código fuente del frontend
│   ├── src/                  # Componentes y lógica
│   ├── public/               # Archivos públicos
│   ├── package.json          # Dependencias del frontend
│   ├── package-lock.json     # Bloqueo de dependencias del frontend
│   ├── dockerfile            # Dockerfile para el frontend
│   ├── .env                  # Variables de entorno del frontend
│   ├── vite.config.js        # Configuración de Vite
│   ├── tailwind.config.js    # Configuración de Tailwind CSS
│   └── .gitignore            # Archivos ignorados del frontend
│
├── docker-compose.yml        # Orquestación de servicios Docker
└── README.md                 # Este archivo
```

## Configuración del Proyecto ⚙️

### Variables de Entorno

#### Backend

Crea un archivo **`.env`** en la carpeta **`backend`** con las siguientes variables:

```.env
PORT=3000
HOST=localhost
DB_URL=mongodb+srv://usuario:contraseña@usodesalas.mongodb.net/?retryWrites=true&w=majority&appName=UsoDeSalas
ACCESS_JWT_SECRET=EXNLX1KT2AJAMXM19G4CBHY16GI8AL6S4DKC6VLNH1UV2E9K1GR43YMXZFAF2XGCIUJBUUA11ETGSRMCM
REFRESH_JWT_SECRET=YLWGP3X1HED396SRWFGNTXYJX1ZU6L9K27VWTG7UE8JES7I2ACV2RJL2GWA3AQJRCC200FHKBEX95DJV7
API_KEY=re_MvmsG22A_Gh5idqBTzjAkb6aJS8qa9uy4

```

#### Frontend

Crea un archivo **`.env`** en la carpeta **`frontend`** con la siguiente variable:

```.env
VITE_BACKEND_URL=http://localhost:3000
```


## Ejecución del Proyecto 🚀

### 1. Construir los Contenedores
Desde la raíz del proyecto, ejecuta los siguientes comandos:
```
docker-compose build
```

### 2. Levantar los Servicios
Levanta todos los servicios (MongoDB, Backend y Frontend):
```
docker-compose up
```

## Ejecución de Pruebas 📝
### Backend
#### Para ejecutar las pruebas del backend, usa el siguiente comando:
```
cd backend
npm run test
```
### Frontend
#### Para ejecutar pruebas con Cypress, utiliza:
```
cd frontend
npx cypress open
```

## Funcionalidades y Uso de la Aplicación
### Funcionalidades Principales:
- **Autenticación y Autorización:** Registro, inicio de sesión y roles (admin, gerente, colaborador, cliente).
- **Sistema de Reportes:** Generación, visualización y gestión de reportes.
- **Integración con MongoDB:** Base de datos con soporte a estructuras relacionales.
- **Navegación Dinámica:** UI dinámica según el rol del usuario.


## Acceso a los Servicios
Una vez que los contenedores estén levantados, accede a los servicios en los siguientes puertos:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **MongoDB:** Puerto 27017 (en contenedor)


## Base de Datos
El proyecto utiliza **MongoDB** para el almacenamiento de datos.

1. Si estás usando Docker, MongoDB se ejecutará automáticamente en un contenedor.
2. Si prefieres una base de datos externa (por ejemplo, MongoDB Atlas), configura la variable DB_URL en el backend.


## Comandos Útiles 💡
#### Detener los contenedores:
```
docker-compose down
```

#### Ver los logs en tiempo real:
```
docker-compose logs -f
```

#### Reconstruir los contenedores:
```
docker-compose build
```

## Compatibilidad de Sistema Operativo
### Este proyecto ha sido probado y es compatible con los siguientes sistemas operativos:

- **Windows 10/11**
- **Ubuntu 20.04 / 22.04 (Linux)**
- **macOS Monterey / Ventura**

Es recomendable tener Docker Desktop instalado y actualizado en sistemas Windows y macOS, y Docker Engine en sistemas Linux para asegurar el correcto funcionamiento del entorno de contenedores.

## License / Licencia ©️

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this code under the terms of the license.  

Este proyecto está licenciado bajo la **Licencia MIT**.  
Eres libre de usar, modificar y distribuir este código bajo los términos de la licencia.

See the full license in the [LICENSE](./LICENSE) file.  
Consulta la licencia completa en el archivo [LICENSE](./LICENSE).
