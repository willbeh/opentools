import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateScrapperDto {
  @ApiProperty()
  @IsUrl()
  url: string;
}
