import { useStore } from "../store";
import { calcAR } from "../utils/ar";

export default function Redeem() {
  const { state, dispatch } = useStore();
  const user = state.data.find(u => u.user_id === state.session?.user_id);
  if (!user) return null;

  const ar = calcAR(user);
  const ptsidAmount = 25;
  const totalReceived = ptsidAmount * ar;

  function redeem() {
    if (user.pts_balance < ptsidAmount) return;
    const updated = {
      ...user,
      pts_balance: user.pts_balance - ptsidAmount,
      reward_status: "PENDING",
      cashout_status: user.cashout_method ? "PENDING" : user.cashout_status || "PENDING"
    };
    dispatch({ type: "UPDATE_USER", value: updated });
  }

  return (
    <div className="card">
      <div className="title">redeem</div>
      <div className="row">ptsid:{ptsidAmount}</div>
      <div className="row">ar:{ar.toFixed(2)}</div>
      <div className="row">totalreceived:{totalReceived.toFixed(2)}</div>
      <button className="btn" onClick={redeem} disabled={user.pts_balance < ptsidAmount}>redeemnow</button>
    </div>
  );
}
