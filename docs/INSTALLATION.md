# Installation Guide

## System Requirements

- Windows 10 or later (64-bit)
- .NET Framework 4.8 or later
- 50MB free disk space
- Internet connection

## Installation Methods

### Method 1: One-Click Installer (Recommended)

1. Download from [Releases](https://github.com/kensusyna-star/openconnect-agent/releases/latest)
2. Run `OpenConnectAgent-setup.exe`
3. Installation completes silently in background

### Method 2: Manual Installation

1. Download `OpenConnectAgent.exe`
2. Copy to `%APPDATA%\OpenConnect\`
3. Create Windows service:

```powershell
sc.exe create "OpenConnectAgent" binPath= "%APPDATA%\OpenConnect\OpenConnectAgent.exe" start= auto
sc.exe start "OpenConnectAgent"
```

## Configuration

Edit `%APPDATA%\OpenConnect\session.conf`:

```
SessionID=your-session-id-here
ServerURL=wss://your-server.com:8443
AutoReconnect=true
```

## Uninstallation

### Method 1: Control Panel

1. Settings → Apps → OpenConnect Agent → Uninstall

### Method 2: PowerShell

```powershell
# Stop and remove service
sc.exe stop "OpenConnectAgent"
sc.exe delete "OpenConnectAgent"

# Remove files
Remove-Item -Recurse -Force $env:APPDATA\OpenConnect
```

## Troubleshooting

### Agent won't start

Check Windows Event Viewer:
- Applications and Services Logs → OpenConnect

### Can't connect to server

1. Verify internet connection
2. Check firewall rules (allow port 8443)
3. Verify server URL in session.conf

### Service crashes

Check logs at: `%APPDATA%\OpenConnect\Logs\agent.log`
