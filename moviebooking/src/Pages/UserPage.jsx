import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MoviesComponent from '../Components/Main/Main';
import BookingModal from '../Pages/BookingModal';
import './UserPage.css';
import userImage from '../assets/User.png';
import search_icon from '../assets/search_icon.png';

const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  fetch('/api/auth/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    navigate('/');
  });
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  // Fetch movies from API
  const fetchMovies = async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/api/movies/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]); // Reset movies on error
    }
  };

  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 300), []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      navigate('/welcome', { replace: true });
    }
    fetchMovies(''); // Fetch all movies initially
  }, [navigate]);

  useEffect(() => {
    if (searchText) {
      debouncedFetchMovies(searchText);
    } else {
      fetchMovies(''); // Fetch all movies if search text is empty
    }
  }, [searchText, debouncedFetchMovies]);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setIsSearching(!!e.target.value);
  };

  const handleSearchIconClick = () => {
    setIsSearching(true);
  };

  const handleBlur = () => {
    if (!searchText) {
      setIsSearching(false);
    }
  };

  const handleBookClick = (movie) => {
    setSelectedMovie(movie);
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSelectedMovie(null);
  };

  const isLoggedIn = !!user;

  return (
    <div>
      <div className="navbar">
        <h1 className="logo">Hey Movies</h1>

        <div className="navbar-right">
          <div className="userDetails">
            {user ? (
              <div>
                <p>Welcome, {user.name || 'User'}</p>
              </div>
            ) : (
              <p>No user data found</p>
            )}
          </div>
          <img
            src={userImage}
            alt="user"
            className="user-image"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
            <li className="dropdown-item" onClick={() => navigate('/settings')}>
              Setting
            </li>
            <li className="dropdown-item" onClick={() => handleLogout(navigate)}>
              Log Out
            </li>
          </div>

          {isSearching ? (
            <input
              type="text"
              value={searchText}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Search movies..."
              aria-label="Search movies"
            />
          ) : (
            <img
              src={search_icon}
              alt="Search"
              onClick={handleSearchIconClick}
              className="search-icon"
            />
          )}
        </div>
      </div>

      <MoviesComponent
        movies={movies}
        buttonText={isLoggedIn ? 'Book' : 'Details'}
        isLoggedIn={isLoggedIn}
        onBookClick={handleBookClick}
      />

      {selectedMovie && (
        <BookingModal
          show={showBookingModal}
          onHide={handleCloseBookingModal}
          movieId={selectedMovie.id}
          movieTitle={selectedMovie.title}
          genre={selectedMovie.genre}
        />
      )}
    </div>
  );
};

export default UserPage;
