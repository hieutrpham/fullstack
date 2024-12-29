import { createContext, useReducer, useContext } from "react";

export const NotiContext = createContext();

const notiReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTI":
      return action.payload;
    case "RESET_NOTI":
      return "";
    default:
      return state;
  }
};

export const useNoti = () => {
  const [noti, _] = useContext(NotiContext);
  return noti;
};

export const useDispatch = () => {
  const [_, dispatch] = useContext(NotiContext);
  return dispatch;
};

export const useTimeoutNoti = () => {
  const dispatch = useDispatch();

  const timeoutNoti = (content, timeout=3000) => {
    dispatch({
      type: "NOTI",
      payload: content,
    });

    setTimeout(() => {
      dispatch({ type: "RESET_NOTI" });
    }, timeout);
  };

  return timeoutNoti;
};

const NotiContextProvider = ({ children }) => {
  const [noti, notiDispatch] = useReducer(notiReducer, "");

  return (
    <NotiContext.Provider value={[noti, notiDispatch]}>
      {children}
    </NotiContext.Provider>
  );
};

export default NotiContextProvider;
