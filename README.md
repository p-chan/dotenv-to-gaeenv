# dotenv-to-gaeenv

> A CLI tool to generate gaeenv from dotenv

## Install

```bash
$ npm install dotenv-to-gaeenv --save-dev
```

## Usage

```bash
$ cat .env
NODE_ENV=production
$ npx dotenv-to-gaeenv
$ cat env.yaml
env_variables:
  NODE_ENV: "production"
```

## Options

### `-i`, `--input`

```bash
$ cat .env.production
NODE_ENV=production
$ npx dotenv-to-gaeenv -i .env.production
$ cat env.yaml
env_variables:
  NODE_ENV: "production"
```

### `-o`, `--output`

```bash
$ cat .env
NODE_ENV=production
$ npx dotenv-to-gaeenv -o env.production.yaml
$ cat env.production.yaml
env_variables:
  NODE_ENV: "production"
```

## Author

[@p-chan](https://github.com/p-chan)

## License

MIT
