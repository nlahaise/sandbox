import { useState, useEffect, useReducer } from 'react';
import { dataFetchReducer } from './dataFetchReducer';
import axios from 'axios';

export const useDataApi = (initConfig, initialData) => {
  //const [url, setUrl] = useState(initialUrl);
  const [config, setConfig] = useState(initConfig);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(config);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        console.log(error);
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();
    return () => {
      didCancel = true;
    };
  }, [config]);

  const doFetch = config => {
    setConfig(config);
  };

  return { ...state, doFetch };
};
