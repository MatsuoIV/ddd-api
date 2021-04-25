import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { isDeployed, configDBCredentials, configs } from 'src/shared/config'
import { UserModule } from './Users/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: isDeployed() ? [configDBCredentials, configs] : [configs],
      ignoreEnvFile: isDeployed(),
      cache: isDeployed(),
      isGlobal: true
    }),
    UserModule
  ],
  providers: []
})
export class AppModule { }
