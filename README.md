# OpenConnect Agent

Open source Windows agent for the OpenConnect remote monitoring and management (RMM) platform.

## 🚀 Features

- ✅ **Silent Installation** - No user interaction required
- ✅ **Persistent Service** - Runs as Windows service, survives reboots  
- ✅ **Real-Time Communication** - WebSocket-based instant connections
- ✅ **Screen Sharing** - High-performance screen capture
- ✅ **Remote Control** - Keyboard and mouse control
- ✅ **Secure by Default** - TLS 1.3 encryption, no telemetry
- ✅ **Low Resource Usage** - <50MB RAM, minimal CPU usage
- ✅ **Lifetime Sessions** - Connect anytime with permanent session IDs

## 📦 Installation

### For IT Administrators

Download the latest signed release:

```
https://github.com/kensusyna-star/openconnect-agent/releases/latest
```

Run with your session ID:

```powershell
.\OpenConnectAgent-setup.exe -SessionID "your-session-id-here"
```

The installer will:
1. Copy agent to %APPDATA%\OpenConnect
2. Create Windows service (starts automatically)
3. Configure session ID
4. Start the agent immediately

### For Developers

Build from source:

```bash
git clone https://github.com/kensusyna-star/openconnect-agent.git
cd openconnect-agent
# Build instructions coming soon
```

## 🔒 Security

OpenConnect Agent is **open source for transparency**. Enterprise clients can audit the code before deployment.

**Security Features:**
- All network communication encrypted (TLS 1.3)
- No data collection or telemetry
- Runs with standard user privileges (no admin required)
- Code is digitally signed by **OpenConnect** (verified publisher)
- Regular security audits

**Vulnerability Reporting:** See [SECURITY.md](docs/SECURITY.md)

## 🏢 Enterprise Support

Looking for:
- Managed hosting (we host your backend)
- Priority support (phone, email, chat)
- Custom features or integration
- SLA guarantees (99.9% uptime)
- White-label branding

**Contact:** kensusyna@gmail.com

## 📖 Documentation

- [Installation Guide](docs/INSTALLATION.md)
- [Security Policy](docs/SECURITY.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome! We accept:
- Bug reports and fixes
- Feature requests and implementations
- Documentation improvements
- Security vulnerability reports

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2026 kensusyna-star

## 🙏 Acknowledgments

- Code signing provided by [SignPath Foundation](https://about.signpath.io/product/open-source) (free for open source)
- Built with love for the IT and MSP community

## ⭐ Star History

If you find this project useful, please consider starring it on GitHub!
