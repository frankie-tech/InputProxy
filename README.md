# Input Proxy

## Store JSON in an HTMLInputElement with less hassle

**Reason**

Forgetting to restringify your JSON into the input? Tired of writing the same function to unparse the JSON just for one value?

I sure did! So I wrapped my HTMLInputElement in a Proxy, and wrote some `get` and `set` methods to deal with just that.

**Benefits**

Pass in an HTMLInputElement, and then the value becomes a JSON object that you can access just be requesting the key.

#### Example

```js
import { IP } from '../input-proxy.js';

const input = document.getElementById('StoresJSON');
const wrappedInput = IP(input);

wrappedInput.name = 'John'; //

wrappedInput.name; // 'John'

// Access the input values like so
input.value; // '{ "name": "John" }'
// or
wrappedInput.__value; // '{ "name": "John" }'

// If a key hasn't been set or is deleted,
// InputProxy returns null
delete wrappedInput.name;

wrappedInput.name; // null
```

**WARNING**

To prevent issues with `JSON.stringify`, on creation InputProxy sets the value of the element passed in to be `'{}'`.
