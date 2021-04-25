import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config'

import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'

dotenv.config()

async function bootstrap (): Promise<void> {
  const app: any = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  const configService = app.get(ConfigService)
  const apiName: string = configService.get('config.API_NAME')
  app.setGlobalPrefix(`v1/${apiName}`)

  const options = new DocumentBuilder()
    .setTitle(apiName)
    .setVersion('v1')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(`v1/${apiName}/docs`, app, document)

  await app.listen(80, '0.0.0.0')
}
bootstrap()
