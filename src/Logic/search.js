import {changeFocusOnSearch, changeHistory, changeText} from "../Redux/search";
import {allPhoto} from "../Redux/thunk";

export const inputHandler = (text) => {
  return dispatch => {
    dispatch(changeText(text))
  }
}

export const historyChange = (key, text, history) => {
  return async dispatch => {
    console.log(key + ' ' + text);
    if ((key === "Enter") && text !== "" && text !== null) {
      const historySet = new Set(history)
      historySet.add(text)

      const unduplicatedHistory = [...historySet]
      localStorage.setItem("history", JSON.stringify(unduplicatedHistory))
      dispatch(changeHistory(unduplicatedHistory))
      await dispatch(allPhoto(text))
      dispatch(changeText(""))
    }
  }
}

export const changeFocus = (value) => {
  return dispatch => {
    dispatch(changeFocusOnSearch(value))
  }
}

export const closeSearchViaKeyboard = () => {
  return dispatch => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape")
        dispatch(changeFocusOnSearch(false))
    })
  }
}