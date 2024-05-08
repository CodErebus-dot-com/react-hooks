import {
  useLocalizedContent,
  getCacheKey,
  getLanguageFromLocalStorage,
} from "../localization";
import { useFetch } from "../fetch";
import { renderHook, act } from "@testing-library/react-hooks";
import { Cache } from "../types";

jest.mock("../fetch");

class LocalStorageMock {
  store: Record<string, unknown> = {};

  length: number = 0;

  key: (index: number) => string = jest.fn();

  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

const cache: Cache = {};
const testURL = "test";
const languageStorageKey = "language";

Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock(),
});

describe("Testing the useLocalizedContent Hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should stop loading when the fetch request succeeds", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({
      data: { label: "test" },
      error: undefined,
    });
    const { result } = renderHook(() =>
      useLocalizedContent(testURL, languageStorageKey)
    );
    setTimeout(() => {
      act(() => {
        result.current[1]("label");
      });
    }, 1000);
    const [loading, getLabel, getAllLabels] = result.current;
    cache[getCacheKey("en_us", testURL)] = { label: "test" };
    act(() => {
      jest.runAllTimers();
    });
    expect(loading).toBe(false);
    expect(getLabel("label")).toBe("test");
    expect(getAllLabels()).toEqual({ label: "test" });
  });

  it("should log an error and stop loading when the fetch request fails", async () => {
    const mockError = new Error("test error");
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({
      data: undefined,
      error: mockError,
    });
    console.error = jest.fn();
    const { result } = renderHook(() =>
      useLocalizedContent(testURL, languageStorageKey)
    );
    setTimeout(() => {
      act(() => {
        result.current[1]("label");
      });
    }, 1000);
    const [loading] = result.current;
    act(() => {
      jest.runAllTimers();
    });
    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(loading).toBe(false);
  });

  it("should get data from cache if it exists", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({
      data: { label: "test" },
      error: undefined,
    });
    const { result } = renderHook(() => {
      return useLocalizedContent(testURL, languageStorageKey);
    });
    setTimeout(() => {
      act(() => {
        result.current[1]("label");
      });
    }, 1000);
  });
});

describe("getLanguageFromLocalStorage", () => {
  it("should return language from local storage", () => {
    localStorage.setItem("languageKey", "en_gb");
    expect(getLanguageFromLocalStorage("languageKey")).toBe("en_gb");
  });

  it("should return default language when no language in local storage", () => {
    localStorage.removeItem("languageKey");
    expect(getLanguageFromLocalStorage("languageKey")).toBe("en_us");
  });
});

describe("getCacheKey", () => {
  it("should return cache key", () => {
    expect(getCacheKey("en_us", "testUrl")).toBe("en_us_testUrl");
  });
});
