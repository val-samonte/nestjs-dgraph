import {
  DynamicModule,
  Module,
  OnModuleDestroy,
  Global,
  Inject,
  Provider,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DgraphModuleOptions } from './interfaces/dgraph-options.interface';
import { DGRAPH_MODULE_OPTIONS } from './dgraph.constants';
import { DgraphService } from './dgraph.service';

@Global()
@Module({})
export class DgraphCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(DGRAPH_MODULE_OPTIONS)
    private readonly options: DgraphModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  static forRoot(options: DgraphModuleOptions): DynamicModule {
    const dgraphModuleOptions: Provider = {
      provide: DGRAPH_MODULE_OPTIONS,
      useValue: options,
    };

    return {
      module: DgraphCoreModule,
      providers: [dgraphModuleOptions, DgraphService],
      exports: [DgraphService],
    };
  }

  async onModuleDestroy() {
    const service = this.moduleRef.get<DgraphService>(DgraphService);
    service.close();
  }
}
