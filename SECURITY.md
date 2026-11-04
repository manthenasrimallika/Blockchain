# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| main branch | ✅ Yes |

---

## Reporting a Vulnerability

If you discover a security vulnerability in DecentraSocial, please **do not** open a public GitHub issue.

Instead, report it privately by emailing: **manthenasrimallika@email.com**

Please include:
- A clear description of the vulnerability
- Steps to reproduce it
- The potential impact
- Any suggested fix (optional)

We will respond within **48 hours** and work with you to resolve the issue responsibly.

---

## Security Features in This Project

- Passwords hashed with **bcrypt** (12 rounds)
- **JWT** tokens for stateless authentication
- **AES-256** encrypted private messages with random IV per message
- Smart contract **access control** via `onlyAuthorized` modifier
- Rate limiting: **200 requests / 15 minutes** per IP
- **Helmet** HTTP security headers
- Input validation on all API endpoints
- CORS restricted to known client origin
- `.env` secrets never committed to version control
