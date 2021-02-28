import {
  add,
  divide,
  flatten,
  map,
  multiply,
  pipe,
  reverse,
  self,
  sort,
  subtract,
  sum,
  unique
} from './';

describe('add', () => {
  test('it adds two numbers', () => {
    expect(add(3, 4)).toEqual(7);
    expect(add(5)(6)).toEqual(11);
  });
});

describe('divide', () => {
  test('it divides the second argument by the first and returns the result', () => {
    expect(divide(3, 12)).toEqual(4);
    expect(divide(1)(20)).toEqual(20);
    expect(divide(4)(3)).toEqual(0.75);
    expect(divide(0)(0)).toEqual(NaN);
    expect(divide(0)(5)).toEqual(Infinity);
  });
});

describe('flatten', () => {
  test('it returns a flattened array', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    expect(flatten(data)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe('pipe', () => {
  test('it composes functions from an amount of function arguments', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [4, 5, 6]
    ];

    const transform = pipe(
      flatten,
      unique,
      map(x => x + 1),
      reverse
    );

    expect(transform(data)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2]);
  });
});

describe('map', () => {
  test('it iterates over an array', () => {
    const data = [1, 2, 3, 4, 5, 6];
    const result = pipe(
      map(self)
    )(data);
    expect(result).toEqual(data);
  });

  test('it iterates over an array and runs each array element through a transformer function', () => {
    const data = [1, 2, 3, 4, 5, 6];
    const result = pipe(
      map(x => x + 1)
    )(data);
    expect(result).toEqual([2, 3, 4, 5, 6, 7]);
  });
});

describe('multiply', () => {
  test('it multplies two arguments and returns the result', () => {
    expect(multiply(1, 1)).toEqual(1);
    expect(multiply(1, 0)).toEqual(0);
    expect(multiply(5, 5)).toEqual(25);
    expect(multiply(3, 4)).toEqual(12);
    expect(multiply(4, 3)).toEqual(12);
    expect(multiply(6)(6)).toEqual(36);
    expect(multiply(100)(10)).toEqual(1000);
  });
});

describe('reverse', () => {
  test('it returns an array of numbers in reverse order', () => {
    const data = [1, 2, 3, 4, 5];
    expect(reverse(data)).toEqual([5, 4, 3, 2, 1]);
  });

  test('it returns an array of strings in reverse order', () => {
    const data = ['fox', 'wolf', 'dog'];
    expect(reverse(data)).toEqual(['dog', 'wolf', 'fox']);
  });
});

describe('self', () => {
  test('it returns exactly what was supplied to it', () => {
    expect(self(true)).toEqual(true);
    expect(self([])).toEqual([]);
    expect(self({})).toEqual({});
    expect(self({ name: 'Grant' })).toEqual({ name: 'Grant' });
  });
});

describe('sort', () => {
  test('it returns an array of numbers sorted into ascending order', () => {
    const data = [2, 1, 3, 5, 4];
    expect(sort(data)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('subtract', () => {
  test('it subtracts the first argument from the second and returns the result', () => {
    expect(subtract(7, 9)).toEqual(2);
    expect(subtract(5)(2)).toEqual(-3);
    expect(subtract(0)(15)).toEqual(15);
    expect(subtract(0)(0)).toEqual(0);
    expect(subtract(25)(25)).toEqual(0);
  });
});

describe('sum', () => {
  test('it adds together an array of numbers (of any length) and returns the result', () => {
    expect(sum([1, 2, 3])).toEqual(6);
    expect(sum([1, 2, 3, 4, 5, 6])).toEqual(21);
    expect(sum([0])).toEqual(0);
    expect(sum([0, 1])).toEqual(1);
    expect(sum([5, -3, -1])).toEqual(1);
    expect(sum([])).toEqual(0);
  });
});

describe('unique', () => {
  test('it returns an array unchanged if empty', () => {
    expect(unique([])).toEqual([]);
  });

  test('it returns an array of numbers with all duplicates removed', () => {
    expect(unique([1])).toEqual([1]);
    expect(unique([1, 2, 2, 3, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test('it returns an array of strings with all duplicates removed', () => {
    expect(unique(['cat', 'dog', 'wolf', 'fox', 'dog', 'cat', 'fish'])).toEqual(['cat', 'dog', 'wolf', 'fox', 'fish']);
  });
});
