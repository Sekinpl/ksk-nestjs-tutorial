import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
// import * as winstonDaily from 'winston-daily-rotate-file'; // 이 부분은 로그를 기록하고 싶다면 주석을 해제해라.
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Logger(Winston)
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('ksk-nestjs-tutorial', { prettyPrint: true, colors: true }),
          ),
        }),
        // 아래 부분은 모두 로그를 기록하고 싶을때 사용하는 코드이다. 만약에 로그를 기록하고 싶다면 주석을 해제하면 된다.
        //  new winstonDaily(dailyOptions('info')),
        //  new winstonDaily(dailyOptions('warn')),
        //  new winstonDaily(dailyOptions('error')),
      ],

    })
  });

  // Logger(Winston) Settings

  // 아래 주석 처리 된 부분은 로그를 파일로 기록하고 싶을때 사용하는 코드이다
  //  const logDir = __dirname + '/../logs';
  //  const dailyOptions = (level: string) => {
  //    return {
  //      level,
  //      datePattern: 'YYYY-MM-DD HH:mm:ss',
  //      dirname: logDir + `/${level}`,
  //      filename: `%DATE%.${level}.log`,
  //      maxFiles: 30,
  //      zippedArchive: true,
  //    };
  //  };

  // Using Logger(Winston) Globall
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const corsOptions = {
    // ex.
    origin: "*",
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Origin',
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

  app.enableCors(corsOptions)

  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
