const express = require('express')
const bodyParser = require('body-parser')
const readline = require('readline');
const rcon = require('rcon');
const app = express()



let host, port, pass, tcp, challenge,id,command

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  return res.json({hello: 'world'});
});

app.post('/', (req, res) => {

    if (req.body.host === "") {
        res.status(500).send({ error: "No Host" })
    }
    if (req.body.port === "") {
        res.status(500).send({ error: "No Port" })
    }
    if (req.body.pass === "") {
        res.status(500).send({ error: "No Password" })
    }
    if (req.body.command === "") {
        res.status(500).send({ error: "No Command" })
    }
    if (req.body.host != "" & req.body.port != "" & req.body.pass != "" & req.body.command != "") 
        {
    host = req.body.host
    port = req.body.port
    pass = req.body.pass
    command = req.body.command
    id = ''
    tcp = 'false'
    challenge = 'true'

    const read_interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '\u001b[33m' + 'RCON> ' + '\u001b[0m'
      });

    const connection = new rcon(
        host,
        port,
        pass,
        {
          id: id,
          tcp: !!JSON.parse(tcp),
          challenge: !!JSON.parse(challenge),
        },
      );

    //console.log(`Connecting to ${RCON_HOST}:${RCON_PORT}\n`);

    connection.on('auth', () => {
        connection.send(command);
      });

      connection.on('response', (result) => {
        console.log(result);
        res.json(result)
        //res.json(res)
      
        if (result.indexOf('Bad rcon_password.') > -1) {
            res.status(500).send({ error: 'Bad rcon_password.' })
        }
      
        //read_interface.prompt();
      });
      
      connection.on('error', () => {})
        
      connection.on('end', () => {
        console.log('Socket closed!');
        res.status(500).send({ error: 'Socket closed!' })
      });
      
      connection.connect();
      
      read_interface.on('line', (line) => {
        if (['exit', 'quit'].includes(line)) {
        //  process.exit(0);
            console.error("Don't Kill")
        }
      
          connection.send(line);
      });

    
}           

});

app.listen(3000, () => console.log(`Started server at http://localhost:3000!`));