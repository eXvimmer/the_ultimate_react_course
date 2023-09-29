import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../reducer";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
