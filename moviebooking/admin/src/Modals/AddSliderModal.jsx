import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddSliderModal({ show, handleClose, handleSave }) {
  const [slider, setSlider] = useState({ title: "", description: "", imageFile: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setSlider({ ...slider, imageFile: files[0] }); // Handle file selection
    } else {
      setSlider({ ...slider, [name]: value }); // Handle text fields
    }
  };

  const saveSlider = () => {
    const formData = new FormData();
    formData.append("title", slider.title);
    formData.append("description", slider.description);
    formData.append("imageFile", slider.imageFile);
  
    handleSave(formData);
    setSlider({ title: "", description: "", imageFile: null }); // Reset the form fields
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Slider</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={slider.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              name="description"
              value={slider.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImageFile">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveSlider}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSliderModal;