const { identify } = require("../src");

describe("identify", () => {
  it("identifies CRLF line terminators", () => {
    expect(identify("abc\r\ndef\r\nghi")).toBe("CRLF");
  });

  it("identifies LF line terminators", () => {
    expect(identify("abc\ndef\nghi")).toBe("LF");
  });

  it("returns NONE when no line terminators are found", () => {
    expect(identify("abcdefghi")).toBe("NONE");
    expect(identify("abcdefghi")).toBe("NONE");
    expect(identify("abc def ghi")).toBe("NONE");
    expect(identify("")).toBe("NONE");
    expect(identify(null)).toBe("NONE");
  });
});
