import {
  atom,
  selector,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
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

  return [recoil, recoilState, setRecoil] as const;
};
