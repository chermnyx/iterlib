export default class Iter<T> implements Iterable<T> {
  private iter: Iterator<T>;

  constructor(iter: Iterable<T>) {
    this.iter = iter[Symbol.iterator]();
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

  concat<T1>(...iters: Iterable<T1>[]) {
    return new Iter<T | T1>(
      function*(this: Iter<T>) {
        yield* this;
        for (const iter of iters) yield* iter;
      }.bind(this)(),
    );
  }
}
