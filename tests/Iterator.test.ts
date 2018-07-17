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

describe('new iterators', () => {
  it('concat', () =>
    expect(
      new Iter([1, 1, 1])
        .concat([2, 2], [3, 3, 3])
        .concat([false, 'kek'])
        .toArray(),
    ).toEqual([1, 1, 1, 2, 2, 3, 3, 3, false, 'kek']));
});
