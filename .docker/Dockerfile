# Use a lightweight Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first to optimize caching
COPY packages/nexa-starter/package.json ./

# Install all dependencies (including dev dependencies)
RUN yarn install --frozen-lockfile

# Copy the entire project
COPY packages/nexa-starter .

# Build the application (if necessary)
# RUN yarn run build

# --- Final Stage ---
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Copy built files and dependencies from builder stage
COPY --from=builder /app .

# Install only production dependencies
RUN yarn install --production=false --frozen-lockfile

# Install nodemon globally for development mode
RUN if [ "$NEXA_DEV_MODE" = "true" ]; then yarn global add nodemon; fi

# Ensure entrypoint script is executable
COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use OS environment variables and run the app
CMD ["/entrypoint.sh"]