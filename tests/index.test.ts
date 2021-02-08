import fs from 'fs'
import shell from 'shelljs'
import rimraf from 'rimraf'

beforeEach(() => {
  rimraf.sync('.env*')
  rimraf.sync('env*.yaml')
})

afterAll(() => {
  rimraf.sync('.env*')
  rimraf.sync('env*.yaml')
})

describe('CLI', () => {
  it('basic', () => {
    shell.exec('npx dotenv-ctrl add NODE_ENV production')
    shell.exec('ts-node ./src/index.ts')

    expect(fs.readFileSync('env.yaml', 'utf-8')).toBe('env_variables:\n  NODE_ENV: "production"\n')
  })

  it('input option', () => {
    shell.exec('npx dotenv-ctrl add NODE_ENV production -e .env.production')
    shell.exec('ts-node ./src/index.ts -i .env.production')

    expect(fs.readFileSync('env.yaml', 'utf-8')).toBe('env_variables:\n  NODE_ENV: "production"\n')
  })

  it('output option', () => {
    shell.exec('npx dotenv-ctrl add NODE_ENV production')
    shell.exec('ts-node ./src/index.ts -o env.production.yaml')

    expect(fs.readFileSync('env.production.yaml', 'utf-8')).toBe('env_variables:\n  NODE_ENV: "production"\n')
  })
})
