import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddMovieModal = ({ show, handleClose, handleSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [castTime, setCastTime] = useState(''); // New castTime state
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('releaseDate', releaseDate);
    formData.append('castTime', castTime); // Add castTime to form data
    formData.append('imageFile', imageFile);

    try {
      const response = await axios.post('http://localhost:8080/api/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Movie saved

      handleSave(formData); // Call handleSave to handle success
      handleClose(); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
              type="number"
              placeholder="Enter movie cast time (in minutes)"
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
          <Button variant="primary" type="submit">
            Add Movie
          </Button>
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

export default AddMovieModal;
