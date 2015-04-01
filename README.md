# hapi-yar
Basic hapi reverse proxy setup with yar

## Auth Flow
* User visits site for first time, no cookie, generate token payload, serialize, then store in an HTTP only cookie
* User visits site with expired cookie, generate a new token payload, serialize, then and store in an HTTP only cookie
* User visits site with invalid token TOKEN_FRESHNESS threshold but has not expired, pro-actively re-auth the user
* User visits site with invalid token TOKEN_FRESHNESS threshold and is expired, generate a new token payload, serialize, then and store in an HTTP only cookie