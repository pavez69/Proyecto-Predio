import React, { Fragment, useState } from "react";
import axios from "axios";

export const About = () => {
  const [searchName, setSearchName] = useState(""); // Estado para almacenar el nombre de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  // Función para manejar la búsqueda
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/users?name=${searchName}`); // Realizar una solicitud GET al backend con el nombre de búsqueda
      setSearchResults(response.data); // Actualizar el estado con los resultados de búsqueda
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <Fragment>
      <div className="row">
        <h3>Nosotros</h3>
        <p>
          ¡Descubre nuestra revolucionaria aplicación para la gestión de cultivos!
          {/* Agregar aquí el contenido actual del componente About */}
        </p>
      </div>
      <div className="row">
        <h4>Buscar usuario por nombre</h4>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={searchName}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="button" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="row">
          <h4>Resultados de la búsqueda</h4>
          <ul className="list-group">
            {searchResults.map((user) => (
              <li key={user._id} className="list-group-item">
                Nombre: {user.name}, Email: {user.email} {/* Mostrar otros datos relevantes del usuario */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};