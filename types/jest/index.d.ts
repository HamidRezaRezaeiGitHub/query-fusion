/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
/*
 * Temporary Jest type declarations to allow the project to build in environments
 * where the real @types/jest package is not installed. The definitions provide
 * minimal typing just to satisfy the compiler.
 */
declare namespace jest {
  type Done = (...args: unknown[]) => void;

  interface Matchers<R = unknown> {
    [key: string]: any;
  }

  interface Expect {
    <T = unknown>(actual: T): Matchers<T>;
  }
}

declare const describe: (
  name: string,
  fn: (this: jest.Matchers, done?: jest.Done) => void,
) => void;
declare const it: (
  name: string,
  fn?: (this: jest.Matchers, done?: jest.Done) => void,
) => void;
declare const test: typeof it;
declare const expect: jest.Expect;
declare const beforeEach: (fn: (done?: jest.Done) => void) => void;
declare const afterEach: (fn: (done?: jest.Done) => void) => void;
declare const beforeAll: (fn: (done?: jest.Done) => void) => void;
declare const afterAll: (fn: (done?: jest.Done) => void) => void;

export {};
