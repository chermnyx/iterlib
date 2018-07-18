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

  it('zipLongest', () =>
    expect(new Iter([1, 1, 1]).zipLongest([2], [3]).toArray()).toEqual([
      [1, 2, 3],
      [1, undefined, undefined],
      [1, undefined, undefined],
    ]));

  it('zip', () =>
    expect(new Iter([1, 1, 1]).zip([2, 22], [3, 33]).toArray()).toEqual([[1, 2, 3], [1, 22, 33]]));

  it('entries', () =>
    expect(new Iter(['1', '2', '3']).entries().toArray()).toEqual([[0, '1'], [1, '2'], [2, '3']]));
});
