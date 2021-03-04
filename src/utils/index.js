
export const curry = func => {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
};
export const add = curry((x, y) => x + y);

export const ceil = x => Math.ceil(x);

export const divide = curry((x, y) => y / x);

export const isEmpty = x => x.length < 1;

export const max = curry(
  (x, y) => Math.max(x, y)
);

export const min = curry(
  (x, y) => Math.min(x, y)
);

export const pipe = (...fns) => (x) => fns.reduce((acc, curr) => curr(acc), x);

export const flatten = x => x.flat();

export const map = curry((x, y) => y.map(x));

export const multiply = curry((x, y) => x * y);

export const reverse = x => x.reverse();

export const self = x => x;

export const sort = x => x.sort();

export const subtract = curry((x, y) => y - x);

export const sum = x => x.reduce(add, 0);

export const toInt = x => parseInt(x);

export const unique = x => Array.from(new Set(x));

const fpUtils = {
  add,
  ceil,
  divide,
  flatten,
  isEmpty,
  min,
  map,
  max,
  multiply,
  pipe,
  reverse,
  self,
  sort,
  subtract,
  sum,
  toInt,
  unique,
};

export default fpUtils;
