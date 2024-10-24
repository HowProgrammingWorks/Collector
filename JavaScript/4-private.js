'use strict';

class KeyCollector {
  #finished = false;
  #data = {};
  #keys = [];
  #count = 0;
  #done = null;

  constructor(keys) {
    this.#keys = keys;
  }

  set(key, value) {
    if (this.#finished) return;
    const expected = this.#keys.includes(key);
    const has = this.#data[key] !== undefined;
    if (!has && expected) this.#count++;
    this.#data[key] = value;
    if (this.#count === this.#keys.length) {
      this.#finished = true;
      if (this.#done) this.#done(this.#data);
    }
  }

  then(resolve) {
    this.#done = resolve;
  }
}

// Usage

const main = async () => {
  const ac = new KeyCollector(['fileName', 'userName']);

  setTimeout(() => {
    ac.set('fileName', 'marcus.txt');
  }, 100);

  setTimeout(() => {
    ac.set('userName', 'Marcus');
  }, 200);

  const result = await ac;
  console.log(result);
};

main();
