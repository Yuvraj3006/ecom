const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing CyberOptics CSS and config issues...');

// Fix globals.css
const globalsCSS = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&display=swap');
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
    @apply bg-gradient-background text-neutral-dark font-body;
    font-feature-settings: "rlig" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  .glassmorphic {
    @apply backdrop-blur-md bg-white/20 border border-white/30;
  }
  
  .gradient-text {
    @apply bg-gradient-primary bg-clip-text text-transparent;
  }
  
  .btn-primary {
    @apply bg-gradient-primary text-white px-6 py-3 rounded-button font-medium transition-all duration-300 hover:shadow-neon-glow hover:scale-105 active:scale-95;
  }
  
  .card {
    @apply bg-white/80 backdrop-blur-sm border border-white/30 rounded-card shadow-soft-card hover:shadow-soft-card-hover transition-all duration-300;
  }
  
  .input-field {
    @apply w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm;
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
}`;

// Fix next.config.js
const nextConfig = `/** @type {import('next').NextConfig} */
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

module.exports = nextConfig`;

// Write files
try {
  fs.writeFileSync('./app/globals.css', globalsCSS);
  console.log('✅ Fixed app/globals.css');
} catch (err) {
  console.log('❌ Could not write app/globals.css:', err.message);
}

try {
  fs.writeFileSync('./next.config.js', nextConfig);
  console.log('✅ Fixed next.config.js');
} catch (err) {
  console.log('❌ Could not write next.config.js:', err.message);
}

console.log('');
console.log('🚀 Fixes applied! Now run:');
console.log('   rm -rf .next');
console.log('   npm run dev');
console.log('');
console.log('🌐 Then access: http://localhost:3000');