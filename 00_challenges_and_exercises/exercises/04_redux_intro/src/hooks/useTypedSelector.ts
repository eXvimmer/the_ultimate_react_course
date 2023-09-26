import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
