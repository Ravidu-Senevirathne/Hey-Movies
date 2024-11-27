import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import MoreDetailsModal from '../../Pages/MoreDetailsModal';
import './Main.css';

const API_BASE_URL = 'http://localhost:8080/api/movies';
const BASE_URL = 'http://localhost:8080'; // Base URL for images

const MoviesComponent = React.memo(({ buttonText, isLoggedIn, onBookClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        console.log('API Response:', response.data); // Log the entire response
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Error fetching movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleShowModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <p>{error}</p>;

  return (
    <div className='main'>
      <div className='card-container'>
        {movies.length > 0 ? (
          movies.map((movie) => {
            console.log('Movie object:', movie); // Log movie object to check structure
            
            // Handle undefined or null imageUrl
            const imageUrl = movie.imageUrl ? `${BASE_URL}${movie.imageUrl}` : 'https://via.placeholder.com/150';

            return (
              <Card key={movie.id} style={{ maxWidth: '18rem', margin: '10px' }}>
                <div className='card-img-wrapper'>
                  <Card.Img 
                    className='card-img' 
                    variant="top" 
                    src={imageUrl} 
                    alt={movie.title} 
                    onError={(e) => {
                      console.error('Image failed to load:', e.target.src);
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/150'; 
                    }} 
                  />
                </div>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => isLoggedIn ? onBookClick(movie) : handleShowModal(movie)}
                  >
                    {isLoggedIn ? "Book" : "Details"}
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p>No movies available.</p>
        )} 
      </div>

      {selectedMovie && (
        <MoreDetailsModal
          show={showModal}
          onHide={handleCloseModal}
          movie={selectedMovie}
        />
      )}
    </div>
  );
});

export default MoviesComponent;
