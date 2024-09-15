import type { DetailContent } from '../../content/types';
import type { BeagleLog } from '../../types';
import { BeagleLogPlugin } from '../../types/LogPlugin';

import { MessageLog } from './MessageLog';

export class MessageLogPlugin extends BeagleLogPlugin<MessageLog> {
  name: string = 'Message';

  canHandle(log: BeagleLog): log is MessageLog {
    return log instanceof MessageLog;
  }

  provideDetailContent(log: BeagleLog): DetailContent {
    return {
      key: 'message',
      kind: 'list',
      children: [
        {
          kind: 'text',
          text: log.message,
          selectable: true,
        },
      ],
    };
  }
}
