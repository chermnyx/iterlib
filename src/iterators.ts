import Iter from './Iter';

export class Range extends Iter<number> {
  constructor(stop: number);
  constructor(start: number, stop: number, step?: number);
  constructor(start: number, stop?: number, step = 1) {
    if (step == 0) throw new Error("`step` can't be `0`");

    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    const iter =
      step > 0
        ? (function*() {
            for (let i = start; i < stop; i += step) yield i;
          })()
        : (function*() {
            for (let i = start; i > stop; i += step) yield i;
          })();

    super(iter);
  }
}
