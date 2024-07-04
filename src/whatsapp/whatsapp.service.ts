import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class WhatsappService {
  private VERIFY_TOKEN: string;
  constructor(private configService: ConfigService) {
    const TOKEN = this.configService.get<string>('VERIFY_TOKEN');

    if (!TOKEN) {
      throw new Error('Missing VERIFY_TOKEN');
    }

    this.VERIFY_TOKEN = TOKEN;
  }

  webhook(challenge: string, mode: string, verify_token: string | undefined) {
    console.log('Webhook Received', challenge, mode, verify_token);
    if (verify_token === this.VERIFY_TOKEN) {
      return challenge;
    }

    return 'Invalid verification token';
  }

  saveMessage(phone: string, message: string) {
    return `Message saved to ${phone}: ${message}`;
  }

  sendMessage(phone: string, message: string) {
    return `Message sent to ${phone}: ${message}`;
  }
}
