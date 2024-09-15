import type { BeagleLog } from 'react-native-beagle';
import type { DetailContent } from '../../../../src/content/types';
import { BeagleLogPlugin } from '../../../../src/types/LogPlugin';
import { AnalyticsLog } from './types';

export class AnalyticsLogPlugin extends BeagleLogPlugin<AnalyticsLog> {
  name: string = 'Analytics';

  canHandle(log: BeagleLog): log is AnalyticsLog {
    return log instanceof AnalyticsLog;
  }

  provideDetailContent(log: AnalyticsLog): DetailContent {
    return {
      kind: 'list',
      children: [
        {
          kind: 'label',
          label: 'Event',
          value: log.event,
        },
        { kind: 'text', text: 'Parameters', variant: 'body', bold: true },
        {
          kind: 'json',
          data: log.params,
        },
      ],
    };
  }
}
