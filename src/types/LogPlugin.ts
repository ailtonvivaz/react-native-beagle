import type { BoxContent, Content, DetailContent } from './../content';
import type { BeagleLog } from './Log';

export abstract class BeagleLogPlugin<T extends BeagleLog> {
  abstract name: string;

  abstract canHandle(log: BeagleLog): log is T;
  abstract provideDetailContent(log: T): DetailContent;

  provideCardFooter(_: T): Content | BoxContent | null {
    return null;
  }

  exportToJSON(log: T): string {
    return JSON.stringify(log);
  }
}
