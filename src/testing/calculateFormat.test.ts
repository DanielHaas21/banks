import { describe, expect, it } from "vitest";
import { calculateAmount } from "../utils/calculateAmount";

describe("calculateAmount", () => {
  it("calculates correct values for valid input, that is: 100k deposit and 5% interest rate with normal tax", () => {
    const result = calculateAmount(100000, 5, 0.15);
    expect(result).toEqual({
      interest: 5000,
      tax: 750,
      total: 104250,
    });
  });
});

describe("calculateAmount", () => {
  it("calculates correct values for valid input, that is: 0 deposit and 5% interest rate with normal tax", () => {
    const result = calculateAmount(0, 5, 0.15);
    expect(result).toEqual({
      interest: 0,
      tax: 0,
      total: 0,
    });
  });
});

describe("calculateAmount", () => {
  it("calculates correct values for negative numbers", () => {
    const result = calculateAmount(-100000, 5, 0.15);
    expect(result).toEqual({
      interest: 0,
      tax: 0,
      total: 0,
    });
  });
});

describe("calculateAmount", () => {
  it("calculates correct values for invalid input, that is: Infite deposit and 5% interest rate with normal tax", () => {
    const result = calculateAmount(Infinity, 5, 0.15);
    expect(result).toEqual({
      interest: 0,
      tax: 0,
      total: 0,
    });
  });
});

describe("calculateAmount", () => {
  it("calculates correct values for invalid input, that is: NaN deposit and 5% interest rate with normal tax", () => {
    const result = calculateAmount(NaN, 5, 0.15);
    expect(result).toEqual({
      interest: 0,
      tax: 0,
      total: 0,
    });
  });
});

describe("calculateAmount", () => {
  it("calculates correct values for invalid input, that is: 0k deposit and NaN% interest rate with normal tax", () => {
    const result = calculateAmount(10_000, NaN, 0.15);
    expect(result).toEqual({
      interest: 0,
      tax: 0,
      total: 0,
    });
  });
});
