# mishotek-toolbox
Collection for useful typescript/javascript utilities

## Storage
### PersistentDecoratorFactory
Lets you persist properties even after the page refresh. Ideal for storing settings and configs, like selected language.

Usage:
```TypeScript
const persistent = PersistentDecoratorFactory();

class LanguageService {

  @persistent
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
const persistent = PersistentDecoratorFactory('MY_BUCKET');

class LanguageService {

  @persistent
  language: string;

  // Some other code...
}

const languageService = LanguageService();

// Stores 'FR' with key 'MY_BUCKET.language'
languageService.language = 'FR';
```
