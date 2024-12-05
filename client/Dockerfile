# Use a Node.js base image to build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the React app code
COPY . .

# Build the React app for production
RUN npm run build

# Use a Nginx image to serve the build
FROM nginx:alpine

# Copy the React build files to Nginx's default folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will listen on
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
