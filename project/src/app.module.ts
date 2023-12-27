import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('ksk-nestjs-tutorial', { prettyPrint: true, colors: true }),
          ),
        }),
      ],
    }),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
