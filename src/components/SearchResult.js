import React from 'react';
import _ from 'lodash'
import AlbumsList from './AlbumsList';
import ArtistsList from './ArtistsList'
import PlayList from './PlayList';
import { Button } from 'react-bootstrap';

const SearchResult = (props) => {
    const { result, setCategory, selectedCategory, loadMore } = props
    const { albums, artists, playlists } = result

    return ( 
        <>
            <div className="search-buttons">
                {!_.isEmpty(albums?.items) && (
                    <button 
                        className={`${selectedCategory === 'albums' ? 'btn active' : 'btn'}`}
                        onClick={() => setCategory('albums')}>
                            Albums
                    </button>
                )}
                {!_.isEmpty(artists?.items) && (
                    <button 
                        className={`${selectedCategory === 'artists' ? 'btn active' : 'btn'}`}
                        onClick={() => setCategory('artists')}>
                            Artists
                    </button>
                )}
                {!_.isEmpty(playlists?.items) && (
                    <button 
                        className={`${selectedCategory === 'playlists' ? 'btn active' : 'btn'}`}
                        onClick={() => setCategory('playlists')}>
                            Playlists
                    </button>
                )}
            </div>
            <div className={`${selectedCategory === 'albums' ? '' : 'hide'}`}>
                {albums && <AlbumsList albums={albums} />}
            </div>
            <div className={`${selectedCategory === 'artists' ? '' : 'hide'}`}>
                {artists && <ArtistsList artists={artists} />}
            </div>
            <div className={`${selectedCategory === 'playlists' ? '' : 'hide'}`}>
                {playlists && <PlayList playlist={playlists} />}
            </div>
            {!_.isEmpty(result[selectedCategory]) &&
                !_.isEmpty(result[selectedCategory].next) && (
                <div className="load-more" onClick={() => loadMore(selectedCategory)}>
                    <Button variant="info" type="button">
                        Load More
                    </Button>
                </div>
            )}
        </>
     )
}
 
export default SearchResult;