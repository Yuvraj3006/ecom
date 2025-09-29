#!/bin/bash

echo "🔧 CyberOptics Platform - Complete Fix Script"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get the target directory (current directory or provided argument)
TARGET_DIR=${1:-$(pwd)}

echo -e "${BLUE}🎯 Target directory: ${TARGET_DIR}${NC}"

# Check if we're in the right directory
if [[ ! -f "${TARGET_DIR}/package.json" ]]; then
    echo -e "${RED}❌ Error: package.json not found in ${TARGET_DIR}${NC}"
    echo -e "${YELLOW}💡 Please run this script from your project directory or provide the path${NC}"
    echo -e "${CYAN}   Usage: ./complete-fix.sh /path/to/your/project${NC}"
    exit 1
fi

echo -e "${YELLOW}🛑 Stopping any running servers...${NC}"
pkill -f "next dev" 2>/dev/null || true
pkill -f "node.*3000" 2>/dev/null || true

echo -e "${YELLOW}🧹 Cleaning caches...${NC}"
rm -rf "${TARGET_DIR}/.next" 2>/dev/null || true
rm -rf "${TARGET_DIR}/node_modules/.cache" 2>/dev/null || true

echo -e "${PURPLE}📝 Fixing app/globals.css...${NC}"
cat > "${TARGET_DIR}/app/globals.css" << 'EOF'
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #FFE4F1 100%);
    color: #111111;
    font-family: 'Inter', sans-serif;
    font-feature-settings: "rlig" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', sans-serif;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #F8F9FA;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #FF0080 0%, #B026FF 100%);
    border-radius: 9999px;
  }
}

@layer components {
  .glassmorphic {
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #FF0080 0%, #B026FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #FF0080 0%, #B026FF 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .btn-primary:hover {
    box-shadow: 0 0 12px rgba(255, 0, 128, 0.5);
    transform: scale(1.05);
  }
  
  .card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 1.25rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }
  
  .card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #FF0080;
    box-shadow: 0 0 0 2px rgba(255, 0, 128, 0.1);
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
EOF

echo -e "${PURPLE}⚙️  Fixing next.config.js...${NC}"
cat > "${TARGET_DIR}/next.config.js" << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig
EOF

echo -e "${GREEN}✅ All fixes applied!${NC}"
echo ""
echo -e "${CYAN}🚀 Now run these commands:${NC}"
echo -e "${YELLOW}   rm -rf .next${NC}"
echo -e "${YELLOW}   npm run dev${NC}"
echo ""
echo -e "${GREEN}🌐 Then access: http://localhost:3000${NC}"
echo ""
echo -e "${PURPLE}🎯 You should see the CyberOptics platform with:${NC}"
echo -e "${CYAN}   ✨ Cyberpunk pink theme${NC}"
echo -e "${CYAN}   👓 Product catalog${NC}"
echo -e "${CYAN}   🤖 AI-powered quiz${NC}"
echo -e "${CYAN}   🛍️ Shopping features${NC}"