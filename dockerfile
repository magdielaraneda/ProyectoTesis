FROM node:16

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Asegurar permisos de ejecución en el contenedor
RUN chmod -R 755 /app

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "start"]
