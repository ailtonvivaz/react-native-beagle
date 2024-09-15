import type {
  BoxContent,
  Content,
  DetailContent,
  ListContent,
  SectionContent,
} from '../../content/types';
import type { BeagleLog } from '../../types';
import { BeagleLogPlugin } from '../../types/LogPlugin';
import { NetworkingLog } from './NetworkingLog';
import type {
  NetworkingHeaders,
  NetworkingRequest,
  NetworkingResponse,
} from './types';

export class NetworkingLogPlugin extends BeagleLogPlugin<NetworkingLog> {
  name: string = 'Networking';

  canHandle(log: BeagleLog): log is NetworkingLog {
    return log instanceof NetworkingLog;
  }

  provideCardFooter(log: NetworkingLog): BoxContent {
    const children: Content[] = [
      {
        kind: 'text',
        text: log.host,
        variant: 'caption',
      },
    ];

    if (log.response) {
      children.push({
        kind: 'text',
        text: `${log.response.duration}ms`,
        variant: 'caption',
      });
    }

    return {
      key: 'footer',
      kind: 'box',
      direction: 'row',
      justifyContent: 'space-between',
      children,
    };
  }

  provideDetailContent(log: NetworkingLog): DetailContent {
    return {
      kind: 'tab-bar',
      tabs: [
        {
          title: 'Info',
          content: this.provideInfoContent(log),
        },
        {
          title: 'Request',
          content: this.provideRequestContent(log.request),
        },
        {
          title: 'Response',
          content: this.provideResponseContent(log.response),
        },
      ],
    };
  }

  private provideInfoContent({
    request,
    response,
  }: NetworkingLog): ListContent {
    return {
      key: 'info',
      kind: 'list',
      children: [
        { kind: 'label', label: 'URL', value: request.url },
        {
          kind: 'label',
          label: 'Method',
          value: request.method,
        },
        {
          kind: 'label',
          label: 'Status',
          value: response ? response.status.toString() : 'Loading',
        },
        {
          kind: 'label',
          label: 'Duration',
          value: response ? `${response.duration}ms` : 'Loading',
        },
      ],
    };
  }

  private provideHeadersContent(
    headers: NetworkingHeaders | undefined,
    suffix: string
  ): SectionContent {
    return {
      key: `${suffix}_headers`,
      kind: 'section',
      title: 'Headers',
      children: headers
        ? Object.entries(headers).map(([key, value]) => ({
            kind: 'label',
            label: key,
            value,
          }))
        : [
            {
              kind: 'text',
              text: 'No headers',
              variant: 'caption',
            },
          ],
    };
  }

  private provideBodyContent(body: any, expanded?: boolean): SectionContent {
    let bodyContent: Content;
    if (body) {
      bodyContent = {
        kind: 'json',
        data: body,
        expanded: expanded,
      };
    } else {
      bodyContent = {
        kind: 'text',
        text: 'No body',
        variant: 'caption',
      };
    }

    return {
      key: 'body',
      kind: 'section',
      title: 'Body',
      expanded: true,
      children: [bodyContent],
    };
  }

  private provideRequestContent(request: NetworkingRequest): ListContent {
    return {
      key: 'request',
      kind: 'list',
      children: [
        this.provideHeadersContent(request.headers, 'request'),
        this.provideBodyContent(request.body, true),
      ],
    };
  }

  private provideResponseContent(response?: NetworkingResponse): ListContent {
    return {
      key: 'response',
      kind: 'list',
      children: response
        ? response.kind === 'data'
          ? [
              this.provideHeadersContent(response.headers, 'response'),
              this.provideBodyContent(response.body),
            ]
          : [
              {
                kind: 'text',
                text: response.error,
              },
            ]
        : [
            {
              kind: 'loading',
              label: 'The request is still pending',
            },
          ],
    };
  }
}
