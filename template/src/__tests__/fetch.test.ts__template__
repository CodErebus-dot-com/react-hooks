import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from "../fetch";
import { FetchOptions } from "../types";

describe("useFetch hook", () => {
  const mockFetch = jest.fn();
  const mockResponse = { message: "test data" };
  const baseOptions: FetchOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    credentials: "same-origin",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  global.fetch = mockFetch.mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  }) as jest.Mock;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should include credentials for cross-origin requests", async () => {
    const dummyUrl = "https://example.com/api/data";
    const options = {
      ...baseOptions,
      isCredentialsForCrossOrigin: true,
    };
    const { waitForNextUpdate } = renderHook(() => useFetch(dummyUrl, options));
    await waitForNextUpdate({ timeout: 5000 });

    expect(mockFetch).toHaveBeenCalledWith(dummyUrl, {
      ...baseOptions,
      credentials: "include",
      method: "GET",
      body: null,
    });
  });

  it("should fetch data from the API", async () => {
    const dummyUrl = "https://example.com/api/data";
    const { result, waitForNextUpdate } = renderHook(() => useFetch(dummyUrl));
    const options = {
      ...baseOptions,
      method: "GET",
      body: null,
    };
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    await waitForNextUpdate();
    expect(mockFetch).toHaveBeenCalledWith(dummyUrl, options);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should send data to the API (POST request)", async () => {
    const dummyUrl = "https://example.com/api/data";
    const postData = { message: "new data" };
    const options = {
      ...baseOptions,
      method: "POST",
      body: JSON.stringify(postData),
    };
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(dummyUrl, options)
    );
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    await waitForNextUpdate();
    expect(mockFetch).toHaveBeenCalledWith(dummyUrl, options);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle JSON parse errors", async () => {
    const dummyUrl = "https://example.com/api/data";
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error();
      },
    }) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() => useFetch(dummyUrl));
    await waitForNextUpdate({
      timeout: 2000,
    });

    expect(result.current.data).toEqual(null);
  });

  it("should throw an error if body is not provided for non-GET or non-DELETE methods", async () => {
    const dummyUrl = "https://example.com/api/data";
    const options = {
      ...baseOptions,
      method: "POST",
    };

    const { result, waitFor } = renderHook(() => useFetch(dummyUrl, options));

    await waitFor(() => result.current.error !== null, { timeout: 5000 });

    expect(result.current.error?.message).toBe(
      "Body is required for non-GET OR non-DELETE methods"
    );
  });
});
