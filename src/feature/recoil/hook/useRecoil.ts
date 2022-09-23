import { act, renderHook, waitFor } from "@testing-library/react";
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
    return `${recoil} Selector`;
  },
});

//---------------------------------------------

export const useRecoil = () => {
  const [recoil, setRecoil] = useRecoilState(recoilAtom);
  const recoilState = useRecoilValue(recoilSelector);
  // const setRecoilAtom = useCallback((text) => setRecoil(text));

  return [recoil, recoilState, setRecoil] as const;
};

if (import.meta.vitest) {
  describe("Recoil Custom hook TEST", () => {
    it("Atom TEST", () => {
      const { result } = renderHook(() => useRecoil(), { wrapper: RecoilRoot });
      expect(result.current[0]).toEqual("");
    });
    it("Atom Update TEST", async () => {
      const { result } = renderHook(() => useRecoil(), { wrapper: RecoilRoot });
      const [recoil, , setRecoil] = result.current;

      act(() => {
        setRecoil("TEST");
      });

      await waitFor(() => expect(recoil).toEqual("TEST"));

      // expect(recoil).toEqual("TEST");
    });
  });
}
