import { useState, useCallback } from 'react';

const useFetch = url => {
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);

  const fetchCallback = useCallback(async (options) => {
    setloading(true);
    setError(null);
      return await fetch(url, options)
      .then(response => response.json())
      .then(response => {
        setData(response); 
        return response;
      })
      .catch(err => {
        setError(err.message)
        return err;
      })
      .finally(() => setloading(false));
    },
    [url, setloading, setError]
  );
  return { data, error, loading, fetchCallback }
};

export default useFetch;