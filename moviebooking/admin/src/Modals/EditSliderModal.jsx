import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditSliderModal = ({ show, handleClose, sliders = [], handleSave }) => {
  const [selectedSliderId, setSelectedSliderId] = useState('');
  const [sliderData, setSliderData] = useState({
    title: '',
    description: '',
    imageFile: null
  });

 
  const handleSliderSelect = (e) => {
    const sliderId = e.target.value;
    setSelectedSliderId(sliderId);

  
    const selectedSlider = sliders.find(slider => slider.id === parseInt(sliderId));
    if (selectedSlider) {
      setSliderData({
        title: selectedSlider.title,
        description: selectedSlider.description,
        imageFile: null
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setSliderData({ ...sliderData, imageFile: files[0] });
    } else {
      setSliderData({ ...sliderData, [name]: value });
    }
  };


  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('title', sliderData.title);
    formData.append('description', sliderData.description);
    if (sliderData.imageFile) {
      formData.append('imageFile', sliderData.imageFile);
    }

    await handleSave(selectedSliderId, formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Slider</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

        
          <Form.Group className="mb-3" controlId="formSelectSlider">
            <Form.Label>Select Slider</Form.Label>
            <Form.Select value={selectedSliderId} onChange={handleSliderSelect}>
              <option value="" disabled>Select a slider</option>
              {sliders.map(slider => (
                <option key={slider.id} value={slider.id}>
                  {slider.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              value={sliderData.title}
              onChange={handleInputChange}
              disabled={!selectedSliderId}
            />
          </Form.Group>

        
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter description"
              value={sliderData.description}
              onChange={handleInputChange}
              disabled={!selectedSliderId}
            />
          </Form.Group>

       
          <Form.Group className="mb-3" controlId="formImageFile">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleInputChange}
              disabled={!selectedSliderId}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveChanges}
          disabled={!selectedSliderId}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSliderModal;
