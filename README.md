## Setup

### Secure localhost

1. Install [mkcert](https://github.com/FiloSottile/mkcert)
2. Run `mkcert localhost`
3. Create `.env` file
4. Add environment variables for certfile

```
LOCAL_CERT_PATH="localhost.pem"
LOCAL_CERT_KEY_PATH="localhost-key.pem"
```

## Development

1. `npm start`
2. Write code
