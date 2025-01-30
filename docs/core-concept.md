# 📚 Core Concepts

## Schemas

Can be run as a Docker container.

## Running with Docker Compose

```bash
version: "3.9"

services:
  
  cube_api:
    restart: always
    image: nexajs/nexa:edge
    ports:
      - 4000:4000
    volumes:
      - .:/nexa/conf
    environment:
      - NEXA_PORT=4000
```

## Configuration

Uses environment variables (e.g., NEXA_PORT).

