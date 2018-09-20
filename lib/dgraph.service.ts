import { Injectable, Inject } from '@nestjs/common';
import { DGRAPH_MODULE_OPTIONS } from './dgraph.constants';
import { DgraphModuleOptions } from './interfaces/dgraph-options.interface';
import { DgraphClient, DgraphClientStub } from 'dgraph-js';

@Injectable()
export class DgraphService {
  private _client: DgraphClient;
  private _stubs: DgraphClientStub[];

  get client(): DgraphClient {
    return this._client;
  }

  constructor(@Inject(DGRAPH_MODULE_OPTIONS) options: DgraphModuleOptions) {
    this._stubs = options.stubs.map(stub => {
      return new DgraphClientStub(stub.address, stub.credentials, stub.options);
    });
    this._client = new DgraphClient(...this._stubs);
    if (options.debug) {
      this._client.setDebugMode(true);
    }
  }

  close() {
    this._stubs.forEach(stub => {
      stub.close();
    });
  }
}
