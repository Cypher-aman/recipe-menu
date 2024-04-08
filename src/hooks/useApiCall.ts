import { useCallback, useState, useEffect } from 'react';

type ApiCall = () => Promise<any>;
type Deps = string[];

export const useApiCall = (
  apiFuntion: ApiCall,
  initialData = null,
  deps: Deps = []
) => {
  const [data, setData] = useState<any>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    console.log('rerendering hook');

    setIsLoading(true);
    setError(null);
    apiFuntion()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, deps);

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, isLoading, error, fetchData };
};
