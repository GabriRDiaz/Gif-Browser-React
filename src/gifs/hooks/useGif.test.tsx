import { describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useGif } from "./useGif";
import { mockGifs } from "../../mocks/gifs.mocks";
import * as gifActions from "../service/get-gif";

describe("useGif", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGif());

    expect(result.current.useSearch.length).toBe(0);
    expect(result.current.useGifList.length).toBe(mockGifs.length);
    expect(result.current.handlePreviousSearchClick).toBeDefined();
    expect(result.current.handleSearch).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGif());

    await act(async () => {
      await result.current.handleSearch("vinland saga");
    });

    expect(result.current.useGifList.length).toBe(10);
  });

  test("should return a list of gifs when handlePreviousSearchClick is called", async () => {
    const { result } = renderHook(() => useGif());

    await act(async () => {
      await result.current.handlePreviousSearchClick("vinland saga");
    });

    expect(result.current.useGifList.length).toBe(10);
  });

  test("should get gifs from cache", async () => {
    const { result } = renderHook(() => useGif());

    await act(async () => {
      await result.current.handlePreviousSearchClick("vinland saga");
    });

    expect(result.current.useGifList.length).toBe(10);

    //Forced error on getGifs request so we ensure that is taking the value from cache
    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("Error getting gifs"),
    );

    await act(async () => {
      await result.current.handlePreviousSearchClick("vinland saga");
    });

    expect(result.current.useGifList.length).toBe(10);
  });

  test("should return at most 8 previousSearch", async () => {
    const { result } = renderHook(() => useGif());

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      for (let i = 1; i <= 8; i++) {
        await result.current.handleSearch(`vinland saga ${i}`);
      }
    });

    expect(result.current.useSearch.length).toBe(8);
    expect(result.current.useSearch).toStrictEqual([
      "vinland saga 8",
      "vinland saga 7",
      "vinland saga 6",
      "vinland saga 5",
      "vinland saga 4",
      "vinland saga 3",
      "vinland saga 2",
      "vinland saga 1",
    ]);
  });
});
