## Description

[dgraph-js](https://github.com/dgraph-io/dgraph-js) module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
npm i --save @valsamonte/nestjs-dgraph dgraph grpc
```

## Quick Start

Import `DgraphModule` to your ApplicationModule

```typescript

import { Module } from '@nestjs/common';
import { DgraphModule } from '@valsamonte/nestjs-dgraph';
import * as grpc from 'grpc';

@Module({
  imports: [
    DgraphModule.forRoot({
      stubs: [
        {
          address: 'localhost:9080',
          credentials: grpc.credentials.createInsecure()
        }
      ]
      debug: true
    })
  ],
})
export class ApplicationModule {}

```

Inject `DgraphService` to your services and access the DgraphClient

```typescript

@Injectable()
export class SomeService {
  constructor(service: DgraphService) {}

  alterSchema() {
    const op = new dgraph.Operation();
    op.setSchema(schema);
    await this.service.client.alter(op);
  }
}

```