import { renderHook, act } from "@testing-library/react-hooks";
import { useThrottle } from "../throttle";

function mockSetTimeout() {
  jest.useFakeTimers();
  jest.spyOn(window, "setTimeout");
}

function mockClearTimeout() {
  jest.useFakeTimers();
  jest.spyOn(window, "clearTimeout");
}

jest.spyOn(Date, "now").mockImplementation(() => 1000);
jest.useFakeTimers();
describe("useThrottle()", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test("should return throttle value", () => {
    const { result } = renderHook(({ value }) => useThrottle(value), {
      initialProps: { value: "value" },
    });
    expect(result.current).toBe("value");
  });

  test("should throttle with default throttle 500 ms", () => {
    mockSetTimeout();
    renderHook(() => useThrottle("value"));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });

  test("should throttle with given throttle", () => {
    mockSetTimeout();
    renderHook(() => useThrottle("value", 1337));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1337);
  });

  test("should call clearTimeout on unmount", () => {
    mockClearTimeout();
    const { unmount } = renderHook(() => useThrottle("value"));
    unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it("should update the value immediately if the delay has already passed", () => {
    mockSetTimeout();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: "test", delay: 500 },
      }
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });
    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("updated");
  });
});
