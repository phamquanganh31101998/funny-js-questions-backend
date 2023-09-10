import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CatsService {
  constructor(private configService: ConfigService) {}
  private readonly cats: Cat[] = [];

  createCat(cat: Cat) {
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    console.log({ environment: this.configService.get('ENV') });
    return this.cats;
  }
}
