/**
 * A generic, abstract class for managing an array-like collection of items.
 * @template T The type of elements stored in the list.
 */
export abstract class List<T> {
  /**
   * Constructor for the List class.
   * @param inner The internal array that stores the elements.
   * @throws Error if the provided array is not
   */
  protected constructor(protected inner: T[]) {
    if (!inner) {
      throw new Error("The inner array cannot be null or undefined.");
    }
    if (!Array.isArray(inner)) {
      throw new Error("The inner array must be an array.");
    }
  }

  /**
   * Fetches a list asynchronously.
   * This method must be implemented by subclasses.
   * @returns A promise resolving to a `List` instance.
   * @throws Error if not implemented by the subclass.
   */
  public static getAsync(): Promise<List<unknown>> {
    throw new Error("Method 'getAsync' not implemented");
  }

  /**
   * Provides direct access to the internal array of items.
   * @returns A reference to the internal array of items.
   */
  public asArray(): T[] {
    return this.inner;
  }

  /**
   * Returns a copy of the internal array of items.
   * This ensures the internal array remains immutable when accessed via this method.
   * @returns A new array containing the elements of the internal array.
   */
  public all(): T[] {
    return [...this.inner];
  }
}
