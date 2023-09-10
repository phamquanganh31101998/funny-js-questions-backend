import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigOptions } from './interfaces/config-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ConfigOptions>()
    .setClassMethodName('forRoot')
    .build();
