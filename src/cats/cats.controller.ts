import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dtos/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../common/exception/forbidden.exception';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
    // this.catsService.createCat(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    throw new ForbiddenException();
    // return this.catsService.findAll();
  }

  @Put(':id')
  editCatById(@Param('id') id: string): string {
    return `You have just edited a cat with id ${id}`;
  }

  @Get('/google')
  @Redirect()
  redirectToGoogle() {
    return {
      url: 'https://google.com',
      statusCode: 301,
    };
  }

  @Get(':id')
  findOneById(@Param('id') id: string): string {
    return `Found a cat with id ${id}`;
  }
}
