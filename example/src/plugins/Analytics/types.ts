import { BeagleLog } from 'react-native-beagle';

export class AnalyticsLog extends BeagleLog {
  event: string;
  params: Record<string, any>;

  constructor(event: string, params: Record<string, any>) {
    super(`Log ${event}`, 'info');
    this.event = event;
    this.params = params;
  }
}
