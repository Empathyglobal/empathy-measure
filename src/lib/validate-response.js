/** Reject unexpected provider output before passing it into the reflection UI.
 * @param {unknown} value
 * @returns {Record<string, unknown>}
 */
export function requireObjectResponse(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('The provider returned an unexpected response.');
  }
  return /** @type {Record<string, unknown>} */ (value);
}
