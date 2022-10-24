import { CachedServices } from "../background/service_factories/factory-options";

type Listener<T extends unknown[]> = (...args: [...T, CachedServices]) => void;

export const combine = <T extends unknown[]>(
  listeners: Listener<T>[],
  cachedServices: CachedServices = {}
) => {
  return (...args: T) => {
    for (const listener of listeners) {
      listener(...[...args, cachedServices]);
    }
  };
};
