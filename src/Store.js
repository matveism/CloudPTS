import { createContext, useContext, useReducer } from "react";

const initial = {
  session: null, // { user_id, email, role }
  data: [],      // rows from CSV
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING": return { ...state, loading: action.value };
    case "SET_ERROR": return { ...state, error: action.value };
    case "SET_DATA": return { ...state, data: action.value };
    case "LOGIN": return { ...state, session: action.value };
    case "LOGOUT": return { ...state, session: null };
    case "UPDATE_USER": {
      const updated = state.data.map(r => r.user_id === action.value.user_id ? action.value : r);
      return { ...state, data: updated, session: { ...state.session, ...action.value } };
    }
    default: return state;
  }
}

const Store = createContext();
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}
export const useStore = () => useContext(Store);
