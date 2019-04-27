import React, { Fragment, useState } from 'react';
import { useDataApi } from './hooks/useDataApi';

import './rippleLoader.css';

function FetchUsingHooks() {
  const [query, setQuery] = useState('male');
  const [qty, setQty] = useState('100');
  const [config, setConfig] = useState({
    baseURL: 'https://randomuser.me/api/',
    method: 'get',
    params: {
      gender: 'male',
      results: '100'
    }
  });

  const { data, isLoading, isError, doFetch } = useDataApi(config, {
    results: []
  });

  const handleChange = e => {
    setQuery(e.target.value);
    setConfig({ ...config, params: { gender: e.target.value, results: qty } });
  };

  const handleQtyChange = e => {
    setQty(e.target.value);
    setConfig({
      ...config,
      params: { gender: query, results: e.target.value }
    });
  };

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(config);

          event.preventDefault();
        }}
      >
        <select onChange={handleChange}>
          <option value="male" selected={query === "male" ? true : false}>Male</option>
          <option value="female" selected={query === "female" ? true : false}>female</option>
        </select>       
        <input type="text" value={qty} onChange={handleQtyChange} />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      ) : (
        <div>
          {data.results.map((item, index) => (
            <img src={item.picture.large} key={index} alt={item.name.first} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default FetchUsingHooks;

