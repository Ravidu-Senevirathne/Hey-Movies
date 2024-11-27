import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DeleteMovies = ({ show, handleClose, movies, onDelete, selectedMovie, setSelectedMovie }) => {
  const handleDelete = () => {
    if (selectedMovie) {
      onDelete(selectedMovie.id); // Pass the selected movie's id to delete
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMovieSelect">
            <Form.Label>Select Movie to Delete</Form.Label>
            <Form.Control
              as="select"
              value={selectedMovie ? selectedMovie.id : ''}
              onChange={(e) =>
                setSelectedMovie(movies.find((movie) => movie.id === parseInt(e.target.value)))
              }
            >
              <option value="" disabled>Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={!selectedMovie}>
          Delete Movie
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMovies;
