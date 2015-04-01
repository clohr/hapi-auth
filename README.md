# hapi-yar
Basic hapi reverse proxy setup with yar

![Hapi-yar](image/pirate.jpg)

## Auth Flow

### Guest
* User visits site for first time, no cookie, hapi plugin generates token payload and stores in HTTP only cookie
* User visits site for second time with expired cookie, hapi plugin generates a new auth token payload and stores in HTTP only cookie
* User visits site for second time with valid cookie older than 5 minutes, hapi plugin pro-actively re-auths user

### Authorized
* User visits Authorized endpoint after 5 minutes of receiving valid token and is within the re-auth window, user is re-auth'd
* User visits Authorized endpoint after 5 minutes of receiving valid token and is beyond re-auth window, user is prompted to login