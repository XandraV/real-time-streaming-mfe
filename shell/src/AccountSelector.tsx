import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountSummary from "./AccountSummary";

export type Account = {
  id: string;
  name: string;
  currency: string;
  balance: string;
  buyingPower: string;
};
type AccountSelectorProps = {
  accounts: Account[];
  selectedAccount: Account;
  onSelect: (account: Account) => void;
};

const Wrapper = styled.div`
  width: 300px;
  font-family: poppins, sans-serif;
  font-size: 14px;
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SelectorBox = styled.div`
  display: flex;
  align-items: center;
  background: #172035;
  border: 1px solid #3a4153;
  border-radius: 6px;
  padding: 0px 10px;
  color: #d6d5d5ff;
  justify-content: space-between;
`;

const Dropdown = styled.div`
  font-family: poppins, sans-serif;
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  background: #1f2836;
  border: 1px solid #2a2d35;
  border-radius: 6px;
  overflow-y: auto;
  z-index: 10;
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  color: #d6d5d5;
  &:hover {
    background: #19202cff;
  }
`;

export function AccountSelector({
  accounts,
  selectedAccount,
  onSelect,
}: AccountSelectorProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setOpen]);

  return (
    <Wrapper ref={wrapperRef}>
      <SelectorBox onClick={() => setOpen((o) => !o)}>
        <AccountSummary
          accountId={selectedAccount.id}
          currency={selectedAccount.currency}
          balance={selectedAccount.balance}
          buyingPower={selectedAccount.buyingPower}
        />
        <ArrowDropDownIcon sx={{ color: "#9ba1ac" }} />
      </SelectorBox>

      {open && (
        <Dropdown>
          {accounts.map((account) => (
            <DropdownItem
              key={account.id}
              onClick={() => {
                onSelect(account);
                setOpen(false);
              }}
            >
              {account.name} {account.id}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}
