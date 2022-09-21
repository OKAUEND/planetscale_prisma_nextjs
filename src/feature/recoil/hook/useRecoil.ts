import { atom, selector, atomFamily, selectorFamily } from "recoil";

//---------------------------------------------

const recoilAtom = atom({
  key: "recoil-atom",
  default: "",
});

//---------------------------------------------

const recoilSelector = selector({
  key: "recoil-atom",
  get: ({ get }) => {
    const recoil = get(recoilAtom);
    return `${recoil} Selector`;
  },
});

//---------------------------------------------

export const useRecoil = () => {};
