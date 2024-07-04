import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';

describe('WhatsappController', () => {
  let whatsappController: WhatsappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WhatsappController],
      providers: [WhatsappService],
    }).compile();

    whatsappController = app.get<WhatsappController>(WhatsappController);
  });

  describe('webhook', () => {
    it('Valid verification token', () => {
      expect(
        whatsappController.webhook(
          'challenge',
          'mode',
          'vadfivhfuvbbsdjbsdfvsfbibfb',
        ),
      ).toBe('challenge');
    });
    it('Invalid verification token', () => {
      expect(
        whatsappController.webhook('challenge', 'mode', 'verify_token'),
      ).toBe('Invalid verification token');
    });
  });
});
