import { registerAs } from '@nestjs/config'

const env = process.env?.NODE_ENV || 'local'

const configsEnviroment = {
  dev: {
    API_NAME: 'refunds'
  },
  pre: {},
  prod: {}
}

export const isDeployed = (): boolean => ['dev', 'pre', 'prod'].includes(env)
export const configs = registerAs('config', () => configsEnviroment[env === 'local' ? 'dev' : env])

export const configDBCredentials = registerAs('', () => {
  const config = process.env?.VARS || '{}'
  const parseConfig = {}
  const configParse = JSON.parse(config)
  for (const key in configParse) {
    parseConfig[key] = configParse[key]
  }
  return parseConfig
})
