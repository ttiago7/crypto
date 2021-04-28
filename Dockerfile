# FROM node:14

# WORKDIR /app

# COPY /backend/package*.json ./

# RUN npm install

# COPY /backend .

# CMD ["npm", "start"]

FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY /backend/package*.json ./

RUN npm install -g pm2
RUN npm install

# revisar si estar copiando el contenido o la carpeta
COPY /backend ./
# COPY /backend/index.js ./
# COPY /backend/src ./

EXPOSE 3001

# CMD ["pm2-runtime", "index.js"]
# CMD ["pm2","start", "index.js"]
CMD ["npm", "start"]
