import React, { Fragment, useState } from 'react';
import { useDataApi } from './hooks/useDataApi';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './rippleLoader.css';
import { filter } from 'rsvp';

function Pixabay() {
  const [query, setQuery] = useState('wedding');
  //const [height, setHeight] = useState('400px');
  const [page, setPage] = useState('1');
  const [config] = useState({
    baseURL: 'https://pixabay.com/api/',
    method: 'get'
  });
  const [params, setParams] = useState({
    key: '12342179-a3eb1f32de5c7b5284df8f134',
    q: 'wedding',
    image_type: 'photo',
    safesearch: 'false',
    per_page: '100',
    page: '1'
  });
  const [modalImage, setModalImage] = useState(
    'https://pixabay.com/get/e836b30f20f5013ed1584d05fb1d4794e073e0d41eb80c4090f5c77ca0e9b4b8da_1280.jpg'
  );
  const [modalStyle, setModalStyle] = useState({
    display: 'flex' /* Hidden by default */,
    justifyContent: 'center',
    position: 'fixed' /* Stay in place */,
    zIndex: '1' /* Sit on top */,
    left: '-5000px',
    top: '0',
    width: '100%' /* Full width */,
    height: '100%' /* Full height */,
    overflow: 'auto' /* Enable scroll if needed */,
    backgroundColor: 'rgb(0, 0, 0)' /* Fallback color */,
    backgroundColor: 'rgba(0, 0, 0, 0.8)' /* Black w/ opacity */,
    opacity: '0.0',
    transition: 'opacity 2s'
  });
  const [styleObj, setStyleObj] = useState({
    maxwidth: '100%',
    maxHeight: '400px'
  });

  const [isNewQuery, setIsNewQuery] = useState(false);

  const { data, isLoading, isError, doFetch } = useDataApi(config, params, {
    hits: []
  });

  const handleChange = e => {
    setQuery(e.target.value);
    setParams({
      ...params,
      q: e.target.value
    });
    setIsNewQuery(true);
  };

  const onChangePage = e => {
    setPage(e.target.value);
    setParams({
      ...params,
      q: query,
      page: e.target.value
    });
  };

  const onChangeHeight = e => {
    setStyleObj({ ...styleObj, maxHeight: e.target.value + 'px' });
  };

  const onImageClick = e => {
    setModalImage(e.target.src);
    setModalStyle({
      ...modalStyle,
      left: '0',
      opacity: '1.0',
      display: 'flex'
    });
  };

  const handleCloseModal = e => {
    setModalStyle({
      ...modalStyle,
      left: '-5000',
      display: 'none',
      opacity: '0.0'
    });
  };

  return (
    <Fragment>
      <div style={modalStyle}>
        <img
          src={modalImage}
          style={{
            display: 'block',
            backgroundColor: '#fefefe',
            padding: '20px',
            border: '1px solid #888',
            maxHeight: '80%',
            width: 'auto',
            height: 'auto'
          }}
          alt="Pixabay"
        />
        <span
          style={{
            color: '#aaa',
            float: 'right',
            fontSize: '28px',
            fontWeight: 'bold'
          }}
          onClick={handleCloseModal}
        >
          &times;
        </span>
      </div>

      <form
        onSubmit={event => {
          if (isNewQuery) {
            setParams({
              ...params,
              page: '1'
            });
            setPage('1');
            setIsNewQuery(false);
          }
          doFetch(config, params);

          event.preventDefault();
        }}
      >
        <select onChange={onChangePage} value={page}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <input
        onChange={onChangeHeight}
        type="text"
        placeholder="Max Image Height"
      />

      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      ) : (
        <div>
          {data.hits.map((item, index) => (
            <img
              src={item.largeImageURL}
              key={index}
              alt={item.id}
              style={styleObj}
              onClick={onImageClick}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default Pixabay;
