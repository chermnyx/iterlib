import { Range, Caller } from '../src';

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

describe('Caller', () => {
  it('infinity', () =>
    expect(new Caller(() => 0).take(100).toArray()).toEqual(
      Array(100).fill(0)
    ));

  it('counter', () => {
    let val = 0;
    expect(new Caller(() => val++, 3).take(10).toArray()).toEqual([0, 1, 2]);
  });
});
