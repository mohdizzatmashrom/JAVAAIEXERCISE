package com.example.assettracker.util;

/**
 * InputSanitizer — utility methods for cleaning user-supplied text before
 * it is persisted or used in business logic.
 *
 * <p><b>Validation</b> decides what inputs are allowed and rejects the rest.
 * <p><b>Sanitisation</b> cleans acceptable input before saving / validating.
 *
 * <p>Examples:
 * <pre>
 *   "   SN-LAP-A1B2C3D4    " → "SN-LAP-A1B2C3D4"   (trim + upperCode)
 *   "sn-lap-a1b2c3d4"       → "SN-LAP-A1B2C3D4"   (upperCode)
 *   "  Hello \u0001World  "       → "Hello World"         (cleanText removes control chars)
 *   "   "                   → null                   (trimToNull)
 * </pre>
 *
 * <p><b>Important:</b> sanitisation must NOT be used to hide invalid input.
 * Input that fails validation should still be rejected.
 */
public class InputSanitizer {

    private InputSanitizer() {
        // Private constructor to prevent instantiation
    }

    // ---- 1. Trim leading/trailing spaces + convert empty to null ----

    /**
     * Trim leading and trailing whitespace.
     * Return {@code null} when the input is {@code null} or blank.
     */
    public static String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    // ---- 2. Remove control characters & collapse whitespace ----

    /**
     * Clean free-form text:
     * <ol>
     *   <li>Trim leading/trailing whitespace (blank → null).</li>
     *   <li>Remove control characters (ASCII 0x00–0x1F, 0x7F–0x9F).</li>
     *   <li>Remove characters outside the safe whitelist
     *       (letters, numbers, spaces, hyphens, periods, commas, apostrophes).</li>
     *   <li>Collapse consecutive whitespace to a single space.</li>
     * </ol>
     */
    public static String cleanText(String value) {
        String trimmed = trimToNull(value);
        if (trimmed == null) {
            return null;
        }
        return trimmed
                .replaceAll("\\p{Cntrl}", "")                          // remove control characters
                .replaceAll("[^\\p{L}\\p{N}\\s\\-.,']", "")           // keep safe characters only
                .replaceAll("\\s+", " ")                                // collapse whitespace
                .trim();                                                // trim again after collapsing
    }

    // ---- 3. Normalise code-like fields (uppercase) ----

    /**
     * Clean text and convert to upper-case.
     * Suitable for asset tags, serial numbers, status codes, etc.
     */
    public static String upperCode(String value) {
        String cleaned = cleanText(value);
        return cleaned == null ? null : cleaned.toUpperCase();
    }

    // ---- 4. Optional field helper ----

    /**
     * Trim an optional field; return {@code null} when blank.
     * Unlike {@link #cleanText}, this does <em>not</em> strip special characters
     * because optional fields (e.g. "assignedTo") may legitimately contain
     * a wider range of characters such as email addresses.
     */
    public static String normalizeOptional(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
