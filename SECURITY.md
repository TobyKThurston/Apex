# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue. Instead, please report it via one of the following methods:

1. **Email**: Send details to [your-email@example.com]
2. **Private Security Advisory**: Use GitHub's private vulnerability reporting feature

### What to Include

When reporting a vulnerability, please include:

- **Description**: Clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact if exploited
- **Suggested Fix**: If you have ideas for a fix (optional)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (typically 30-90 days)

### Security Best Practices

When using this project:

- **Never commit API keys** or secrets to the repository
- **Use environment variables** for all sensitive data
- **Keep dependencies updated** regularly
- **Review code changes** before deploying
- **Use HTTPS** in production
- **Implement rate limiting** for API calls

## Security Considerations

### API Keys

- Store API keys in `.env.local` (never commit this file)
- Rotate keys regularly
- Use different keys for development and production
- Monitor API usage for unusual activity

### Data Handling

- Market data is fetched in real-time (not stored)
- User data (waitlist) is stored securely in Supabase
- No sensitive financial data is stored locally

### Dependencies

We regularly update dependencies to patch security vulnerabilities. To check for vulnerabilities:

```bash
npm audit
```

To fix vulnerabilities:

```bash
npm audit fix
```

---

**Thank you for helping keep Apex Terminal secure!**
