import { useStore } from "./store";

export function useAuth() {
  const { state, dispatch } = useStore();
  function login(email, password) {
    const user = state.data.find(u => (u.email || "").toLowerCase() === (email || "").toLowerCase());
    if (!user) throw new Error("usernotfound");
    // demo only: compare plain text; replace with hashing if you add a backend
    if ((user.password_hash || "") !== (password || "")) throw new Error("invalidcredentials");
    dispatch({ type: "LOGIN", value: { user_id: user.user_id, email: user.email, role: user.role } });
    return user;
  }
  function logout() {
    dispatch({ type: "LOGOUT" });
  }
  return { session: state.session, login, logout };
}
