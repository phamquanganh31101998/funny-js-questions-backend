import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { EnvConfig } from './interfaces/env-config.interface';
import { ProviderToken } from './constants/provider-token';
import { ConfigOptions } from './interfaces/config-options.interface';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
import { INQUIRER } from '@nestjs/core';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: ConfigOptions,
    @Inject(INQUIRER) private parentClass: object,
  ) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(
      __dirname,
      '../../src/',
      options.folderPath,
      filePath,
    );
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    console.log(
      `Class ${this.parentClass?.constructor?.name} request environment variable with key ${key}`,
    );
    return this.envConfig[key] || '';
  }
}
