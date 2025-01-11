import { useState, useEffect } from "react";

type FetchFunction<T> = () => Promise<T>;

const useFetchData = <T>(fetchFunction: FetchFunction<T>, defaultValue: T) => {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch {
        setErrorMessage("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, isLoading, errorMessage };
};

export { useFetchData };
