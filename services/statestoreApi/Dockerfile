# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

RUN npm run build

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]