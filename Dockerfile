FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Command will be provided by smithery.yaml
# Set the environment variables
ENV BASE_URL=""
ENV CLIENT_ID=""
ENV CLIENT_SECRET=""
ENV USERNAME=""
ENV PASSWORD=""
ENV TENANT_ID=""
ENV REJECT_UNAUTHORIZED="false"
ENV ALLOWED_APIS=""
ENV MCP_CONFIG_PATH="api-config.json"

CMD ["node", "build/index.js"]
