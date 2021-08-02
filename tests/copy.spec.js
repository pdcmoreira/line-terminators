const { copy } = require("../src");

describe("copy", () => {
  it("copies line terminators from source string", () => {
    expect(copy("abc\r\ndef\r\nghi", "tuv\nxyz")).toBe("tuv\r\nxyz");
    expect(copy("abc\r\ndef\r\nghi", "tuv\r\nxyz")).toBe("tuv\r\nxyz");
    expect(copy("abc\ndef\nghi", "tuv\nxyz")).toBe("tuv\nxyz");
    expect(copy("abc\ndef\nghi", "tuv\r\nxyz")).toBe("tuv\nxyz");
  });

  it("keeps line terminators when the source string has no line terminators", () => {
    expect(copy("abcdefghi", "tuv\nxyz")).toBe("tuv\nxyz");
    expect(copy("abcdefghi", "tuv\r\nxyz")).toBe("tuv\r\nxyz");
  });

  describe("deleteIfNone is passed as true", () => {
    it("deletes the line terminators if the source string has no line terminators", () => {
      expect(copy("abcdefghi", "tuv\nxyz", true)).toBe("tuvxyz");
      expect(copy("abcdefghi", "tuv\r\nxyz", true)).toBe("tuvxyz");
    });
  });
});
