#!/bin/bash

echo "🚀 Starting CyberOptics Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    if ! pgrep -x "mongod" > /dev/null; then
        echo -e "${YELLOW}⚠️  MongoDB is not running. Make sure MongoDB is started or use MongoDB Atlas.${NC}"
    fi
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Copying from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file. Please update it with your configuration.${NC}"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    npm install
fi

# Check if we should seed the database
if [ "$1" = "--seed" ]; then
    echo -e "${PURPLE}🌱 Seeding database...${NC}"
    npm run seed
fi

# Start the application
echo -e "${GREEN}🎯 Starting CyberOptics platform...${NC}"
echo -e "${CYAN}   Frontend: http://0.0.0.0:3000${NC}"
echo -e "${CYAN}   Backend:  http://0.0.0.0:5000${NC}"
echo -e "${CYAN}   Admin:    http://0.0.0.0:3000/admin${NC}"
echo ""
echo -e "${YELLOW}📱 Access from any device on your network:${NC}"
echo -e "${CYAN}   Replace 0.0.0.0 with your machine's IP address${NC}"
echo ""
echo -e "${PURPLE}🔑 Default Admin Login:${NC}"
echo -e "${CYAN}   Email: admin@cyberoptics.com${NC}"
echo -e "${CYAN}   Password: password123${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the servers${NC}"
echo ""

# Start both frontend and backend
npm run dev:full