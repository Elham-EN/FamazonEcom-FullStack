import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

// Represents the type of the dispatch function that is used to dispatch
// actions to the store.
// e.g. const dispatch = useAppDispatch(); dispatch({ type: 'INCREMENT' });
export const useAppDispatch = () => useDispatch<AppDispatch>();

// It allows you to specify the type of the state object that is returned
// by useSelector. In this case, the state object type is RootState,
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
