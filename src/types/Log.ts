import { nanoid } from '../utils/nanoid';

export type LogLevel = 'loading' | 'info' | 'warning' | 'error' | 'success';

export abstract class BeagleLog {
  id: string;
  time: Date;
  message: string;
  level: LogLevel = 'info';

  constructor(message: string, level?: LogLevel, id?: string) {
    this.id = id ?? nanoid(6);
    this.time = new Date();
    this.message = message;
    this.level = level ?? 'info';
  }

  filter(query: string): boolean {
    return this.message.toLowerCase().includes(query.toLowerCase());
  }
}
