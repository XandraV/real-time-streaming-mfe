import { useState } from "react";
import type { Account } from "./types";
import { AccountSelector } from "./AccountSelector";
import InstrumentGrid from "./components/InstrumentGrid/InstrumentGrid";

function App() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const onSelectAccount = (value: Account) => {
    setSelectedAccount(value);
  };
  return (
    <>
      <div>
        {/* <AccountSelector
          accounts={[
            { name: "Account 1", id: "12345" },
            { name: "Account 2", id: "67890" },
          ]}
          selected={selectedAccount}
          onSelect={onSelectAccount}
        /> */}
        <InstrumentGrid />
      </div>
    </>
  );
}

export default App;
