import type { Content, DetailContent } from '../../content/types';
import type { BeagleLog } from '../../types';
import { BeagleLogPlugin } from '../../types/LogPlugin';

import { ErrorLog } from './ErrorLog';

export class ErrorLogPlugin extends BeagleLogPlugin<ErrorLog> {
  name: string = 'Error';

  canHandle(log: BeagleLog): log is ErrorLog {
    return log instanceof ErrorLog;
  }

  provideDetailContent({ error, message }: ErrorLog): DetailContent {
    if (!(error instanceof Error)) {
      return {
        kind: 'list',
        children: [
          {
            kind: 'text',
            text: message,
            selectable: true,
          },
        ],
      };
    }

    const listItems: Content[] = [
      { kind: 'label', label: 'Name', value: error.name, selectable: true },
      {
        kind: 'label',
        label: 'Message',
        value: error.message,
        selectable: true,
      },
    ];

    if (error.stack) {
      listItems.push({
        kind: 'text',
        text: 'Stack',
        variant: 'body',
        bold: true,
      });
      listItems.push({ kind: 'text', text: error.stack, selectable: true });
    }

    if (error.cause) {
      listItems.push({
        kind: 'text',
        text: 'Cause',
        variant: 'body',
        bold: true,
        selectable: true,
      });
      listItems.push({
        kind: 'text',
        text: error.cause?.toString() ?? '',
        selectable: true,
      });
    }

    return {
      kind: 'list',
      children: listItems,
    };
  }
}
