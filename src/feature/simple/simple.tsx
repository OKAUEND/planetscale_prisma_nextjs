import { render, screen } from "@testing-library/react";

export const SimpleTEST = () => {
  return <div>{"TEST"}</div>;
};

if (import.meta.vitest) {
  // const { describe, it, expect } = import.meta.vitest;
  describe("Vitest Component TEST", () => {
    it("Component TEXT TEST", () => {
      render(<SimpleTEST />);
      expect(screen.getByText("TEST")).toBeInTheDocument();
    });
  });
}
