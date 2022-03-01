import { Message } from '@bwl-opentools/api-interfaces';
import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Redirect('/swagger')
  getRedirect() {
    return;
  }

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
}
