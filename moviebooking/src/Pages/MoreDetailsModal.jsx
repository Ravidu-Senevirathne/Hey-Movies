import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './MoreDetailsModal.css'; // Custom CSS for black theme

const MoreDetailsModal = ({ show, onHide, movie }) => {
  if (!movie) return null; // Ensure movie data is available

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content">
          <img src={movie.imageUrl} alt={movie.title} className="modal-img" />
          <div className="modal-details">
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Cast Time:</strong> {movie.castTime}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoreDetailsModal;
