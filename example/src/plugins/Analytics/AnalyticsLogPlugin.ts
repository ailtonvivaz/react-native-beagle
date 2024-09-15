import {
  BeagleLogPlugin,
  type BeagleLog,
  type DetailContent,
} from 'react-native-beagle';
import { AnalyticsLog } from './types';

export class AnalyticsLogPlugin extends BeagleLogPlugin<AnalyticsLog> {
  name: string = 'Analytics';

  canHandle(log: BeagleLog): log is AnalyticsLog {
    return log instanceof AnalyticsLog;
  }

  provideDetailContent(log: AnalyticsLog): DetailContent {
    return {
      key: 'analytics',
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
