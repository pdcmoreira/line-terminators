const { identify, convert } = require("../src");

describe("convert", () => {
  it("converts line terminators to LF", () => {
    expect(convert("abc\r\ndef\r\nghi", "LF")).toBe("abc\ndef\nghi");
    expect(convert("abc\ndef\nghi", "LF")).toBe("abc\ndef\nghi");
  });

  it("converts line terminators to CRLF", () => {
    expect(convert("abc\r\ndef\r\nghi", "CRLF")).toBe("abc\r\ndef\r\nghi");
    expect(convert("abc\ndef\nghi", "CRLF")).toBe("abc\r\ndef\r\nghi");
  });

  it("deletes line terminators", () => {
    expect(convert("abc\r\ndef\r\nghi")).toBe("abcdefghi");
    expect(convert("abc\r\ndef\r\nghi", null)).toBe("abcdefghi");
    expect(convert("abc\r\ndef\r\nghi", "NONE")).toBe("abcdefghi");
    expect(convert("abc\ndef\nghi")).toBe("abcdefghi");
    expect(convert("abc\ndef\nghi", null)).toBe("abcdefghi");
    expect(convert("abc\ndef\nghi", "abcdefghi")).toBe("abcdefghi");
    expect(convert("abcdefghi")).toBe("abcdefghi");
  });
});
