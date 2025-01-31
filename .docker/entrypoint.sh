#!/bin/sh

# Ensure NODE_ENV is set, default to "production" if not provided
NEXA_DEV_MODE=${NEXA_DEV_MODE:-false}

# Run in development mode if NEXA_DEV_MODE=development
if [ "$NEXA_DEV_MODE" = "true" ]; then
    echo "Starting in development mode..."
    exec yarn run dev
else
    echo "Starting in production mode..."
    exec yarn run start
fi