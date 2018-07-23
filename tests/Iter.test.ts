import { Iter } from '../src';

it('simple', () => expect(new Iter([1, 2, 3]).toArray()).toEqual([1, 2, 3]));

it('promisify', async () => {
  const arr = [1, 2, 3];
  const newArrPromise = new Iter(arr).map(async x => x ** 3).promisify();

  expect(newArrPromise).toBeInstanceOf(Promise);
  const newArr = await newArrPromise;
  expect(newArr).toEqual(arr.map(x => x ** 3));
});

it('exec', () => {
  const arr = [1, 2, 3];
  const sqrs: number[] = [];

  new Iter(arr)
    .map(x => x ** 2)
    .map(x => sqrs.push(x))
    .exec();

  expect(sqrs).toEqual(arr.map(x => x ** 2));
});

describe('all', () => {
  it('false', () => expect(new Iter([0, 1, false]).all()).toBeFalsy());
  it('true', () => expect(new Iter(['2', 1, true]).all()).toBeTruthy());
});

describe('any', () => {
  it('false', () => expect(new Iter([0, false, NaN]).any()).toBeFalsy());
  it('true', () => expect(new Iter([0, 1, false]).any()).toBeTruthy());
});

describe('every', () => {
  it('true', () =>
    expect(new Iter(['aa', 'ba']).every(x => x.endsWith('a'))).toBeTruthy());
  it('false', () =>
    expect(
      new Iter(['aa', 'ba', 'ac']).every(x => x.endsWith('a'))
    ).toBeFalsy());
});

describe('some', () => {
  it('true', () =>
    expect(new Iter(['aa', 'b']).some(x => x.endsWith('a'))).toBeTruthy());
  it('false', () =>
    expect(
      new Iter(['aac', 'bac', 'ac']).some(x => x.endsWith('a'))
    ).toBeFalsy());
});

describe('find', () => {
  it('defined', () => expect(new Iter([1, 2, 3]).find(x => x == 2)).toBe(2));
  it('undefined', () =>
    expect(new Iter([1, 2, 3]).find(x => x == 100)).toBe(undefined));
});

describe('includes', () => {
  it('NaN', () => expect(new Iter([NaN]).includes(NaN)).toBeTruthy());
  it('false', () => expect(new Iter<any>([]).includes(NaN)).toBeFalsy());
  it('true', () => expect(new Iter([1, 2, 3]).includes(3)).toBeTruthy());
});

describe('join', () => {
  it('simple', () =>
    expect(new Iter([1, 'kek', 2]).join('.')).toBe('1.kek.2'));
  it('empty', () => expect(new Iter<any>([]).join()).toBe(''));
  it('no default arg', () =>
    expect(new Iter([1, '2', 3]).join()).toBe('1,2,3'));
});

describe('reduce', () => {
  it('string', () =>
    expect(
      new Iter([1, 2, 3]).reduce((acc, val) => acc + String(val), '')
    ).toBe('123'));

  it('empty', () =>
    expect(new Iter<number>([]).reduce((acc, val) => acc + val, 0)).toBe(0));
});

describe('new iterators', () => {
  it('concat', () =>
    expect(
      new Iter([1, 1, 1])
        .concat([2, 2], [3, 3, 3])
        .concat([false, 'kek'])
        .toArray()
    ).toEqual([1, 1, 1, 2, 2, 3, 3, 3, false, 'kek']));

  it('zipLongest', () =>
    expect(new Iter([1, 1, 1]).zipLongest([2], [3]).toArray()).toEqual([
      [1, 2, 3],
      [1, undefined, undefined],
      [1, undefined, undefined],
    ]));

  it('zip', () =>
    expect(new Iter([1, 1, 1]).zip([2, 22], [3, 33]).toArray()).toEqual([
      [1, 2, 3],
      [1, 22, 33],
    ]));

  it('entries', () =>
    expect(new Iter(['1', '2', '3']).entries().toArray()).toEqual([
      [0, '1'],
      [1, '2'],
      [2, '3'],
    ]));

  it('map', () => {
    expect(
      new Iter([1, 2, 'kek', null, NaN, {}]).map(String).toArray()
    ).toEqual(['1', '2', 'kek', 'null', 'NaN', '[object Object]']);

    expect(new Iter([1, 2, 3]).map(x => x ** 2));
  });

  it('slice', () => {
    const arr = [...Array(10).keys()];

    for (let start = 0; start < arr.length; ++start) {
      for (let end = 0; end < arr.length; ++end) {
        expect(new Iter(arr).slice(start, end).toArray()).toEqual(
          arr.slice(start, end)
        );
      }
    }
  });

  it('take', () =>
    expect(new Iter(['0', 2, 3, 10, 5, 'k']).take(3).toArray()).toEqual([
      '0',
      2,
      3,
    ]));

  it('skip', () =>
    expect(new Iter([0, 1, 2, 3, 4]).skip(3).toArray()).toEqual([3, 4]));

  it('filter', () =>
    expect(
      new Iter([5, 10, 2, 3, 5, 6]).filter((x, i) => i > 1 && x > 2).toArray()
    ).toEqual([3, 5, 6]));
});
