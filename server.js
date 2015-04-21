var fs          = require('fs')
  , http        = require('http')
  , inquirer    = require('inquirer')
  , querystring = require('querystring')
  
    // The config object sent to the user.
  , config = {
      interval: 10000,
      variance: 5000,
      count:    50
    }
    
  , log = 1 // The current log ID.

  , server = http.createServer(function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.writeHead(200, {'Content-Type': 'text/plain'})

      switch (req.method) {
        case 'GET':
          res.end(JSON.stringify(config))
          break
        case 'POST':
          var body = ''

          req.on('data', function (data) { body += data })

          req.on('end', function () {
            fs.writeFile(
              'logs/' + (log++) + '.txt',
              JSON.stringify(querystring.parse(body))
            )
          })

          res.end(JSON.stringify({}))
          break
      }
    }).listen(3030, '127.0.0.1')

console.log('Server running at http://127.0.0.1:3030/')

    // Generate a question for the admin.
var question = function (variable) {
      inquirer.prompt({
        name: variable,
        message: 'Enter a new value for ' + variable + ': '
      }, function (answer) {
        config[variable] = parseInt(answer[variable])
        loop()
      })
    }

    // Main loop.
  , loop = function () {
      inquirer.prompt({
        type:    'list',
        name:    'menu',
        message: 'What do you want to do?',
        choices: [
          'Update interval.',
          'Update variance.',
          'Update type.',
          'Kill the server.'
        ]
      }, function (answer) {
          switch (answer.menu) {
            case 'Update interval.':
              question('interval')
              break
            case 'Update variance.':
              question('variance')
              break
            case 'Update type.':
              question('count')
              break
            case 'Kill the server':
            default:
              server.close()
              return
          }
      })
    }

loop()