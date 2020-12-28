import React, { useState } from 'react';

import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMoreArtists,
  initiateLoadMorePlaylists
} from '../actions/result';
import SearchForm from './SearchForm';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import SearchResult from './SearchResult';
import Loader from './Loader';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');

  const dispatch = useDispatch();

  const albums = useSelector(state => state.albums);
  const artists = useSelector(state => state.artists);
  const playlists = useSelector(state => state.playlists);

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (searchTerm) => {
    setIsLoading(true)
    dispatch(initiateGetResult(searchTerm)).then(() => {
      setSelectedCategory('albums');
      setIsLoading(false)
    });
  }

  const result = { albums, artists, playlists };

  const loadMore = async type => {
    setIsLoading(true)
    switch (type) {
      case 'albums':
        await dispatch(initiateLoadMoreAlbums(albums.next));
        break;
      case 'artists':
        await dispatch(initiateLoadMoreArtists(artists.next))
        break;
      case 'playlists':
        await dispatch(initiateLoadMorePlaylists(playlists.next))
        break;
      default:
    }
    setIsLoading(false)
  }

  return (
    <div>
      <Header />
      <SearchForm handleSearch={handleSearch} />
      <Loader show={isLoading}>Loading...</Loader>
      <SearchResult
        result={result}
        setCategory={setCategory}
        selectedCategory={selectedCategory}
        loadMore={loadMore} />
    </div>
  );
};


export default Dashboard;