# Create a Spotify Music Search App in React

### Introduction

In this lab, you will create a Spotify Music Search App using the Spotify Music API.

By creating this app, you will learn

1. How to use Spotify API to provide OAuth authentication
2. How to search for albums, artists and playlists
3. Display the details with a beautiful UI
4. Play the songs directly from the list
5. How to add incremental loading functionality to the app

Run the React starter app with the command 

```
yarn start
```

You will see the following screen when you access the application at http://localhost:3000/

[![Login Screen](https://res.cloudinary.com/practicaldev/image/fetch/s--92Q3RLxP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/login.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--92Q3RLxP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/login.png)

## Adding login authentication functionality

Now, let’s add the login functionality. To login to Spotify via the app, you will need three things: `client_id`, `authorize_url` and `redirect_url`.

To get that, navigate [here](https://developer.spotify.com/dashboard/login) and login to the Spotify developer account (or sign up if you don't have an account).

After login, you will a see page similar to the below screen to create an application.

[![Account Dashboard](https://res.cloudinary.com/practicaldev/image/fetch/s--nvwIuCmE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/account.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--nvwIuCmE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/account.png)

Click the green `CREATE AN APP` button, enter the app name and description and then click on the `CREATE` button.

[![Create App](https://res.cloudinary.com/practicaldev/image/fetch/s--jJkBWM83--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/create_app.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--jJkBWM83--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/create_app.png)

Make a note of the generated Client ID.

[![Client ID](https://res.cloudinary.com/practicaldev/image/fetch/s--uem2RNwK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/client_id.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--uem2RNwK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/client_id.png)

Then click the `EDIT SETTINGS` button. Enter http://localhost:3000/redirect as the value for `Redirect URIs` and click on the `ADD` button. Then click on the `SAVE` button by scrolling a bit.

[![Edit Settings](https://res.cloudinary.com/practicaldev/image/fetch/s--My_z7Mlo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/edit_setting.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--My_z7Mlo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/3b531f3a0fd23bf92acc76c451fc5a3ba2112af9/edit_setting.png)

Now, create a new file with the name `.env` in the root of your project and add the following details inside it.

```
REACT_APP_CLIENT_ID=your_client_id
REACT_APP_AUTHORIZE_URL=https://accounts.spotify.com/authorize
REACT_APP_REDIRECT_URL=http://localhost:3000/redirect
```

Here,

- `REACT_APP_AUTHORIZE_URL` will be used to show an authorization popup to access your Spotify account from your app.
- `REACT_APP_REDIRECT_URL` will be the URL where you want the user to be redirected once authorized successfully.
- Each variable starts with `REACT_APP_` so `Create React App` will automatically add those variables in the `process.env` object to make it accessible in the application.

Note that, the value of the `REACT_APP_REDIRECT_URL` variable must match the value entered for the `Redirect URIs` in the `Edit settings` screenshot shown above otherwise the application will not work.

Now, open `src/components/Home.js` and add the `onClick` handler to the login button

```
<Button variant="info" type="submit" onClick={handleLogin}>
  Login to Spotify
</Button>
```

And add the `handleLogin` function

```js
const {
  REACT_APP_CLIENT_ID,
  REACT_APP_AUTHORIZE_URL,
  REACT_APP_REDIRECT_URL
} = process.env;

const handleLogin = () => {
  window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
};
```

Your updated `Home.js` file will look like this:

```js
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Header from './Header';
const Home = (props) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL
  } = process.env;
  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="login">
      <Header />
      <Button variant="info" type="submit" onClick={handleLogin}>
        Login to Spotify
      </Button>
    </div>
  );
};
export default connect()(Home);
```

Now, start your app by running `yarn start` command from the terminal and verify the login functionality

[![Login Authentication](https://res.cloudinary.com/practicaldev/image/fetch/s--Zj7ST1j2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/login.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--Zj7ST1j2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/login.gif)

As you can see, once we click on the `AGREE` button, we’re redirected to the `RedirectPage` component and Spotify will automatically add the `access_token`, `token_type` and `expires_in` to our redirect URL as shown below

```
http://localhost:3000/redirect#access_token=BQA4Y-o2kMSWjpRMD5y55f0nXLgt51kl4UAEbjNip3lIpz80uWJQJPoKPyD-CG2jjIdCjhfZKwfX5X6K7sssvoe20GJhhE7bHPaW1tictiMlkdzkWe2Pw3AnmojCy-NzVSOCj-aNtQ8ztTBYrCzRiBFGPtAn-I5g35An10&token_type=Bearer&expires_in=3600
```

- `access_token` is a Bearer token which you will be adding to every request made to the Spotify API later.
- `expires_in` specifies the token expiration time, which is `3600` seconds (1 hour) by default. After that, you need to log in again.

## Adding search functionality

Now, we have access to the token, we need to store it somewhere so we can use it for every API request.

Create a new file with name `functions.js` inside `src/utils` folder with the following content:

```js
import axios from 'axios';
export const getParamValues = (url) => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});
};
export const setAuthHeader = () => {
  try {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${params.access_token}`;
    }
  } catch (error) {
    console.log('Error setting auth', error);
  }
};
```

Here, we have added,

- `getParamValues` function that will store the `access_token`, `token_type` and `expires_in` values in an object which will look like this:

```
{
 access_token: some_value,
 token_type: some_value,
 expires_in: some_value
}
```

- `setAuthHeader` function that will add the `access_token` to every `axios` API request

Open `RedirectPage.js` file and replace it with the following contents:

```js
import React from 'react';
import _ from 'lodash';
import { getParamValues } from '../utils/functions';
export default class RedirectPage extends React.Component {
  componentDidMount() {
    const { setExpiryTime, history, location } = this.props;
    try {
      if (_.isEmpty(location.hash)) {
        return history.push('/dashboard');
      }
      const access_token = getParamValues(location.hash);
      const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
      localStorage.setItem('params', JSON.stringify(access_token));
      localStorage.setItem('expiry_time', expiryTime);
      history.push('/dashboard');
    } catch (error) {
      history.push('/');
    }
  }
  render() {
    return null;
  }
}
```

Here, we have added a `useEffect` hook to access the URL parameters and store them in local storage. We’re calling the `getParamValues` function by passing the URL values available in `location.hash`.

The `expires_in` value is in seconds (`&expires_in=3600`) so we’re converting it to milliseconds by multiplying it by `1000` and then adding it to the milliseconds at the current time

```js
const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
```

So the `expiryTime` will contain the milliseconds of the time one hour after the token generation time.

Create a new file `constants.js` inside `utils` folder with the following content:

```js
export const SET_ALBUMS = 'SET_ALBUMS';
export const ADD_ALBUMS = 'ADD_ALBUMS';
export const SET_ARTISTS = 'SET_ARTISTS';
export const ADD_ARTISTS = 'ADD_ARTISTS';
export const SET_PLAYLIST = 'SET_PLAYLIST';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
```

Create a new file `result.js` inside the `actions` folder with the following content:

```js
import {
  SET_ALBUMS,
  ADD_ALBUMS,
  SET_ARTISTS,
  ADD_ARTISTS,
  SET_PLAYLIST,
  ADD_PLAYLIST
} from '../utils/constants';
import { get } from '../utils/api';
export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums
});
export const addAlbums = (albums) => ({
  type: ADD_ALBUMS,
  albums
});
export const setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists
});
export const addArtists = (artists) => ({
  type: ADD_ARTISTS,
  artists
});
export const setPlayList = (playlists) => ({
  type: SET_PLAYLIST,
  playlists
});
export const addPlaylist = (playlists) => ({
  type: ADD_PLAYLIST,
  playlists
});
export const initiateGetResult = (searchTerm) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=album,playlist,artist`;
      const result = await get(API_URL);
      console.log(result);
      const { albums, artists, playlists } = result;
      dispatch(setAlbums(albums));
      dispatch(setArtists(artists));
      return dispatch(setPlayList(playlists));
    } catch (error) {
      console.log('error', error);
    }
  };
};
```

Create a new file `api.js` inside the `utils` folder with the following content:

```js
import axios from 'axios';
import { setAuthHeader } from './functions';

export const get = async (url, params) => {
  setAuthHeader();
  const result = await axios.get(url, params);
  return result.data;
};

export const post = async (url, params) => {
  setAuthHeader();
  const result = await axios.post(url, params);
  return result.data;
};
```

In this file, we’re making API calls using axios but before that, we’re adding the access_token in the `Authorization` Header by calling `setAuthHeader` function.

Create a new file `Loader.js` inside the `components` folder with the following content:

```js
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
const Loader = (props) => {
  const [node] = useState(document.createElement('div'));
  const loader = document.querySelector('#loader');

  useEffect(() => {
    loader.appendChild(node).classList.add('message');
  }, [loader, node]);

  useEffect(() => {
    if (props.show) {
      loader.classList.remove('hide');
      document.body.classList.add('loader-open');
    } else {
      loader.classList.add('hide');
      document.body.classList.remove('loader-open');
    }
  }, [loader, props.show]);

  return ReactDOM.createPortal(props.children, node);
};
export default Loader;
```

In this file, we have created a loader component that will display a loading message with the background overlay. We have used `ReactDOM.createPortal` method to create the loader.

To add the loader to the page, open `public/index.html` file and add the loader div after div with id `root`

Your `index.html` page body will look like this now:

```js
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <div id="loader" class="hide"></div>
  <!--
    This HTML file is a template.
    If you open it directly in the browser, you will see an empty page.
    
    You can add webfonts, meta tags, or analytics to this file.
    The build step will place the bundled scripts into the <body> tag.
    
    To begin the development, run `npm start` or `yarn start`.
    To create a production bundle, use `npm run build` or `yarn build`.
  -->
</body>
```

By default, the loader will be hidden, so we have added the `hide` class and while showing the loader we will be removing the `hide` class.

Create a new file `SearchForm.js` inside the `components` folder with the following content:

```js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      setErrorMsg('');
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg('Please enter a search term.');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter search term</Form.Label>
          <Form.Control
            type="search"
            name="searchTerm"
            value={searchTerm}
            placeholder="Search for album, artist or playlist"
            onChange={handleInputChange}
            autoComplete="off"
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchForm;
```

In this file, we’ve added a search box and based on the input value we’re updating the state of the component.

Create a new file `SearchResult.js` inside the `components` folder with the following content:

```js
import React from 'react';
import _ from 'lodash';
import AlbumsList from './AlbumsList';

const SearchResult = (props) => {
  const { result, setCategory, selectedCategory } = props;
  const { albums, artists, playlist } = result;

  return (
    <>
      <div className="search-buttons">
        {!_.isEmpty(albums.items) && (
          <button
            className={`${
              selectedCategory === 'albums' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('albums')}
          >
            Albums
          </button>
        )}
        {!_.isEmpty(artists.items) && (
          <button
            className={`${
              selectedCategory === 'artists' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('artists')}
          >
            Artists
          </button>
        )}
        {!_.isEmpty(playlist.items) && (
          <button
            className={`${
              selectedCategory === 'playlist' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('playlist')}
          >
            PlayLists
          </button>
        )}
      </div>
      <div className={`${selectedCategory === 'albums' ? '' : 'hide'}`}>
        {albums && <AlbumsList albums={albums} />}
      </div>
    </>
  );
};

export default SearchResult;
```

Create a new file `AlbumsList.js` inside the `components` folder with the following content:

```js
import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';

const AlbumsList = ({ albums }) => {
  return (
    <>
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          {albums.items.map((album, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={album.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(album.images) ? (
                      <Card.Img
                        variant="top"
                        src={album.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Text>
                      <small>
                        {album.artists.map((artist) => artist.name).join(', ')}
                      </small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AlbumsList;
```

Now, start the app by running `yarn start` 

[![API Response](https://res.cloudinary.com/practicaldev/image/fetch/s--WpuCfpk2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/music.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--WpuCfpk2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/music.gif)

As you can see, when we search for anything, the response from the Spotify API is displayed in the console. So we’re successfully able to access the music data from Spotify.

## Displaying the albums on the UI

Now, we will add the response in the redux store so we can display it on the UI.

Open `src/reducers/albums.js` file and replace it with the following contents:

```js
import { SET_ALBUMS, ADD_ALBUMS } from '../utils/constants';

const albumsReducer = (state = {}, action) => {
  const { albums } = action;
  switch (action.type) {
    case SET_ALBUMS:
      return albums;
    case ADD_ALBUMS:
      return {
        ...state,
        next: albums.next,
        items: [...state.items, ...albums.items]
      };
    default:
      return state;
  }
};

export default albumsReducer;
```

In the `Dashboard.js` file, we’re calling the `initiateGetResult` inside the `handleSearch` function which is triggered when user clicks on the search button.

If you check the `initiateGetResult` function from `actions/result.js` file, we’re making an API call to the `https://api.spotify.com/v1/search` URL by passing the search text as a query parameter

```js
export const initiateGetResult = (searchTerm) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=album,playlist,artist`;
      const result = await get(API_URL);
      console.log(result);
      const { albums, artists, playlists } = result;
      dispatch(setAlbums(albums));
      dispatch(setArtists(artists));
      return dispatch(setPlayList(playlists));
    } catch (error) {
      console.log('error', error);
    }
  };
};
```

and once we get the result, we’re calling the `setAlbums` action generator function by taking the albums from the result.

```js
dispatch(setAlbums(albums));
```

the `setAlbums` function looks like this:

```js
export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums
});
```

Here, we’re returning the action with the type of `SET_ALBUMS`. So once the action is dispatched, the `albumsReducer` from `reducers/albums.js` file gets called where for the matching `SET_ALBUMS` switch case, we’re returning the passed albums from the reducer so the redux store will get updated with the albums data.

```js
case SET_ALBUMS:
      return albums;
```

As we’ve connected the `Dashboard` component(`Dashboard.js`) to the redux store using `useSelector` hooks, the component gets the updated Redux store data that result we’re passing to the `SearchResult` component. Replace `{console.log(result)}` in `Dashboard.js` with

```js
<SearchResult
  result={result}
  setCategory={setCategory}
  selectedCategory={selectedCategory}
/>
```

And import `SearchResult`:

```js
import SearchResult from "./SearchResult";
```

Now, run the `yarn start` command again and check the application

[![Albums](https://res.cloudinary.com/practicaldev/image/fetch/s--B-ds460K--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/albums.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--B-ds460K--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/albums.gif)

As you can see, when we search, the Redux store is updated and the result is displayed on the UI. Let’s understand the code for this functionality.

## Displaying the artists and playlists on the UI

Create a new file `ArtistsList.js` inside the `components` folder with the following content, almost identical to `AlbumsList.js`:

```js
import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';

const ArtistsList = ({ artists }) => {
  return (
    <>
      {Object.keys(artists).length > 0 && (
        <div className="artists">
          {artists.items.map((artist, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={artist.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(artist.images) ? (
                      <Card.Img
                        variant="top"
                        src={artist.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ArtistsList;
```

Create a new file `PlayList.js` inside the `components` folder with the following content, almost identical to `AlbumsList.js` and `ArtistsList.js`:

```js
import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';

const PlayList = ({ playlist }) => {
  return (
    <div>
      {Object.keys(playlist).length > 0 && (
        <div className="playlist">
          {playlist.items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={item.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(item.images) ? (
                      <Card.Img variant="top" src={item.images[0].url} alt="" />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <small>By {item.owner.display_name}</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlayList;
```

Now, open `SearchResult.js` file and alongside the `AlbumsList`, add the `ArtistsList` and `PlayList` components

```js
<div className={`${selectedCategory === 'albums' ? '' : 'hide'}`}>
  {albums && <AlbumsList albums={albums} />}
</div>
<div className={`${selectedCategory === 'artists' ? '' : 'hide'}`}>
  {artists && <ArtistsList artists={artists} />}
</div>
<div className={`${selectedCategory === 'playlist' ? '' : 'hide'}`}>
  {playlist && <PlayList playlist={playlist} />}
</div>
```

Also, import the components at the top of the file

```js
import ArtistsList from './ArtistsList';
import PlayList from './PlayList';
```

Open `src/reducers/artists.js` file and update it to look like `src/reducers/albums.js`. For reference, the necessary content is here:

```js
import { SET_ARTISTS, ADD_ARTISTS } from '../utils/constants';

const artistsReducer = (state = {}, action) => {
  const { artists } = action;
  switch (action.type) {
    case SET_ARTISTS:
      return artists;
    case ADD_ARTISTS:
      return {
        ...state,
        next: artists.next,
        items: [...state.items, ...artists.items]
      };
    default:
      return state;
  }
};

export default artistsReducer;
```

Open `src/reducers/playlist.js` file and update it to look like `src/reducers/albums.js`. For reference, the necessary content is here:

```js
import { SET_PLAYLIST, ADD_PLAYLIST } from '../utils/constants';

const playlistReducer = (state = {}, action) => {
  const { playlists } = action;
  switch (action.type) {
    case SET_PLAYLIST:
      return playlists;
    case ADD_PLAYLIST:
      return {
        ...state,
        next: playlists.next,
        items: [...state.items, ...playlists.items]
      };
    default:
      return state;
  }
};

export default playlistReducer;
```

Now, run the `yarn start` command again and check the application

[![Populated data](https://res.cloudinary.com/practicaldev/image/fetch/s--83XA7HU5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/all_data.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--83XA7HU5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/all_data.gif)

As you can see, the artists and playlists are also populated with data.

[![Play Music](https://res.cloudinary.com/practicaldev/image/fetch/s--ci7fGtOO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/play.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--ci7fGtOO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/play.gif)

Also, If you click on any of the images, you can play the music from the album, artist or playlist as shown above.

## Adding incremental loading functionality

Now, let’s add a **Load More** button to load more data for albums, artists and playlists.

Open `SearchResult.js` and add the **Load More** button just before the ending `</>` tag

```js
{!_.isEmpty(result[selectedCategory]) &&
 !_.isEmpty(result[selectedCategory].next) && (
  <div className="load-more" onClick={() => loadMore(selectedCategory)}>
    <Button variant="info" type="button">
      Load More
    </Button>
  </div>
)}
```

Destructure the `loadMore` function from props and import the `Button` from `react-bootstrap`

```js
import { Button } from 'react-bootstrap';
const SearchResult = (props) => {
const { loadMore, result, setCategory, selectedCategory } = props;
```

Open `Dashboard.js` file and add the `loadMore` function

```js
const loadMore = async (type) => {
  setIsLoading(true);
  switch (type) {
    case 'albums':
      await dispatch(initiateLoadMoreAlbums(albums.next));
      break;
    case 'artists':
      await dispatch(initiateLoadMoreArtists(artists.next));
      break;
    case 'playlist':
      await dispatch(initiateLoadMorePlaylist(playlist.next));
      break;
    default:
  }
  setIsLoading(false);
};
```

and pass the `loadMore` function as a prop to the `SearchResult` component

```js
return (
  <div>
    <Header />
    <SearchForm handleSearch={handleSearch} />
    <Loader show={isLoading}>Loading...</Loader>
    <SearchResult
      result={result}
      loadMore={loadMore}
      setCategory={setCategory}
      selectedCategory={selectedCategory}
    />
  </div>
);
```

Open `actions/result.js` file and add the following functions at the end of the file

```js
export const initiateLoadMoreAlbums = (url) => {
  return async (dispatch) => {
    try {
      console.log('url', url);
      const result = await get(url);
      console.log('categoriess', result);
      return dispatch(addAlbums(result.albums));
    } catch (error) {
      console.log('error', error);
    }
  };
};
export const initiateLoadMoreArtists = (url) => {
  return async (dispatch) => {
    try {
      console.log('url', url);
      const result = await get(url);
      console.log('categoriess', result);
      return dispatch(addArtists(result.artists));
    } catch (error) {
      console.log('error', error);
    }
  };
};
export const initiateLoadMorePlaylist = (url) => {
  return async (dispatch) => {
    try {
      console.log('url', url);
      const result = await get(url);
      console.log('categoriess', result);
      return dispatch(addPlaylist(result.playlists));
    } catch (error) {
      console.log('error', error);
    }
  };
};
```

and import these functions inside the `Dashboard.js` file at the top

```js
import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists
} from '../actions/result';
```

Now, run the `yarn start` command and check the load more functionality

[![Load More](https://res.cloudinary.com/practicaldev/image/fetch/s--TNh6SqOr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/load_more_.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--TNh6SqOr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://gist.github.com/myogeshchavan97/e0be7fc4c838544e2d00afeb3a82ae10/raw/a431301a285525bbb4927f01053683019cc5a8ea/load_more_.gif)

------

## Redirect to the login page on session timeout

Now, we’re done with the functionality of the app. Let’s add the code to automatically redirect to the login page and show the message of session expired when the access token is expired. This is because, if the session is expired then the API call will fail but the user will not be notified.

If you recollect, in the `RedirectPage.js` file, we have added `expiry_time` in the local storage with the following code

```js
const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
localStorage.setItem('expiry_time', expiryTime);
```

Now, let’s use this to identify when to redirect to the login page.

Open `AppRouter.js` file and replace it with the following contents:

```
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import RedirectPage from '../components/RedirectPage';
import Dashboard from '../components/Dashboard';
import NotFoundPage from '../components/NotFoundPage';
const AppRouter = () => {
  const [state, setState] = useState({ expiryTime: "0" });

  useEffect(() => {
    let expiryTime;
    try {
      expiryTime = JSON.parse(localStorage.getItem('expiry_time'));
    } catch (error) {
      expiryTime = '0';
    }
    setState({ expiryTime });
  })
  
  const setExpiryTime = (expiryTime) => {
    setState({ expiryTime });
  };
  const isValidSession = () => {
    const currentTime = new Date().getTime();
    const expiryTime = state.expiryTime;
    const isSessionValid = currentTime < expiryTime;

    return isSessionValid;
  };
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/redirect" component={RedirectPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

export default AppRouter;
```

In this file, we have added a state variable `expiryTime` initialized to `0` by default and in the `useEffect` hook, we’re reading the `expiry_time` value from the local storage and assigning it to the state.

We also added `setExpiryTime` and `isValidSession` functions so we can use them in other components.

Now, open `RedirectPage.js` file and before calling `history.push('/dashboard');` add the following line of code

```
setExpiryTime(expiryTime);
```

But to call this function, we need to pass it as a prop to the `RedirectPage` component.

If you check the render method of the `AppRouter` component, it looks like this:

```
render() {
  return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/redirect" component={RedirectPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

So to pass the `setExpiryTime` function as a prop to the `RedirectPage` component, we need to convert it to the render prop pattern.

Therefore, change the below line of code

```
<Route path="/redirect" component={RedirectPage} />
```

to this code:

```
<Route
  path="/redirect"
  render={(props) => (
    <RedirectPage
      isValidSession={isValidSession}
      setExpiryTime={setExpiryTime}
      {...props}
    />
  )}
/>
```

Here, we’re passing the `setExpiryTime` , `isValidSession` function as a prop and also spreading out the props which are automatically passed to the Route like `location`, `history`.

Now, open the `Dashboard.js` file and destructure the props and change the `handleSearch` function to this:

```
const { isValidSession, history } = props;
const handleSearch = (searchTerm) => {
  if (isValidSession()) {
    setIsLoading(true);
    props.dispatch(initiateGetResult(searchTerm)).then(() => {
      setIsLoading(false);
      setSelectedCategory('albums');
    });
  } else {
    history.push({
      pathname: '/',
      state: {
        session_expired: true
      }
    });
  }
};
```

Also, change the `loadMore` function to this:

```
const loadMore = async (type) => {
  if (isValidSession()) {
    setIsLoading(true);
    switch (type) {
      case 'albums':
        await dispatch(initiateLoadMoreAlbums(albums.next));
        break;
      case 'artists':
        await dispatch(initiateLoadMoreArtists(artists.next));
        break;
      case 'playlist':
        await dispatch(initiateLoadMorePlaylist(playlist.next));
        break;
      default:
    }
    setIsLoading(false);
  } else {
    history.push({
      pathname: '/',
      state: {
        session_expired: true
      }
    });
  }
};
```

Change the returned JSX from the `Dashboard` component to this:

```
return isValidSession ? (
    <div>
      <Header />
      <SearchForm handleSearch={handleSearch} />
      <Loader show={isLoading}>Loading...</Loader>
      <SearchResult
        result={result}
        loadMore={loadMore}
        setCategory={setCategory}
        selectedCategory={selectedCategory}
        isValidSession={isValidSession}
      />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: '/',
        state: {
          session_expired: true
        }
      }}
    />
  );
```

Also, import the `Redirect` component at the top:

```
import { Redirect } from 'react-router-dom';
```

Open `SearchResult.js` file and before returning the JSX, add the following code:

```
if (!isValidSession()) {
  return (
    <Redirect
      to={{
        pathname: '/',
        state: {
          session_expired: true
        }
      }}
    />
  );
}
```

Also, destructure the `isValidSession` from props and add the `Redirect` component from the `react-router-dom`.

Now, open the `Home.js` file and replace it with the following contents:

```
import React from 'react';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Header from './Header';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL
  } = process.env;
  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };
  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  return (
    <>
      {isValidSession() ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="login">
          <Header />
          {sessionExpired && (
            <Alert variant="info">Session expired. Please login again.</Alert>
          )}
          <Button variant="info" type="submit" onClick={handleLogin}>
            Login to Spotify
          </Button>
        </div>
      )}
    </>
  );
};
export default Home;
```

Here, we have the code to redirect to `/dashboard` page if the session is valid otherwise redirected to the login page. Also displayed the message of session expired so the user will get an idea of why the page is redirected to the login page.

```
{sessionExpired && (
  <Alert variant="info">Session expired. Please login again.</Alert>
)}
```

Now, open the `AppRouter.js` file and pass the `isValidSession` function to the `Home` and `Dashboard` route.

```
return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route
            path="/"
            exact={true}
            render={(props) => (
              <Home isValidSession={this.isValidSession} {...props} />
            )}
          />
          <Route
            path="/redirect"
            render={(props) => (
              <RedirectPage
                isValidSession={this.isValidSession}
                setExpiryTime={this.setExpiryTime}
                {...props}
              />
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard isValidSession={this.isValidSession} {...props} />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
```

