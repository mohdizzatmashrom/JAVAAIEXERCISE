package com.example.AssetTracker.util;

import com.example.assettracker.util.InputSanitizer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("InputSanitizer")
class InputSanitizerTest {

    // ---------------------------------------------------------------- trimToNull

    @Nested
    @DisplayName("trimToNull")
    class TrimToNull {

        @Test
        @DisplayName("null input → null")
        void nullInput() {
            assertNull(InputSanitizer.trimToNull(null));
        }

        @Test
        @DisplayName("empty string → null")
        void emptyString() {
            assertNull(InputSanitizer.trimToNull(""));
        }

        @Test
        @DisplayName("whitespace-only → null")
        void whitespaceOnly() {
            assertNull(InputSanitizer.trimToNull("   "));
        }

        @Test
        @DisplayName("trims leading/trailing spaces")
        void trimSpaces() {
            assertEquals("hello", InputSanitizer.trimToNull("  hello  "));
        }

        @Test
        @DisplayName("preserves internal spaces")
        void preserveInternalSpaces() {
            assertEquals("hello world", InputSanitizer.trimToNull("  hello world  "));
        }

        @Test
        @DisplayName("trims tabs and newlines")
        void trimTabsAndNewlines() {
            assertEquals("data", InputSanitizer.trimToNull("\t\ndata\n\t"));
        }
    }

    // ----------------------------------------------------------------- cleanText

    @Nested
    @DisplayName("cleanText")
    class CleanText {

        @Test
        @DisplayName("null → null")
        void nullInput() {
            assertNull(InputSanitizer.cleanText(null));
        }

        @Test
        @DisplayName("blank → null")
        void blankInput() {
            assertNull(InputSanitizer.cleanText("   "));
        }

        @Test
        @DisplayName("removes ASCII control characters")
        void removesControlChars() {
            // \u0001 = SOH, \u0007 = BEL, \u001F = Unit Separator
            assertEquals("Hello World", InputSanitizer.cleanText("Hello\u0001 World\u0007"));
        }

        @Test
        @DisplayName("collapses multiple spaces into one")
        void collapsesSpaces() {
            assertEquals("a b c", InputSanitizer.cleanText("a   b    c"));
        }

        @Test
        @DisplayName("keeps letters, numbers, hyphens, periods, commas, apostrophes")
        void keepsSafeChars() {
            assertEquals("O'Brien's laptop, model-3.0",
                    InputSanitizer.cleanText("O'Brien's laptop, model-3.0"));
        }

        @Test
        @DisplayName("strips angle brackets (basic XSS mitigation)")
        void stripsAngleBrackets() {
            // < > ( ) are not in the whitelist; letters, apostrophes survive
            assertEquals("scriptalert'xss'script",
                    InputSanitizer.cleanText("<script>alert('xss')</script>"));
        }

        @Test
        @DisplayName("trims and cleans combined")
        void combined() {
            assertEquals("Clean text",
                    InputSanitizer.cleanText("  Clean\u0000  text  "));
        }
    }

    // ----------------------------------------------------------------- upperCode

    @Nested
    @DisplayName("upperCode")
    class UpperCode {

        @Test
        @DisplayName("null → null")
        void nullInput() {
            assertNull(InputSanitizer.upperCode(null));
        }

        @Test
        @DisplayName("blank → null")
        void blankInput() {
            assertNull(InputSanitizer.upperCode("   "));
        }

        @Test
        @DisplayName("trims, cleans and uppercases asset tag")
        void cleansAndUppercases() {
            assertEquals("SN-LAP-A1B2C3D4",
                    InputSanitizer.upperCode("  sn-lap-a1b2c3d4  "));
        }

        @Test
        @DisplayName("removes control chars and uppercases status code")
        void statusWithControlChars() {
            assertEquals("AVAILABLE",
                    InputSanitizer.upperCode("\u0001available\u0002"));
        }

        @Test
        @DisplayName("uppercases priority value")
        void priorityValue() {
            assertEquals("HIGH", InputSanitizer.upperCode(" high "));
        }
    }

    // ---------------------------------------------------------- normalizeOptional

    @Nested
    @DisplayName("normalizeOptional")
    class NormalizeOptional {

        @Test
        @DisplayName("null → null")
        void nullInput() {
            assertNull(InputSanitizer.normalizeOptional(null));
        }

        @Test
        @DisplayName("empty → null")
        void emptyInput() {
            assertNull(InputSanitizer.normalizeOptional(""));
        }

        @Test
        @DisplayName("whitespace-only → null")
        void whitespaceOnly() {
            assertNull(InputSanitizer.normalizeOptional("   "));
        }

        @Test
        @DisplayName("trims whitespace from valid value")
        void trimsValidValue() {
            assertEquals("john@example.com",
                    InputSanitizer.normalizeOptional("  john@example.com  "));
        }

        @Test
        @DisplayName("preserves special characters (unlike cleanText)")
        void preservesSpecialChars() {
            assertEquals("user@domain.com",
                    InputSanitizer.normalizeOptional("user@domain.com"));
        }
    }
}
