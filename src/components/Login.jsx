import { useState } from "react";
import { useStore } from "../store";
import { useAuth } from "../auth";

export default function Login() {
  const { state } = useStore();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    try {
      const user = login(email, password);
      setMsg("loggedin:"+user.user_id);
    } catch (err) {
      setMsg("error:"+err.message);
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <div className="title">login</div>
      <input className="input" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn" type="submit">enter</button>
      {msg && <div className="note">{msg}</div>}
      <div className="hint">users:{state.data.length}</div>
    </form>
  );
}
