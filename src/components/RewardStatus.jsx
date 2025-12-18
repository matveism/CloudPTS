import { useStore } from "../store";

export default function RewardStatus() {
  const { state, dispatch } = useStore();
  const user = state.data.find(u => u.user_id === state.session?.user_id);
  if (!user) return null;

  function approve() {
    // demo only; in real flow, admin approves
    const updated = { ...user, reward_status: "APPROVED" };
    dispatch({ type: "UPDATE_USER", value: updated });
  }

  return (
    <div className="card">
      <div className="title">rewardstatus</div>
      <div className="status">status:{user.reward_status}</div>
      <button className="btn" onClick={approve}>setapproved</button>
    </div>
  );
}
