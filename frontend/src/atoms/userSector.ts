import { selector } from "recoil";
import { guestAtom, isGuestAtom } from "./guest";
import { userAtom } from "./user";

export const displayNameSelector = selector({
  key: "displayNameSelector",
  get: ({ get }) => {
    const isGuest = get(isGuestAtom);
    return isGuest ? get(guestAtom) : get(userAtom);
  },
});
