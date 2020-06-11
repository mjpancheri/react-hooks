import React, {useState, useEffect} from 'react';
import {MdStar, MdStarBorder} from 'react-icons/md'

function App() {
  const [repositories, setRepositories] = useState([]); 
  const [location, setLocation] = useState({});

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(handlePositionReceived)

    return () => navigator.geolocation.clearWatch(watchId);
  },[]);

  function handlePositionReceived({coords}){
    const {latitude, longitude} = coords;
    setLocation({latitude, longitude});
  }

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/mjpancheri/repos');
    const data = await response.json();

    setRepositories(data);
  },[]);

  useEffect(() => {
    const favorites = repositories.filter(repo => repo.favorite);
    document.title = `You have ${favorites.length} favorites`;
  },[repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <h3>useEffect substituindo componentDidmount</h3>
      <h4>Github Repositories</h4>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <MdStar size={24} onClick={() => handleFavorite(repo.id)} />}
            {!repo.favorite && <MdStarBorder size={24} onClick={() => handleFavorite(repo.id)} />}
          </li>
        ))}
      </ul>
      <hr/>
      <h3>useEffect substituindo componentDidUpdate</h3>
      <h4>User location</h4>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <hr/>
      <h3>useEffect substituindo componentWillUnmount</h3>
    </>
  );
}

export default App;
