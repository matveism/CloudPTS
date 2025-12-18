import { useStore } from "../store";

export default function Offerwall() {
  const { state } = useStore();
  const user = state.data.find(u => u.user_id === state.session?.user_id);
  if (!user) return null;

  const apiKey = user.api_key || "DEMO_KEY";
  const userId = user.user_id;
  const src = `https://medioot.com/offer/${apiKey}/${userId}`;

  return (
    <div className="card">
      <div className="title">offersurveys</div>
      <iframe
        style={{ width: "100%", height: "800px", border: 0, padding: 0, margin: 0 }}
        scrolling="yes"
        frameBorder="0"
        src={src}
        title="offerwall"
      />
      <div className="note">apikeyanduseridfetchedfromsheets</div>
    </div>
  );
}
