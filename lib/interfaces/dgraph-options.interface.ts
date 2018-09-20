import * as grpc from 'grpc';

export interface DgraphModuleOptions {
  stubs: {
    address?: string | null;
    credentials?: grpc.ChannelCredentials | null;
    options?: object | null;
  }[];
  debug?: boolean;
}
