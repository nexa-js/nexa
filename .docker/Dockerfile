# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Set environment variable (default to 3000)
ARG NEXA_PORT=3000
ENV NEXA_PORT=${NEXA_PORT}

# Expose the port
EXPOSE ${NEXA_PORT}

# Start the app
CMD ["sh", ".docker/entrypoint.sh"]
