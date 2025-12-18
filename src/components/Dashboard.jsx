import { useStore } from "../store";
import { calcAR } from "../utils/ar";

export default function Dashboard() {
  const { state } = useStore();
  const user = state.data.find(u => u.user_id === state.session?.user_id);
  if (!user) return <div className="card">nouser</div>;

  const ar = calcAR(user);

  return (
    <div className="card">
      <div className="title">dashboard</div>
      <div className="row">user_id:{user.user_id}</div>
      <div className="row">email:{user.email}</div>
      <div className="row">pts_balance:{user.pts_balance}</div>
      <div className="row">offer_pts:{user.offer_pts}</div>
      <div className="row">ar:{ar.toFixed(2)}</div>
      <div className="row">reward_status:{user.reward_status}</div>
      <div className="row">last_claim_at:{user.last_claim_at || "never"}</div>
      <div className="row">role:{user.role}</div>
    </div>
  );
}
