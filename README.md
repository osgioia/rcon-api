# rcon-api

Counter Strike RCON - Console Manager en Express

## Production host

[https://rcon-express.herokuapp.com/](https://rcon-express.herokuapp.com/)

## API

### `GET /`

Solamente un "Hello World" en JSON.

### `POST /`

Retorna un plain text con el comando especificado.

Se tiene que poner:

| key     | value           |
|---------|-----------------|
| host    | your_ip_address |
| port    | port_rcon       |
| pass    | password_rcon   |
| command | your_command    |

En formato x-www-form-urlencoded



> [https://rcon-express.herokuapp.com/](https://rcon-express.herokuapp.com/)


## Creditos

[https://twitter.com/aioigzo](https://twitter.com/aioigzo)
