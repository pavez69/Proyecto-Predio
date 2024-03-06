import React, { useState } from 'react';
import axios from 'axios';

const About = () => {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/users/search?name=${searchName}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div>
      <h3>Nosotros</h3>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Buscar por nombre"
      />
      <button onClick={handleSearch}>Buscar</button>
      <div>
        {searchResults.map((user) => (
          <div key={user._id}>
            <p>{user.name}</p>
            {user.image && <img src={`/users/image/${user.image}`} alt={user.name} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;