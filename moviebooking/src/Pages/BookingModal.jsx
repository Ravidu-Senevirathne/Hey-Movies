import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const BookingModal = ({ show, onHide, movieId, movieTitle, genre }) => {
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      console.log('Modal opened with:', { movieId, movieTitle, genre });
      if (!movieId || !genre) {
        setError('Missing movie information. Please try again.');
      } else {
        setError('');
      }
    }
  }, [show, movieId, movieTitle, genre]);

  const showTimes = ['10:00 AM', '1:30 PM', '5:30 PM', '8:30 PM'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
  
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || !user.id) {
      setError('User not found or invalid user ID');
      return;
    }
  
    if (!movieId || !genre) {
      setError('Missing movie information. Please try again.');
      return;
    }
  
    const bookingData = {
      userId: user.id,
      movieId: movieId,
      movieTitle: movieTitle,
      genre: genre,
      numberOfSeats: parseInt(numberOfSeats, 10),
      bookingDate: new Date(bookingDate).toISOString().split('T')[0],
      bookingTime: bookingTime
    };
  
    console.log('Booking data:', bookingData);
  
    try {
      const response = await axios.post('http://localhost:8080/api/bookings', bookingData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Server response:', response.data);
      alert('Booking successful!');
      onHide();
    } catch (error) {
      console.error('Error booking movie:', error.response ? error.response.data : error.message);
      setError(typeof error.response?.data === 'string' ? error.response.data : 'Error booking movie. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Book Tickets for {movieTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{typeof error === 'string' ? error : 'An error occurred. Please try again.'}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNumberOfSeats">
            <Form.Label>Number of Seats</Form.Label>
            <Form.Control
              type="number"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(e.target.value)}
              placeholder="Enter number of seats"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBookingDate">
            <Form.Label>Booking Date</Form.Label>
            <Form.Control
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBookingTime">
            <Form.Label>Booking Time</Form.Label>
            <Form.Select
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              required
            >
              <option value="">Select showtime</option>
              {showTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={!movieId || !genre}>
            Book Now
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
