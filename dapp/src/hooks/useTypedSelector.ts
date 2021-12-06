import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
