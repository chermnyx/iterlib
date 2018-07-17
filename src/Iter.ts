function getIteratotr<T>(iter: Iterable<T>) {
  return iter[Symbol.iterator]();
}

export default class Iter<T> implements Iterable<T> {
  private iter: Iterator<T>;

  constructor(iter: Iterable<T>) {
    this.iter = getIteratotr(iter);
  }

  // tslint:disable-next-line
  public [Symbol.iterator]() {
    return this.iter;
  }

  toArray() {
    return [...this];
  }

  /**
   * @returns `true` if all elements of the iterable are true (or if the iterable is empty)
   */
  all(): boolean {
    for (const i of this) if (!i) return false;
    return true;
  }

  /**
   * @returns `true` if any element of the iterable is true.
   * If the iterable is empty, return `false`
   */
  any(): boolean {
    for (const i of this) if (i) return true;
    return false;
  }

  /**
   * combines iterators:
   * `cocant([1, 1], [2, 2]) == [1, 1, 2, 2]`
   */
  concat<U>(...iters: Iterable<U>[]) {
    return new Iter<T | U>(
      function*(this: Iter<T>) {
        yield* this;
        for (const iter of iters) yield* iter;
      }.call(this),
    );
  }

  // tslint:disable-next-line
  private _zip<U>(longest: boolean, iterables: Iterable<U>[]) {
    return new Iter<(T | U)[]>(
      // based on https://github.com/fitzgen/wu.js/blob/master/wu.js
      function*(this: Iter<T>) {
        const iters = [getIteratotr(this), ...iterables.map(getIteratotr)];

        for (;;) {
          let numFinished = 0;
          const zipped = [];

          for (const iter of iters) {
            const { value, done } = iter.next();

            if (done) {
              if (!longest) {
                return;
              }

              numFinished += 1;
              if (numFinished === iters.length) {
                return;
              }
            }

            zipped.push(value);
          }

          yield zipped;
        }
      }.call(this),
    );
  }

  zip<U>(...iters: Iterable<U>[]) {
    return this._zip<U>(false, iters);
  }

  zipLongest<U>(...iters: Iterable<U>[]) {
    return this._zip<U | undefined>(true, iters);
  }
}
