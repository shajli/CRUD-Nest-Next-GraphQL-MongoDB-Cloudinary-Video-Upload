import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.use(graphqlUploadExpress({ maxFileSize: 1000*1000*1000*1000, maxFiles: 10 }));
  await app.listen(4000);
}
bootstrap();
