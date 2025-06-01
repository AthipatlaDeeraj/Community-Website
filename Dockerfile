# Use the official Node.js image
FROM node:14

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Change to the directory where app.js is located
WORKDIR /
    
# Expose the port
EXPOSE 3000
 
# Start the application
CMD ["node", "home.js"]