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
  font-family: poppins, sans-serif;
  font-size: 10px;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SelectorBox = styled.div`
  display: flex;
  align-items: center;
  background: #172035;
  border: 1.5px solid #38406a;
  border-radius: 6px;
  padding: 4px 6px;
  color: #d6d5d5;
  justify-content: space-between;
  height: 32px;
`;

const Dropdown = styled.div`
  font-family: poppins, sans-serif;
  position: absolute;
  width: 225px;
  top: 42px;
  left: 0;
  background: #1f2836;
  border: 1px solid #313b57ff;
  border-radius: 6px;
  overflow-y: auto;
  z-index: 10;
  max-height: 200px;
`;

const DropdownItem = styled.div`
  padding: 6px 10px;
  cursor: pointer;
  color: #d6d5d5;
  font-size: 10px;
  &:hover {
    background: #19202c;
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
              {account.id}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}
