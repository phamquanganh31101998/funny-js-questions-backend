import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ProviderToken } from './constants/provider-token';
import { ConfigOptions } from './interfaces/config-options.interface';
import { ConfigurableModuleClass } from './config.module-definition';

// @Global()
// @Module({})
// export class ConfigModule {
//   static forRoot(options: ConfigOptions): DynamicModule {
//     return {
//       module: ConfigModule,
//       providers: [
//         {
//           provide: ProviderToken.CONFIG_OPTIONS,
//           useValue: options,
//         },
//         ConfigService,
//       ],
//       exports: [ConfigService],
//     };
//   }
// }

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {}
