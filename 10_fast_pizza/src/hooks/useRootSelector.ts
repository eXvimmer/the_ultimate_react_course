import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../types";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
