import { act, renderHook } from "@testing-library/react";
import { useCallback } from "react";
import {
  atom,
  selector,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  RecoilRoot,
  useRecoilCallback,
  waitForAll,
} from "recoil";
import { rest } from "msw";
import { setupServer } from "msw/node";
import axios from "axios";

//---------------------------------------------

const recoilAtom = atom({
  key: "recoil-atom",
  default: "",
});

//---------------------------------------------

const recoilSelector = selector({
  key: "recoil-selector",
  get: ({ get }) => {
    const recoil = get(recoilAtom);
    return `${recoil}-Selector`;
  },
});

//---------------------------------------------

export const useRecoil = () => {
  const recoil = useRecoilValue(recoilAtom);
  const recoilState = useRecoilValue(recoilSelector);
  const setRecoilAtom = useRecoilCallback(({ set }) => (text: string) => {
    set(recoilAtom, text);
  });

  return [recoil, setRecoilAtom, recoilState] as const;
};

if (import.meta.vitest) {
  describe("Recoil Custom hook TEST", () => {
    it("Atom TEST", () => {
      const { result } = renderHook(() => useRecoil(), { wrapper: RecoilRoot });
      expect(result.current[0]).toEqual("");
    });
    it("Atom Update TEST", async () => {
      const { result } = renderHook(() => useRecoil(), { wrapper: RecoilRoot });

      expect(result.current[0]).toEqual("");

      act(() => {
        result.current[1]("TEXT");
      });

      expect(result.current[0]).toEqual("TEXT");
    });
    it("Selector TEST", async () => {
      const { result } = renderHook(() => useRecoil(), { wrapper: RecoilRoot });

      expect(result.current[0]).toEqual("");

      act(() => {
        result.current[1]("TEXT");
      });

      expect(result.current[0]).toEqual("TEXT");

      expect(result.current[2]).toEqual("TEXT-Selector");
    });
  });
}

//---------------------------------------------

const mockServer = setupServer(
  rest.get("/testing", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json("Hello!!"));
  })
);

function flushPromisesAndTimers(): Promise<void> {
  return act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 100);
        vi.useFakeTimers();
        vi.runAllTimers();
      })
  );
}

//---------------------------------------------

const asycRecoilAtom = atom<string>({
  key: "asyc-atom",
  default: selector({
    key: "asyc-atom-default-selector",
    get: async () => await (await axios.get("/testing")).data,
  }),
});

//---------------------------------------------
const useAsycRecoil = () => {
  const asycRecoil = useRecoilValue(asycRecoilAtom);

  return asycRecoil;
};

if (import.meta.vitest) {
  describe("Recoil Asyc Custom hook TEST", () => {
    beforeAll(() => {
      mockServer.listen();
    });
    afterAll(() => {
      mockServer.close();
    });

    it("デフォルトで最初から値がはいっているか", async () => {
      const { result } = renderHook(() => useAsycRecoil(), {
        wrapper: RecoilRoot,
      });

      await flushPromisesAndTimers();

      expect(result.current).toEqual("Hello!!");
    });
  });
}
