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

  private provideHeadersContent(headers?: NetworkingHeaders): SectionContent {
    return {
      kind: 'section',
      title: 'Headers',
      children: headers
        ? Object.entries(headers).map(([key, value]) => ({
            kind: 'label',
            label: key,
            value,
          }))
        : [{ kind: 'text', text: 'No headers', variant: 'caption' }],
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
      kind: 'section',
      title: 'Body',
      expanded: true,
      children: [bodyContent],
    };
  }

  private provideRequestContent(request: NetworkingRequest): ListContent {
    return {
      kind: 'list',
      children: [
        this.provideHeadersContent(request.headers),
        this.provideBodyContent(request.body, true),
      ],
    };
  }

  private provideResponseContent(response?: NetworkingResponse): ListContent {
    return {
      kind: 'list',
      children: response
        ? response.kind === 'data'
          ? [
              this.provideHeadersContent(response.headers),
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
