import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dtos/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../common/exception/forbidden.exception';
import { ValidationPipe } from '../common/pipe/validation.pipe';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  @Roles(['admin'])
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ): Promise<Cat> {
    // throw new ForbiddenException();
    return this.catsService.createCat(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    // throw new ForbiddenException();
    return this.catsService.findAll();
  }

  @Put(':id')
  editCatById(@Param('id', ParseIntPipe) id: string): string {
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
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    try {
      return `Found a cat with id ${id}`;
    } catch (e) {
      throw e;
    }
  }
}
