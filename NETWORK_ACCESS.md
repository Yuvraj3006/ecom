# Network Access Guide for CyberOptics Platform

## 🌐 Accessing the Application

The CyberOptics platform is now configured to accept connections from any device on your network.

### 🔗 Access URLs

#### Local Access (same machine):
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000

#### Network Access (from other devices):
- **Frontend**: http://[YOUR_IP]:3000
- **Admin Panel**: http://[YOUR_IP]:3000/admin
- **Backend API**: http://[YOUR_IP]:5000

Replace `[YOUR_IP]` with your machine's IP address.

## 🔍 Finding Your IP Address

### On Linux/macOS:
```bash
# Get your local network IP
ip addr show | grep "inet " | grep -v 127.0.0.1
# or
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### On Windows:
```cmd
ipconfig | findstr "IPv4"
```

### Common IP ranges:
- `192.168.1.x` (home networks)
- `192.168.0.x` (home networks)
- `10.0.0.x` (corporate networks)
- `172.16.x.x` to `172.31.x.x` (corporate networks)

## 🛠️ Troubleshooting 403 Errors

If you're still getting HTTP 403 errors:

### 1. Check Firewall Settings
Make sure ports 3000 and 5000 are not blocked by your firewall.

#### Linux (ufw):
```bash
sudo ufw allow 3000
sudo ufw allow 5000
```

#### Linux (iptables):
```bash
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 5000 -j ACCEPT
```

#### Windows:
- Open Windows Defender Firewall
- Add inbound rules for ports 3000 and 5000

#### macOS:
```bash
# Check if firewall is blocking
sudo pfctl -sr | grep 3000
```

### 2. Check if Process is Binding Correctly
```bash
# Check if Next.js is listening on all interfaces
netstat -tlnp | grep :3000
# Should show 0.0.0.0:3000, not 127.0.0.1:3000

# Or use lsof
lsof -i :3000
```

### 3. Restart with Correct Binding
```bash
# Stop existing processes
pkill -f "next dev"

# Start with correct binding
npx next dev -H 0.0.0.0 -p 3000
```

### 4. Alternative: Use the Updated Scripts
```bash
# The npm scripts are now configured for network access
npm run dev
# or
npm run dev:full
```

## 🚀 Quick Start Commands

### Start Everything:
```bash
./start.sh
```

### Start Frontend Only:
```bash
npm run dev
```

### Start with Database Seeding:
```bash
./start.sh --seed
```

## 📱 Mobile/Remote Access

Once the server is running with `0.0.0.0` binding:

1. Find your machine's IP address (e.g., `192.168.1.100`)
2. On any device connected to the same network:
   - Open browser
   - Navigate to `http://192.168.1.100:3000`
   - Enjoy the cyberpunk eyewear experience!

## 🔐 Security Note

The `0.0.0.0` binding allows access from any device on your network. For production deployment:

- Use proper reverse proxy (nginx, Apache)
- Configure SSL/TLS certificates
- Set up proper firewall rules
- Use environment-specific configurations

## ✅ Verification

To verify the server is accessible:

```bash
# Test local access
curl -I http://localhost:3000

# Test network access (replace with your IP)
curl -I http://192.168.1.100:3000
```

Both should return `HTTP/1.1 200 OK`.

---

🎯 **The CyberOptics platform is now ready for network access!**