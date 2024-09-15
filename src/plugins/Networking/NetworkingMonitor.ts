import BlobFileReader from 'react-native/Libraries/Blob/FileReader';
import XHRInterceptor, {
  type XHR,
} from 'react-native/Libraries/Network/XHRInterceptor';

import { nanoid } from '../../utils/nanoid';
import type {
  NetworkingRequest,
  NetworkingResponse,
  NetworkingResponseData,
} from './types';

type OnRequestCallback = (options: {
  request: NetworkingRequest;
  id: string;
}) => void;

type OnResponseCallback = (options: {
  response: NetworkingResponse;
  request: NetworkingRequest;
  id: string;
}) => void;

export class NetworkingMonitor {
  private static instance: NetworkingMonitor;

  private _pendingRequests: Map<string, NetworkingRequest> = new Map();
  private _pendingResponses: Map<
    string,
    Pick<NetworkingResponseData, 'headers'>
  > = new Map();

  private onRequestCallback: OnRequestCallback | undefined;
  private onResponseCallback: OnResponseCallback | undefined;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new NetworkingMonitor();
    }
    return this.instance;
  }

  onRequest(callback: OnRequestCallback): this {
    this.onRequestCallback = callback;
    return this;
  }

  onResponse(callback: OnResponseCallback): this {
    this.onResponseCallback = callback;
    return this;
  }

  startMonitoring(): this {
    XHRInterceptor.enableInterception();
    XHRInterceptor.setOpenCallback((method, url, xhr) => {
      const id = nanoid(6);
      xhr._appLoggerId = id;
      xhr._appLoggerStart = new Date();
      this._pendingRequests.set(id, {
        url,
        method,
      });
    });

    XHRInterceptor.setRequestHeaderCallback((header, value, xhr) => {
      const id = xhr._appLoggerId;
      if (!id) return;
      const request = this._pendingRequests.get(id);
      if (!request) return;
      request.headers = {
        ...request.headers,
        [header]: value,
      };
    });

    XHRInterceptor.setSendCallback((data, xhr) => {
      const id = xhr._appLoggerId;
      if (!id) return;
      const request = this._pendingRequests.get(id);
      if (!request) return;
      request.body = this.parseData(data);
      this.onRequestCallback?.({ request, id });
    });

    XHRInterceptor.setHeaderReceivedCallback((_, __, ___, xhr) => {
      const id = xhr._appLoggerId;
      if (!id) return;
      this._pendingResponses.set(id, {
        headers: xhr.responseHeaders || {},
      });
    });

    XHRInterceptor.setResponseCallback(
      async (
        status: number,
        _: number,
        body: string,
        __: string,
        responseType: string,
        xhr: XHR
      ) => {
        const id = xhr._appLoggerId;
        const start = xhr._appLoggerStart;
        if (!id || !start) return;

        const pendingRequest = this._pendingRequests.get(id);
        if (!pendingRequest) return;
        const duration = new Date().getTime() - start.getTime();

        if (status < 100) {
          this._pendingRequests.delete(id);
          this.onResponseCallback?.({
            response: {
              kind: 'error',
              status,
              error: xhr._response ?? 'Request was aborted',
              duration,
            },
            request: pendingRequest,
            id,
          });
          return;
        }

        const pendingResponse = this._pendingResponses.get(id);
        if (!pendingResponse) return;

        const response: NetworkingResponse = {
          kind: 'data',
          status,
          headers: pendingResponse.headers,
          body: await this.getResponseBody(responseType, body),
          duration,
        };

        this._pendingRequests.delete(id);
        this._pendingResponses.delete(id);
        this.onResponseCallback?.({ response, request: pendingRequest, id });
      }
    );

    return this;
  }

  stopMonitoring() {
    XHRInterceptor.disableInterception();
    this._pendingRequests.clear();
    this._pendingResponses.clear();
    this.onRequestCallback = () => {};
    this.onResponseCallback = () => {};
  }

  private async parseResponseBlob(body: string) {
    const blobReader = new BlobFileReader();
    blobReader.readAsText(body);

    return await new Promise<string>((resolve, reject) => {
      const handleError = () => reject(blobReader.error);

      blobReader.addEventListener('load', () => {
        resolve(blobReader.result);
      });
      blobReader.addEventListener('error', handleError);
      blobReader.addEventListener('abort', handleError);
    });
  }

  private parseData(data: any) {
    const fromEntries = (arr: any[]) => {
      return arr.reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});
    };

    try {
      if (data?._parts?.length) {
        return fromEntries(data?._parts);
      }
      return JSON.parse(data);
    } catch (e) {
      return { data };
    }
  }

  private async getResponseBody(responseType: string, body: string) {
    const data = await (responseType !== 'blob'
      ? body
      : this.parseResponseBlob(body));

    return this.parseData(data);
  }
}
