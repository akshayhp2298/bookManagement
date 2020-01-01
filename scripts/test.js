// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''
// This is a hack to ignore ssl errors, it's harmful to security
// We need to decide wether to allow any content from user, or to ignore
// harmfull content.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
require('dotenv').config()
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  console.log(err)
  throw err
})
const jest = require('jest')
const argv = process.argv.slice(2)
const path = require('path')
// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch')
}
argv.push('--forceExit')
argv.push('--config', path.resolve('jestConfig.js'))
console.log(argv)
jest.run(argv)