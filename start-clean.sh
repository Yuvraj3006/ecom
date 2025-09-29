#!/bin/bash

echo "🧹 Cleaning up previous instances..."

# Kill any existing processes
pkill -f "next" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true

# Clear caches
rm -rf .next 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

echo "🚀 Starting CyberOptics Platform..."

# Start frontend on port 3000
echo "📱 Starting frontend on http://0.0.0.0:3000"
npx next dev -H 0.0.0.0 -p 3000 &

# Wait a moment then start backend
sleep 3
echo "🔧 Starting backend on http://0.0.0.0:5000"
node server/index.js &

echo ""
echo "✅ CyberOptics Platform is starting..."
echo "🌐 Frontend: http://172.30.0.2:3000"
echo "🔧 Backend:  http://172.30.0.2:5000"
echo "👑 Admin:    http://172.30.0.2:3000/admin"
echo ""
echo "⏳ Please wait 10-15 seconds for the servers to fully start..."
echo "🛑 Press Ctrl+C to stop all servers"

# Wait for user to stop
wait