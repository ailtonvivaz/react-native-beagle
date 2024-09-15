import { BeagleLog, type LogLevel } from '../../types';
import type { NetworkingRequest, NetworkingResponse } from './types';

export class NetworkingLog extends BeagleLog {
  url: string;
  host: string;
  request: NetworkingRequest;
  response?: NetworkingResponse;

  constructor(
    request: NetworkingRequest,
    response?: NetworkingResponse,
    id?: string
  ) {
    const url = request.url;

    let host = '';
    let path = '';

    // eslint-disable-next-line no-useless-escape
    const pattern = /^(?:https?:\/\/)([^\/]+)(.*)?$/;
    const match = url.match(pattern);

    if (match) {
      host = match[1] || '';
      path = match[2] || '';
    }

    const message = `${request.method} ${path}`;

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
    this.host = host;
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
