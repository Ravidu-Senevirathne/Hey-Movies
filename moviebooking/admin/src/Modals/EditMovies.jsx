import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditMovies = ({ show, handleClose, movies, onSave, selectedMovie, setSelectedMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [castTime, setCastTime] = useState('');

  useEffect(() => {
    if (selectedMovie) {
      setTitle(selectedMovie.title);
      setDescription(selectedMovie.description);
      setGenre(selectedMovie.genre);
      const formattedDate = selectedMovie.releaseDate.split('T')[0]; 
      setReleaseDate(formattedDate);
      setCastTime(selectedMovie.castTime || '');
    }
  }, [selectedMovie]);

  const handleMovieSelect = (event) => {
    const movieId = event.target.value;
    const movie = movies.find((movie) => movie.id === parseInt(movieId));
    setSelectedMovie(movie);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('releaseDate', releaseDate);
    formData.append('castTime', castTime);
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    onSave(selectedMovie.id, formData);
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMovieSelect">
            <Form.Label>Select Movie</Form.Label>
            <Form.Control as="select" onChange={handleMovieSelect} value={selectedMovie?.id || ''}>
              <option value="">Select a movie to edit</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {selectedMovie && (
            <>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter movie title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter movie description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter movie genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formReleaseDate">
                <Form.Label>Release Date</Form.Label>
                <Form.Control
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCastTime">
                <Form.Label>Cast Time</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cast time"
                  value={castTime}
                  onChange={(e) => setCastTime(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImageFile">
                <Form.Label>Image File</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMovies;
