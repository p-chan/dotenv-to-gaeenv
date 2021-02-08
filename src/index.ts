#!/usr/bin/env node

import { cac } from 'cac'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

import { version } from './version'

type Options = {
  '--': any[]
  i?: string
  input?: string
  o?: string
  output?: string
}

const cli = cac()

cli
  .command('')
  .option('-i,--input <path>', 'File path of dotenv (defautl: .env)')
  .option('-o,--output <path>', 'File path of gaeenv (default: env.yaml)')
  .example((name) => {
    return `${name}`
  })
  .action(async (options: Options) => {
    try {
      const cwd = process.cwd()

      const input = path.resolve(cwd, options.i || '.env')
      const output = path.resolve(cwd, options.o || 'env.yaml')

      const { error, parsed } = dotenv.config({ path: input })

      if (error) throw new Error('.env is invalid')

      const body = yaml.dump(
        {
          env_variables: parsed,
        },
        {
          quotingType: '"',
          forceQuotes: true,
        }
      )

      await fs.promises.writeFile(output, body, 'utf-8')

      return process.exit(0)
    } catch (error) {
      console.error(error)

      return process.exit(1)
    }
  })

cli.version(version)
cli.help()

cli.parse()
