FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Forcer l'installation malgré les conflits de peer deps
RUN npm install --legacy-peer-deps
COPY . .
# Utiliser npx pour s'assurer d'utiliser le CLI local et passer correctement les arguments
RUN npx ng build --configuration production

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copier uniquement le dossier browser pour le serveur statique
COPY --from=build /app/dist/nom-projet/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
