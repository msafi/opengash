var fs = require('fs')
  , output = ''
  , outputFile = 'deploy-output.txt'

require('shelljs/global')

// Navigate to /var/wwww/opengash
cd('/var/www/opengash')

fs.unlinkSync(outputFile)

// Do a git pull
output = exec('git pull').output + '\n\n'
fs.appendFileSync(outputFile, output)

// npm install
output = exec('npm install').output + '\n\n'
fs.appendFileSync(outputFile, output)

// forever stopall
output = exec('forever stopall').output + '\n\n'
fs.appendFileSync(outputFile, output)

// grunt
output = exec('grunt').output + '\n\n'
fs.appendFileSync(outputFile, output)

// forever start build/server/server.js
output = exec('forever start build/server/server.js').output + '\n\n'
fs.appendFileSync(outputFile, output)

// exit the script
exit(1)