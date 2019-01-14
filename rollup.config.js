import pkg from './package.json';

module.exports = {
  input: [pkg.module],
  output: {
    name: pkg.name,
    file: pkg.main,
    format: 'umd'
  },
}
