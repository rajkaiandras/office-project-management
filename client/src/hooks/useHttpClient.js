import { useCallback, useEffect, useState, useRef } from 'react';

export const useHttpClient = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', headers = {}, body = null) => {
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      setIsPending(true);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrl.signal,
        });

        const responseBody = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseBody.message);
        }

        setIsPending(false);
        setIsSuccess(true);

        return responseBody;
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Send request was aborted!');
        } else {
          setIsPending(false);
          setError(err.message);
        }
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    sendRequest,
    isPending,
    isSuccess,
    error,
  };
};
