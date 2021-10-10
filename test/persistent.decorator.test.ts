import { PersistentDecoratorFactory } from '../src'
import { LocalStorageMock } from './test-utils';

describe('PersistentDecoratorFactory', () => {
  beforeAll(() => {
    // @ts-ignore
    global['localStorage'] = new LocalStorageMock();
  });

  afterEach(() => {
    localStorage.clear();
  })

  test('Should return undefined when accessing data before string', () => {
    const DATA = 'hello world';
    const persistence = PersistentDecoratorFactory();

    class Storage {

      @persistence
      toStore: string

    }

    const storage = new Storage();

    expect(storage.toStore).toBe(undefined);
  });

  test('Should store data', () => {
    const DATA = 'hello world';
    const persistence = PersistentDecoratorFactory();

    class Storage {

      @persistence
      toStore: string

    }

    const storage = new Storage();
    storage.toStore = DATA;

    expect(storage.toStore).toBe(DATA);
  });

  test('Data should be stored in localStorage', () => {
    const DATA = 'hello world';
    const persistence = PersistentDecoratorFactory('APP');

    class Storage {

      @persistence
      toStore: string

    }

    const storage = new Storage();
    storage.toStore = DATA;

    expect(localStorage.getItem('APP.toStore')).toBeTruthy();
  });

  test('Should be cleared after localStorage is cleared', () => {
    const DATA = 'hello world';
    const persistence = PersistentDecoratorFactory();

    class Storage {

      @persistence
      toStore: string

    }

    const storage = new Storage();
    storage.toStore = DATA;

    localStorage.clear();

    expect(storage.toStore).toBe(undefined);
  });

  test('Changing bucket should create different storage keys', () => {
    const enginePersistence = PersistentDecoratorFactory('ENGINE');
    const DATA = 'Hi there';

    class Storage {

      @enginePersistence
      toStore: string

    }

    const storage = new Storage();
    storage.toStore = DATA;

    expect(localStorage.getItem('ENGINE.toStore')).toBeTruthy();
  });
});
