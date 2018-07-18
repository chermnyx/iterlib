import { Iter } from '../src';

it('Simple', () => expect(new Iter([1, 2, 3]).toArray()).toEqual([1, 2, 3]));

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
});