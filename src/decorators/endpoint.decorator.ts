export function endpointDecoratorFactory(root: string) {
  return function endpointDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    const original = descriptor.value;

    descriptor.value = function (...params: any[]) {
      return `${root}${original(...params)}`;
    }

    return descriptor;
  }
}
