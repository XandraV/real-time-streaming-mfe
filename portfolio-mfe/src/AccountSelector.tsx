import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import type { Account } from "./types";

type AccountSelectorProps = {
  accounts: Account[];
  selected: Account | null;
  onSelect: (account: Account) => void;
};

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  font-family: poppins, sans-serif;
  font-size: 14px;
`;

const SelectorBox = styled.div`
  display: flex;
  align-items: center;
  background: #232c3e;
  border: 1px solid #3a4153;
  border-radius: 6px;
  padding: 6px 10px;
  color: #d6d5d5ff;
  justify-content: space-between;
`;

const Dropdown = styled.div`
  font-family: poppins, sans-serif;
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  background: #1f2836;
  border: 1px solid #2a2d35;
  border-radius: 6px;
  max-height: 200px;
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
  selected,
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
        <span>
          {selected ? `${selected.name} ${selected.id}` : "Select account"}
        </span>
        <ArrowDropDownIcon sx={{ color: "#9ba1ac" }} />
      </SelectorBox>

      {open && (
        <Dropdown>
          {accounts.map((acc) => (
            <DropdownItem
              key={acc.id}
              onClick={() => {
                onSelect(acc);
                setOpen(false);
              }}
            >
              {acc.name} {acc.id}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}
