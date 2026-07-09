# Security Policy

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please:

1. **DO NOT** open a public GitHub issue
2. Email: kensusyna@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Response Timeline

- **24 hours:** Initial response acknowledging receipt
- **7 days:** Assessment and proposed fix timeline
- **30 days:** Fix deployed and public disclosure (if appropriate)

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | ✅ Yes             |
| < 1.0   | ❌ No              |

## Security Features

- TLS 1.3 encryption for all network communication
- Certificate pinning (optional)
- No telemetry or data collection
- Runs with minimal privileges
- Regular security audits
- Digitally signed releases

## Security Best Practices

When deploying OpenConnect Agent:

1. Always download from official GitHub releases
2. Verify digital signature before installation
3. Use firewall rules to restrict connections
4. Monitor agent logs for suspicious activity
5. Keep agent updated to latest version
6. Use strong, unique session IDs
