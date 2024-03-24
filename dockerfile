# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:14.15

# Set the working directory inside the container
WORKDIR /penh-react-ts

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build your React app (replace 'npm run build' with your actual build command)
RUN npm run build

# Expose the port your React app will run on (usually 3000)
EXPOSE 3001

# Define the command to start your React app (modify as needed)
CMD ["npm", "run", "dev"]
