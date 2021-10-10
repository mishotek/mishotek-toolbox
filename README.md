# mishotek-toolbox
Collection for useful typescript utilities

## Storage
### PersistentDecoratorFactory
Lets you persist properties even after the page refresh. Ideal for storing settings and configs, like selected language.

Usage:
```TypeScript
const persistence = PersistentDecoratorFactory();

class LanguageService {

  @persistence
  language: string;

  // Some other code...
}

const languageService = LanguageService();

// Stores 'FR' in the localStorage
languageService.language = 'FR';

// Reads value from the localStorage
const currLanguage = languageService.language;
```

Now, when you set ```storage.language``` it will be stored in the localStorage and when you try to get value, property will be read from the localStorage. This means that, this variable's  value will persist even after the refresh.

By default, localStorage key will be ```'APP.' + property name```. For example, in LanguageService case, ```language``` will be stored as ```APP.language```. However, you can change prefix, by passing custom bucket name to the PersistentDecoratorFactory:

```TypeScript
const persistence = PersistentDecoratorFactory('MY_BUCKET');

class LanguageService {

  @persistence
  language: string;

  // Some other code...
}

const languageService = LanguageService();

// Stores 'FR' with key 'MY_BUCKET.language'
languageService.language = 'FR';
```

## HTTP
### endpointDecoratorFactory
Lets you elegantly configure your endpoints.

Usage:
```TypeScript
const apiEndpoint = endpointDecoratorFactory('https://jsonplaceholder.typicode.com/');

class Endpoints {

  @apiEndpoint
  static posts(): string {
    return 'posts';
  }

  @apiEndpoint
  static post(postId: string): string {
    return `posts/${postId}`;
  }
  
  // Some more endpoints...
}

// Get all posts
// Endpoints.posts() will return https://jsonplaceholder.typicode.com/posts
fetch(Endpoints.posts())
  .then(() => { /* Do stuff... */ })

// Get particular post
// Endpoints.posts() will return https://jsonplaceholder.typicode.com/posts/123
fetch(Endpoints.post('123'))
  .then(() => { /* Do stuff... */ })
```

You could handle multiple APIs too:
```TypeScript
const jsonplaceholderEndpoint = endpointDecoratorFactory('https://jsonplaceholder.typicode.com/');
const unsplashEndpoint = endpointDecoratorFactory('https://unsplash.com/');

class Endpoints {

  @jsonplaceholderEndpoint
  static posts(): string {
    return 'posts';
  }

  @jsonplaceholderEndpoint
  static post(postId: string): string {
    return `posts/${postId}`;
  }
  
  @unsplashEndpoint
  static image(imageId: string): string {
    return `${imageId}`;
  }
  
  // Some more endpoints...
}

```
