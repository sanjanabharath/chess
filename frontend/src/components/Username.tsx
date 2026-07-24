import { useRecoilValue } from "recoil";
import { displayNameSelector } from "../atoms/userSector";

export const Username = () => {
  const displayName = useRecoilValue(displayNameSelector);
  return <p>{displayName}</p>;
};
