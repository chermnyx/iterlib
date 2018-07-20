import { Range } from '../src';

describe('Range', () => {
  it('end', () => expect(new Range(5).toArray()).toEqual([0, 1, 2, 3, 4]));
  it('from start', () => expect(new Range(2, 5).toArray()).toEqual([2, 3, 4]));
  it('with step == 0', () => expect(() => new Range(1, 1, 0)).toThrowError());
  it('with step > 0', () =>
    expect(new Range(1, 5, 2).toArray()).toEqual([1, 3]));
  it('with step < 0', () =>
    expect(new Range(10, 0, -2).toArray()).toEqual([10, 8, 6, 4, 2]));
  it('empty #1', () => expect(new Range(0).toArray()).toEqual([]));
  it('empty #2', () => expect(new Range(1, 1, 100).toArray()).toEqual([]));
  it('empty #3', () => expect(new Range(1, 1, -100).toArray()).toEqual([]));
});
