const { convert } = require("../src");

describe("convert", () => {
  it("converts line terminators to LF", () => {
    expect(convert("abc\r\ndef\r\nghi", "LF")).toBe("abc\ndef\nghi");
    expect(convert("abc\ndef\nghi", "LF")).toBe("abc\ndef\nghi");
  });

  it("converts line terminators to CRLF", () => {
    expect(convert("abc\r\ndef\r\nghi", "CRLF")).toBe("abc\r\ndef\r\nghi");
    expect(convert("abc\ndef\nghi", "CRLF")).toBe("abc\r\ndef\r\nghi");
  });

  it("keeps the original string if it has no line terminators", () => {
    expect(convert("abcdefghi", "CRLF")).toBe("abcdefghi");
    expect(convert("abcdefghi", "LF")).toBe("abcdefghi");
    expect(convert("abcdefghi", "NONE")).toBe("abcdefghi");
  });

  it("keeps the original string if target line terminators are NONE", () => {
    expect(convert("abc\r\ndef\r\nghi")).toBe("abc\r\ndef\r\nghi");
    expect(convert("abc\r\ndef\r\nghi", null)).toBe("abc\r\ndef\r\nghi");
    expect(convert("abc\r\ndef\r\nghi", "NONE")).toBe("abc\r\ndef\r\nghi");
    expect(convert("abc\ndef\nghi")).toBe("abc\ndef\nghi");
    expect(convert("abc\ndef\nghi", null)).toBe("abc\ndef\nghi");
    expect(convert("abc\ndef\nghi", "abcdefghi")).toBe("abc\ndef\nghi");
    expect(convert("abcdefghi")).toBe("abcdefghi");
  });

  describe("deleteIfNone is passed as true", () => {
    it("deletes the line terminators if target line terminators are NONE", () => {
      expect(convert("abc\r\ndef\r\nghi", undefined, true)).toBe("abcdefghi");
      expect(convert("abc\r\ndef\r\nghi", null, true)).toBe("abcdefghi");
      expect(convert("abc\r\ndef\r\nghi", "NONE", true)).toBe("abcdefghi");
      expect(convert("abc\ndef\nghi", undefined, true)).toBe("abcdefghi");
      expect(convert("abc\ndef\nghi", null, true)).toBe("abcdefghi");
      expect(convert("abc\ndef\nghi", "abcdefghi", true)).toBe("abcdefghi");
      expect(convert("abcdefghi", undefined, true)).toBe("abcdefghi");
    });

    it("still converts line terminators to LF", () => {
      expect(convert("abc\r\ndef\r\nghi", "LF", true)).toBe("abc\ndef\nghi");
      expect(convert("abc\ndef\nghi", "LF", true)).toBe("abc\ndef\nghi");
    });

    it("still converts line terminators to CRLF", () => {
      expect(convert("abc\r\ndef\r\nghi", "CRLF", true)).toBe(
        "abc\r\ndef\r\nghi"
      );
      expect(convert("abc\ndef\nghi", "CRLF", true)).toBe("abc\r\ndef\r\nghi");
    });

    it("still keeps the original string if it has no line terminators", () => {
      expect(convert("abcdefghi", "CRLF", true)).toBe("abcdefghi");
      expect(convert("abcdefghi", "LF", true)).toBe("abcdefghi");
      expect(convert("abcdefghi", "NONE", true)).toBe("abcdefghi");
    });
  });
});
