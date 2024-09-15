import { MessageLog } from './plugins';
import type { BeagleLog } from './types';
import type { BeagleLogPlugin } from './types/LogPlugin';

type LogAction = (log: BeagleLog) => void;

export class BeaglePlugins {
  private static plugins: Array<BeagleLogPlugin<BeagleLog>> = [];
  private static cache: Map<string, BeagleLogPlugin<BeagleLog>> = new Map();
  private static logAction: LogAction | undefined;
  private static enabled = false;

  private static queue: BeagleLog[] = [];

  private static flushQueue() {
    if (!this.logAction) return;

    if (this.enabled) {
      this.queue.forEach((log) => this.log(log));
    }

    this.queue = [];
  }

  static setEnabled(enabled: boolean) {
    const wasDisabled = !this.enabled;
    this.enabled = enabled;

    if (enabled && wasDisabled) {
      this.log(new MessageLog('Beagle enabled', 'info'));
    }

    this.flushQueue();
  }

  static registerPlugin(plugin: BeagleLogPlugin<BeagleLog>) {
    this.plugins.push(plugin);
  }

  static log(log: BeagleLog) {
    if (!this.enabled) return;
    if (this.logAction) {
      this.logAction(log);
      return;
    }

    this.queue.push(log);
  }

  static setLogAction(addLog: LogAction) {
    this.logAction = addLog;
    this.flushQueue();
  }

  static findPlugin<T extends BeagleLog>(log: T): BeagleLogPlugin<T> {
    const logName = log.constructor.name;

    if (this.cache.has(logName)) {
      return this.cache.get(logName) as BeagleLogPlugin<T>;
    }

    const logPlugin = this.plugins.find((plugin) => plugin.canHandle(log));

    if (!logPlugin) {
      throw new Error(`No plugin found for log: ${typeof log} ${logName}`);
    }

    this.cache.set(logName, logPlugin);
    return logPlugin as BeagleLogPlugin<T>;
  }
}
