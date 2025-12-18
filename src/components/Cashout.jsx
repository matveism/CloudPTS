import { useStore } from "../store";

export default function Cashout() {
  const { state } = useStore();
  const user = state.data.find(u => u.user_id === state.session?.user_id);
  if (!user) return null;

  return (
    <div className="card">
      <div className="title">cashout</div>
      <div className="row">method:{user.cashout_method || "none"}</div>
      <div className="row">status:{user.cashout_status || "none"}</div>
      <div className="note">updatecashoutmethodinsheets</div>
    </div>
  );
}
