import React, { useState } from 'react';

import {
  initiateGetResult
} from '../actions/result';
import SearchForm from './SearchForm';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');

  const dispatch = useDispatch();

  const albums = useSelector(state => state.albums);
  const artists = useSelector(state => state.artists);
  const playlist = useSelector(state => state.playlist);
  
  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (searchTerm) => {
      dispatch(initiateGetResult(searchTerm)).then(() => {
        setSelectedCategory('albums');
      });
    }
  
  const result = { albums, artists, playlist };

  return (
        <div>
          <Header />
          <SearchForm handleSearch={handleSearch} />
          {console.log(result)}
        </div>
  );
};


export default Dashboard;