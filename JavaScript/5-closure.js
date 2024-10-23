'use strict';

const keyCollector = (keys) => {
  let finished = false;
  let count = 0;
  let done = null;
  const data = {};

  const set = (key, value) => {
    if (!finished) {
      const expected = keys.includes(key);
      const has = data[key] !== undefined;
      if (!has && expected) count++;
      data[key] = value;
      if (count === keys.length) {
        finished = true;
        if (done) done(data);
      }
    }
  };

  const then = (resolve) => (done = resolve);

  return { set, then };
};

// Usage

const main = async () => {
  const ac = keyCollector(['fileName', 'userName']);

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
