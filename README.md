# hapi-auth
Basic auth POC using [hapi](https://github.com/hapijs) [yar](https://github.com/hapijs/yar) and a client-side reverse-proxy

![Hapi-auth](image/pirate.jpg)

## Auth Flow
* User visits site for first time, no cookie, generate token payload, encrypt, then store in an HTTP only cookie
* User visits site with expired cookie, generate a new token payload, encrypt, then and store in an HTTP only cookie
* User visits site with invalid token TOKEN_FRESHNESS threshold, but token has not expired, pro-actively re-auth the user
* User visits site with invalid token TOKEN_FRESHNESS threshold and is expired, generate a new token payload, encrypt, then and store in an HTTP only cookie

## Further Enchancements
* Add SSL support
* Restrict by domain name
