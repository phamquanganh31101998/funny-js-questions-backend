import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { EnvConfig } from './interfaces/env-config.interface';
import { ProviderToken } from './constants/provider-token';
import { ConfigOptions } from './interfaces/config-options.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(
    @Inject(ProviderToken.CONFIG_OPTIONS) private options: ConfigOptions,
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
    return this.envConfig[key] || '';
  }
}
