export type NetworkingHeaders = Record<string, string>;

export interface NetworkingRequest {
  url: string;
  method: string;
  headers?: NetworkingHeaders;
  body?: any;
}

export interface NetworkingResponseData {
  kind: 'data';
  status: number;
  headers: NetworkingHeaders;
  body: any;
  duration: number;
}

export interface NetworkingResponseError {
  kind: 'error';
  status: number;
  error: string;
  duration: number;
}

export type NetworkingResponse =
  | NetworkingResponseData
  | NetworkingResponseError;
