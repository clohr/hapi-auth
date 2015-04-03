# hapi-auth
Authentication proof of concept using [hapi](https://github.com/hapijs) as a reverse proxy with [iron](https://github.com/hueniverse/iron).

![Hapi-auth](image/glove.jpeg)

## Auth Flow
* User visits site for first time, no cookie, generate token payload, encrypt, then store in an HTTP only cookie
* User visits site with expired cookie, generate a new token payload, encrypt, then and store in an HTTP only cookie
* User visits site with invalid token TOKEN_FRESHNESS threshold but has not expired, pro-actively re-auth the user
* User visits site with invalid token TOKEN_FRESHNESS threshold and is expired, generate a new token payload, encrypt, then and store in an HTTP only cookie