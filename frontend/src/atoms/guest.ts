import { atom } from "recoil";

export const guestAtom = atom({
  key: "guestAtom",
  default: "guest123",
});

export const isGuestAtom = atom({
  key: "isGuestAtom",
  default: false,
});
