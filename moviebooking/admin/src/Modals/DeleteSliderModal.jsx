import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DeleteSliderModal({ show, handleClose, handleDelete, sliders }) {
  const [selectedSliderId, setSelectedSliderId] = useState("");

  useEffect(() => {
    if (sliders.length > 0) {
      setSelectedSliderId(sliders[0].id);
    }
  }, [sliders]);

  const handleSliderChange = (event) => {
    setSelectedSliderId(event.target.value);
  };

  const confirmDelete = () => {
    if (selectedSliderId) {
      handleDelete(selectedSliderId);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Slider</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this slider?</p>
        <Form.Group className="mb-3" controlId="formSliderSelect">
          <Form.Label>Sliders</Form.Label>
          <Form.Select value={selectedSliderId} onChange={handleSliderChange}>
            <option value="" disabled>Select a slider</option>
            {sliders.map((slider) => (
              <option key={slider.id} value={slider.id}>
                {slider.title} 
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteSliderModal;
