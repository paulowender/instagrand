import { Controller, Get, Post, Query } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller()
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('/whatsapp/webhook')
  webhook(
    @Query('hub.challenge') challenge: string,
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') verify_token: string,
  ): string {
    return this.whatsappService.webhook(challenge, mode, verify_token);
  }

  @Post('/whatsapp/sendMessage')
  sendMessage(
    @Query('phone') phone: string,
    @Query('message') message: string,
  ): string {
    if (!phone || !message) {
      throw new Error('Missing phone or message');
    }
    return this.whatsappService.sendMessage(phone, message);
  }
}
