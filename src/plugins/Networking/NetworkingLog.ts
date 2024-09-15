import { BeagleLog, type LogLevel } from '../../types';
import type { NetworkingRequest, NetworkingResponse } from './types';

export class NetworkingLog extends BeagleLog {
  url: URL;
  request: NetworkingRequest;
  response?: NetworkingResponse;

  get host(): string {
    return this.url.host;
  }

  constructor(
    request: NetworkingRequest,
    response?: NetworkingResponse,
    id?: string
  ) {
    const url = new URL(request.url);

    const message = `${request.method} ${url.pathname}${url.search}`;

    if (response) {
      const level: LogLevel = (() => {
        if (response.kind === 'error' || response.status >= 400) {
          return 'error';
        }
        if (response.status >= 300) {
          return 'warning';
        }
        return 'success';
      })();

      super(message, level, id);
    } else {
      super(message, 'loading', id);
    }

    this.url = url;
    this.request = request;
    this.response = response;
  }

  filter(query: string): boolean {
    return (
      this.message.toLowerCase().includes(query.toLowerCase()) ||
      this.host.toLowerCase().includes(query.toLowerCase())
    );
  }
}
