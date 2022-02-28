import { CreateScrapperDto } from '@bwl-opentools/models/scrapper/create-scrapper.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScrapperService } from './scrapper.service';

@ApiTags('Scrapper')
@Controller('scrapper')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Post()
  @ApiOperation({
    summary: 'Scrap the given url',
    description: 'Scrap the given url',
  })
  create(@Body() createScrapperDto: CreateScrapperDto) {
    return this.scrapperService.create(createScrapperDto);
  }
}
