import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Single allowed frontend origin from .env
  const allowedOrigin = process.env.FRONTEND_URL;

  if (!allowedOrigin) {
    throw new Error('FRONTEND_URL is not defined in .env file');
  }

  console.log('CORS Configuration');
  console.log('Allowed Origin:', allowedOrigin);

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests without origin (Postman, curl, mobile apps)
      if (!origin) {
        return callback(null, true);
      }

      if (origin === allowedOrigin) {
        console.log(`CORS: Allowing origin -> ${origin}`);
        return callback(null, true);
      }

      console.log(`CORS: Blocking origin -> ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 8080;
  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}`);
}

bootstrap();
