/** Sort an array by a sorting callback or a fallback sorting backup */
export function sortOr<T>(
  array: T[],
  /** Sorting callback called for each item of array */
  sort: (a: T, b: T) => number | undefined,
  /** Fallback sorting callback called for each item of array that does not return a number for the sorting first callback */
  or: (a: T, b: T) => number,
): T[] {
  return array.sort((a, b) => {
    const sort_value = sort(a, b);
    return sort_value !== undefined ? sort_value : or(a, b);
  });
}
