import React, { useEffect, useState } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

const ShowBookingsModal = ({ show, handleClose }) => {
  const [bookings, setBookings] = useState([]);

  
  const fetchBookings = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/bookings');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch bookings: ${errorText}`);
        }
        const data = await response.json();
        setBookings(data);
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
    }
};

  useEffect(() => {
    if (show) {
      fetchBookings();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>All Bookings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Movie ID</th>
              <th>Movie Title</th>
              <th>Genre</th>
              <th>Number of Seats</th>
              <th>Booking Date</th>
              <th>Booking Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.userId}</td>
                  <td>{booking.movieId}</td>
                  <td>{booking.movieTitle}</td>
                  <td>{booking.genre}</td>
                  <td>{booking.numberOfSeats}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.bookingTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No bookings found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowBookingsModal;
