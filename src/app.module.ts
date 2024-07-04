import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo global, disponível em toda a aplicação sem a necessidade de importar em outros módulos.
      envFilePath: ['.env.development', '.env'], // Define os caminhos dos arquivos de ambiente
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').required(),
        VERIFY_TOKEN: Joi.string().required(),
      }),
    }),
    WhatsappModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
