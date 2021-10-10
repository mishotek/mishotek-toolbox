import {endpointDecoratorFactory} from '../src';

describe('endpointDecoratorFactory', () => {
  test('Should return correct url', () => {
    const API_ROOT = 'https://myServer.com/api/v1/';
    const apiEndpoint = endpointDecoratorFactory(API_ROOT);

    class Endpoints {

      @apiEndpoint
      static users(): string {
        return 'users';
      }
    }

    expect(Endpoints.users()).toBe(API_ROOT + 'users');
  });

  test('Should be able to make calculations in the endpoint', () => {
    const API_ROOT = 'https://myServer.com/api/v1/';
    const apiEndpoint = endpointDecoratorFactory(API_ROOT);

    class Endpoints {

      @apiEndpoint
      static user(userId: string): string {
        return `user/${userId}`;
      }
    }

    expect(Endpoints.user('1234')).toBe(API_ROOT + 'user/1234');
  });
});
