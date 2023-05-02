import { ChangeEvent, useReducer } from "react";
import { InputState } from "./models/InputState.interface";
import { Action } from "../../shared/models/action.interface";
import {
  INPUT_ACTION_BLUR,
  INPUT_ACTION_CHANGE,
  INPUT_ACTION_CLEAR,
  InputActionType,
} from "./models/inputAction";
import { ValidatorFn } from "../../shared/utils/validation/models/ValidatorFn";

const initialInputState: InputState = {
  text: "",
  hasBeenTouched: false,
};

// The Action interface can use any input action type
function inputReducer(
  state: InputState,
  action: Action<InputActionType>
): InputState {
  const { type, value } = action;
  switch (type) {
    case INPUT_ACTION_CHANGE:
      // state value is updated based on input change event and
      // input has not been focus.
      return { text: value, hasBeenTouched: state.hasBeenTouched };
    // When in the blur state, input has been clicked and the text is
    // previous state value
    case INPUT_ACTION_BLUR:
      return {
        text: state.text,
        hasBeenTouched: true,
      };
    // clear the input
    case INPUT_ACTION_CLEAR:
      return {
        text: "",
        hasBeenTouched: false,
      };
    default:
      return { ...state };
  }
}

export default function useInput(validatorFn?: ValidatorFn) {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  let shouldDisplayError;

  if (validatorFn) {
    const isValid = validatorFn(text!);

    // if is not valid and the input field has beeb touched
    shouldDisplayError = !isValid && hasBeenTouched;
  }

  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: INPUT_ACTION_CHANGE, value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: INPUT_ACTION_BLUR });
  };

  const clearHandler = () => {
    dispatch({ type: INPUT_ACTION_CLEAR });
  };

  return {
    text,
    shouldDisplayError,
    textChangeHandler,
    inputBlurHandler,
    clearHandler,
  };
}
