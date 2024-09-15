import type { DeepPartial } from './types';

export function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  const cloneTarget: any = {};
  for (const key in target) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (typeof sourceValue === 'object' && typeof targetValue === 'object') {
        cloneTarget[key] = deepMerge(targetValue, sourceValue);
      } else {
        cloneTarget[key] = sourceValue as any;
      }
    } else {
      cloneTarget[key] = target[key] as any;
    }
  }
  return cloneTarget;
}
