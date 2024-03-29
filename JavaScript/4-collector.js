'use strict';

class Collector {
  done = false;
  data = {};
  keys = [];
  count = 0;
  #resolve = null;

  constructor(keys) {
    this.keys = keys;
  }

  set(key, value) {
    if (this.done) return;
    const expected = this.keys.includes(key);
    const has = this.data[key] !== undefined;
    if (!has && expected) this.count++;
    this.data[key] = value;
    if (this.count === this.keys.length) {
      this.done = true;
      if (this.#resolve) this.#resolve(this.data);
    }
  }

  then(resolve) {
    this.#resolve = resolve;
  }
}

// Usage

(async () => {
  const ac = new Collector(['fileName', 'userName']);

  setTimeout(() => {
    ac.set('fileName', 'marcus.txt');
  }, 100);

  setTimeout(() => {
    ac.set('userName', 'Marcus');
  }, 200);

  const result = await ac;
  console.log(result);
})();
