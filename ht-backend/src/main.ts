import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        // const result = errors.map((error) => ({
        //   property: error.property,
        //   message: error.constraints[Object.keys(error.constraints)[0]],
        // }));
        const result = errors.map(
          (error) => error.constraints[Object.keys(error.constraints)[0]],
        );
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );

  app.enableCors();

  await app.listen(5000);
  logger.debug(`⚡ App is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
