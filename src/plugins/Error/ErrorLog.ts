import { BeagleLog } from '../../types';

export class ErrorLog extends BeagleLog {
  error: unknown;

  constructor(error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    super(message, 'error');
    this.error = error;
  }
}
