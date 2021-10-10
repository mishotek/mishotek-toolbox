export const PersistentDecoratorFactory = function (bucket = 'APP') {
  return function (target: any, propertyKey: string): any {
    const localStorageKey = `${bucket}.${propertyKey}`;

    Object.defineProperty(target, propertyKey, {
      set: (data: any) => {
        localStorage.setItem(localStorageKey, JSON.stringify({value: data}));
      },
      get: () => {
        const stored = localStorage.getItem(localStorageKey);

        try {
          return JSON.parse(stored).value;
        } catch (e) {
          return undefined;
        }
      },
      enumerable: true,
      configurable: true
    });
  }
}
