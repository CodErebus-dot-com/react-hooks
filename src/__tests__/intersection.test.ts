import { renderHook, act } from "@testing-library/react-hooks";
import { useIntersectionObserver } from "../intersection";
import { IUseIntersectionObserver } from "../types";
import { waitFor } from "@storybook/testing-library";

describe("useIntersectionObserver", () => {
  let observerCallback: jest.Mock;
  let unobserve: jest.Mock;
  let observe: jest.Mock;

  beforeEach(() => {
    unobserve = jest.fn();
    observe = jest.fn();

    window.IntersectionObserver = jest
      .fn()
      .mockImplementation((callback, options) => {
        observerCallback = callback;
        return {
          observe,
          unobserve,
          root: options.root,
          rootMargin: options.rootMargin,
          thresholds: Array.isArray(options.threshold)
            ? options.threshold
            : [options.threshold],
          disconnect: jest.fn(),
          takeRecords: jest.fn(),
        };
      });
  });

  it("should observe element when it is not intersecting", () => {
    const ref = { current: document.createElement("div") };
    const options: IUseIntersectionObserver = {
      root: null,
      rootMargin: "0%",
      threshold: 0,
      freezeOnceVisible: false,
    };

    renderHook(() => useIntersectionObserver(ref, options));

    expect(observe).toHaveBeenCalledWith(ref.current);
  });

  it("should unobserve element when it is intersecting and freezeOnceVisible is true", () => {
    const ref = { current: document.createElement("div") };
    const options: IUseIntersectionObserver = {
      root: null,
      rootMargin: "0%",
      threshold: 0,
      freezeOnceVisible: true,
    };

    renderHook(() => useIntersectionObserver(ref, options));

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(unobserve).toHaveBeenCalledWith(ref.current);
  });

  it("should not unobserve element when it is intersecting and freezeOnceVisible is false", () => {
    const ref = { current: document.createElement("div") };
    const options: IUseIntersectionObserver = {
      root: null,
      rootMargin: "0%",
      threshold: 0,
      freezeOnceVisible: false,
    };

    renderHook(() => useIntersectionObserver(ref, options));

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(unobserve).not.toHaveBeenCalledWith(ref.current);
  });

  it("should unobserve element when elemRef.current and observer.current are truthy", () => {
    const ref = { current: document.createElement("div") };
    const options: IUseIntersectionObserver = {
      root: null,
      rootMargin: "0%",
      threshold: 0,
      freezeOnceVisible: false,
    };

    const { unmount } = renderHook(() => useIntersectionObserver(ref, options));

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    unmount();
    waitFor(() => {
      expect(unobserve).toHaveBeenCalledWith(ref.current);
    });
  });

  it("should throw error when IntersectionObserver not supported", () => {
    const originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = jest.fn(() => {
      throw new Error("IntersectionObserver not supported");
    });

    const ref = { current: document.createElement("div") };
    const options: IUseIntersectionObserver = {
      root: null,
      rootMargin: "0%",
      threshold: 0,
      freezeOnceVisible: false,
    };

    const { result } = renderHook(() => useIntersectionObserver(ref, options));

    expect(result.error).toEqual(
      new Error("IntersectionObserver not supported")
    );

    window.IntersectionObserver = originalIntersectionObserver;
  });
});
