# Use the latest Alpine Linux as base image
FROM alpine:latest

# Install necessary system dependencies for Alpine and Bun
RUN apk add --no-cache \
    ca-certificates \
    curl \
    bash \
    libstdc++ \
    libgcc

# Install Bun binary from the official Alpine-compatible Bun image
COPY --from=oven/bun:alpine /usr/local/bin/bun /usr/local/bin/bun
COPY --from=oven/bun:alpine /usr/local/bin/bunx /usr/local/bin/bunx

# Set working directory inside container as requested
WORKDIR /app

# Copy dependency definitions first to leverage Docker layer caching
COPY package.json bun.lock bunfig.toml* ./

# Install project dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build argument for backend API URL (embedded at build time by Vite)
ARG API_URL=http://localhost:3000/api
ARG VITE_API_URL
ENV API_URL=$API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the production bundle
RUN bun run build

# Create unprivileged user for security and adjust permissions
RUN addgroup -g 1000 -S bun && adduser -u 1000 -S bun -G bun \
    && chown -R bun:bun /app

# Switch to non-root user
USER bun

# Expose the Vite preview port
EXPOSE 4173

# Start the application preview server on 0.0.0.0
CMD ["bun", "run", "preview", "--host", "0.0.0.0", "--port", "4173"]
