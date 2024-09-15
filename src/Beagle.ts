import { BeaglePlugins } from './BeaglePlugins';
import { BeagleLog } from './types';
import type { BeagleLogPlugin } from './types/LogPlugin';

export class Beagle {
  static registerPlugin(plugin: BeagleLogPlugin<BeagleLog>) {
    BeaglePlugins.registerPlugin(plugin);
  }

  static log(log: BeagleLog): void {
    BeaglePlugins.log(log);
  }
}
