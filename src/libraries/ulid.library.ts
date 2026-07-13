// Load Service for generating ULID (Universally Unique Lexicographically Sortable Identifier).
import { ulid, uuidToULID } from "ulidx";

/**
 * UlidLibrary
 *
 * Wraps the `ulidx` package for generating and converting ULIDs
 * (Universally Unique Lexicographically Sortable Identifiers).
 */
class UlidLibrary {
  /**
   * getUlidId
   *
   * Generates a new ULID.
   *
   * @returns {string} A newly generated ULID.
   */
  getUlidId(): string {
    return ulid();
  }

  /**
   * convertUuidToUlid
   *
   * Converts a UUID to a ULID, maintaining uniqueness while providing
   * a lexicographically sortable format.
   *
   * @param {string} uuid - The UUID to be converted.
   * @returns {string} The converted ULID.
   */
  convertUuidToUlid(uuid: string): string {
    return uuidToULID(uuid);
  }
}

const ulidLibrary = new UlidLibrary();
export { ulidLibrary };
