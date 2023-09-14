import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DogsService implements OnModuleInit {
  onModuleInit(): any {
    console.log('Init DogsService provider...');
  }

  bark(): string {
    return 'Woof woof!';
  }
}
