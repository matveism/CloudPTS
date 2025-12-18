import { useEffect } from "react";
import { StoreProvider, useStore } from "./store";
import { fetchSheet } from "./sheets";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ClaimPTS from "./components/ClaimPTS";
import Redeem from "./components/Redeem";
import RewardStatus from "./components/RewardStatus";
import Offerwall from "./components/Offerwall";
import Cashout from "./components/Cashout";

function AppInner() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    (async () => {
      dispatch({ type: "SET_LOADING", value: true });
      try {
        const rows = await fetchSheet();
        dispatch({ type: "SET_DATA", value: rows });
      } catch (e) {
        dispatch({ type: "SET_ERROR", value: e.message });
      } finally {
        dispatch({ type: "SET_LOADING", value: false });
      }
    })();
  }, [dispatch]);

  if (state.loading) return <div className="ui">loading</div>;
  if (state.error) return <div className="ui">error:{state.error}</div>;

  return (
    <div className="ui">
      {!state.session ? (
        <Login />
      ) : (
        <div className="stack">
          <Dashboard />
          <Offerwall />
          <ClaimPTS />
          <Redeem />
          <RewardStatus />
          <Cashout />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  );
}
