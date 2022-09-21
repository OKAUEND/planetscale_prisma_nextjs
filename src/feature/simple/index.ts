export const getENV = () => {
  return process.env.TEST_ENV;
};

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe("Vitest TEST", () => {
    it("ENV GET TEST", () => {
      expect(getENV()).toBe("test_env");
    });
  });
}
