import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef } from "react";
import type { Instrument } from "../../redux/types";

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  results: Instrument[];
  onSelectResult: (value: string) => void;
  showResults: boolean; // parent decides when dropdown appears
  onClickOutside?: () => void;
};

const Wrapper = styled.div`
  position: relative;
  width: 240px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #232c3e;
  border: 1px solid #3a4153;
  border-radius: 6px;
  padding: 8px 12px;
  color: #d6d5d5ff;
`;

const Input = styled.input`
  background: #232c3e;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  flex: 1;

  &::placeholder {
    color: #9ba1ac;
  }
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

export default function InstrumentSearch({
  placeholder = "Search",
  value,
  onChange,
  results,
  onSelectResult,
  showResults,
  onClickOutside,
}: SearchInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        onClickOutside?.();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClickOutside]);

  return (
    <Wrapper ref={wrapperRef}>
      <InputContainer>
        <SearchIcon sx={{ fontSize: 18, color: "#9ba1ac" }} />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </InputContainer>

      {showResults && results.length > 0 && (
        <Dropdown>
          {results.map((item) => (
            <DropdownItem
              key={item.ticker}
              onClick={() => onSelectResult(item.ticker)}
            >
              {item.ticker}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}
