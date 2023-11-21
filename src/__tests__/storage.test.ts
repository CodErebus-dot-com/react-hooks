import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage, useSessionStorage } from "../storage";

describe("useLocalStorage hook", () => {
  let getItemSpy: jest.SpyInstance,
    setItemSpy: jest.SpyInstance,
    removeItemSpy: jest.SpyInstance;

  beforeEach(() => {
    getItemSpy = jest.spyOn(Storage.prototype, "getItem");
    setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");
    localStorage.clear();
  });

  afterEach(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
    removeItemSpy.mockRestore();
  });

  it("should get the initial value from local storage", () => {
    getItemSpy.mockReturnValueOnce(JSON.stringify("test"));
    const { result } = renderHook(() => useLocalStorage("key"));
    expect(result.current[0]).toBe("test");
  });

  it("should set the value in local storage", () => {
    const { result } = renderHook(() => useLocalStorage("key"));
    act(() => {
      result.current[1]("test");
    });
    expect(setItemSpy).toHaveBeenCalledWith("key", JSON.stringify("test"));
    expect(result.current[0]).toBe("test");
  });

  it("should remove the value from local storage if set to null", () => {
    const { result } = renderHook(() => useLocalStorage("key"));
    act(() => {
      result.current[1](null);
    });
    expect(removeItemSpy).toHaveBeenCalledWith("key");
    expect(result.current[0]).toBe(null);
  });

  it("should initialize with the initial state if local storage is empty", () => {
    getItemSpy.mockReturnValueOnce(null);
    const { result } = renderHook(() => useLocalStorage("key", "initial"));
    expect(setItemSpy).toHaveBeenCalledWith("key", JSON.stringify("initial"));
    expect(result.current[0]).toBe("initial");
  });
});

describe("useSessionStorage hook", () => {
  let getItemSpy: jest.SpyInstance,
    setItemSpy: jest.SpyInstance,
    removeItemSpy: jest.SpyInstance;

  beforeEach(() => {
    getItemSpy = jest.spyOn(Storage.prototype, "getItem");
    setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");
    sessionStorage.clear();
  });

  afterEach(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
    removeItemSpy.mockRestore();
  });

  it("should get the initial value from session storage", () => {
    getItemSpy.mockReturnValueOnce(JSON.stringify("test"));
    const { result } = renderHook(() => useSessionStorage("key"));
    expect(result.current[0]).toBe("test");
  });

  it("should set the value in session storage", () => {
    const { result } = renderHook(() => useSessionStorage("key"));
    act(() => {
      result.current[1]("test");
    });
    expect(setItemSpy).toHaveBeenCalledWith("key", JSON.stringify("test"));
    expect(result.current[0]).toBe("test");
  });

  it("should remove the value from session storage if set to null", () => {
    const { result } = renderHook(() => useSessionStorage("key"));
    act(() => {
      result.current[1](null);
    });
    expect(removeItemSpy).toHaveBeenCalledWith("key");
    expect(result.current[0]).toBe(null);
  });

  it("should initialize with the initial state if session storage is empty", () => {
    getItemSpy.mockReturnValueOnce(null);
    const { result } = renderHook(() => useSessionStorage("key", "initial"));
    expect(setItemSpy).toHaveBeenCalledWith("key", JSON.stringify("initial"));
    expect(result.current[0]).toBe("initial");
  });
});
