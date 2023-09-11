import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Redirect,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dtos/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../common/exception/forbidden.exception';
import { ValidationPipe } from '../common/pipe/validation.pipe';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { TransformInterceptor } from '../common/interceptor/transform.interceptor';
import { CatId } from './decorator/cat-id.decorator';
import { REQUEST } from '@nestjs/core';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject(REQUEST) private request: Request,
  ) {}

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
  async findAll(@CatId('catId', ParseIntPipe) catId: string): Promise<Cat[]> {
    console.log({ catId });
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
    console.log(this.request);
    try {
      return `Found a cat with id ${id}`;
    } catch (e) {
      throw e;
    }
  }
}
