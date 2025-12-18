import { useStore } from "../store";

export default function ClaimPTS() {
  const { state, dispatch } = useStore();
  const user = state.data.find(u => u.user_id === state.session?.user_id);
  if (!user) return null;

  function claim() {
    const now = new Date().toISOString();
    const updated = { ...user, pts_balance: Math.min(user.pts_balance + 100, 100), last_claim_at: now };
    dispatch({ type: "UPDATE_USER", value: updated });
  }

  return (
    <div className="card">
      <div className="title">claimptsid</div>
      <div className="row">max:100pts</div>
      <button className="btn" onClick={claim}>claim</button>
      <div className="note">note:clientonlyupdatespersistlater</div>
    </div>
  );
}
