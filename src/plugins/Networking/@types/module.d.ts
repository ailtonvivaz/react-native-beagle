// https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Network/XHRInterceptor.js

declare module 'react-native/Libraries/Network/XHRInterceptor' {
  interface XHR {
    _appLoggerId?: string;
    _appLoggerStart?: Date;
    responseHeaders?: Record<string, string>;
    _response?: string;
  }

  export function isInterceptorEnabled(): boolean;
  export function setOpenCallback(
    callback: (method: string, url: string, xhr: XHR) => void
  ): void;
  export function setRequestHeaderCallback(
    callback: (header: string, value: string, xhr: XHR) => void
  ): void;
  export function setSendCallback(
    callback: (data: string | null, xhr: XHR) => void
  ): void;
  export function setHeaderReceivedCallback(
    callback: (
      contentType: string,
      size: number | undefined,
      headers: string,
      xhr: XHR
    ) => void
  ): void;
  export function setResponseCallback(
    callback: (
      status: number,
      timeout: number,
      body: string,
      responseURL: string,
      responseType: string,
      xhr: XHR
    ) => void
  ): void;
  export function enableInterception(): void;
  export function disableInterception(): void;
}

declare module 'react-native/Libraries/Blob/FileReader' {
  type Events =
    | 'abort'
    | 'error'
    | 'load'
    | 'loadstart'
    | 'loadend'
    | 'progress';
  export default class {
    constructor();

    result: string;
    error: any;

    readAsText(blob: any, encoding: string = 'UTF-8'): boolean;
    addEventListener(name: Events, callback: () => void): boolean;
  }
}
