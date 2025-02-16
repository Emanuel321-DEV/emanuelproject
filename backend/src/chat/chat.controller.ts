/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {

    @UseGuards(JwtAuthGuard)
    @Get()
    getChat() {
      return { message: 'Acesso autorizado à área de chat' };
    }

}
