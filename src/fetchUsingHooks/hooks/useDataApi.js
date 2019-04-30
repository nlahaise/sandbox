import { useState, useEffect, useReducer } from 'react';
import { dataFetchReducer } from './dataFetchReducer';
import axios from 'axios';

export const useDataApi = (initConfig, initParams, initialData) => {
  //const [url, setUrl] = useState(initialUrl);
  const [config, setConfig] = useState(initConfig);
  const [params, setParams] = useState(initParams);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchSettings = { ...config, params };

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(fetchSettings);

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
  }, [config, params]);

  const doFetch = (config, params) => {
    setConfig(config);
    setParams(params);
  };

  return { ...state, doFetch };
};
