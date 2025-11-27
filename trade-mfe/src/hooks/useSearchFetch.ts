import React, { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

interface FetchType {
  searchString: string | null;
}

const API_KEY = "7f63612";

export const useSearchFetch = ({ searchString }: FetchType) => {
  const debouncedValue = useDebounce(searchString, 500);
  const [searchResults, setSearchResults] = useState<string[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = async (searchString: string) => {
    setIsLoading(true);
    return await fetch(
      `http://localhost:4000/search?searchString=${searchString}`
    )
      .then((res) => {
        console.log("fetch:", res);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        return res.json();
      })
      .then((data: any) => {
        if (data.result) {
          setSearchResults(data.result.map((item: any) => item.ticker));
          setError(undefined);
        } else {
          setError("error");
        }
      })
      .catch((err: any) => {
        setError("Unknown error.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (
      debouncedValue !== null &&
      debouncedValue.length > 2 &&
      searchString === debouncedValue
    ) {
      const searchString = debouncedValue.toLowerCase().trim();
      fetchData(searchString);
    } else if (debouncedValue === null) {
      setSearchResults([]);
    }
  }, [debouncedValue]);

  return { searchResults, isLoading, error };
};
