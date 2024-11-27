import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import ExampleCarouselImage from '../../assets/futuristic-style-possums-wearing-clothing.jpg';
import './Home.css'; // Add any custom styles here if needed

// Base URL for fetching sliders from backend API
const API_BASE_URL = 'http://localhost:8080/api/sliders';
const IMAGE_BASE_URL = 'http://localhost:8080/uploads/'; // Base URL for images

const Home = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sliders on component mount
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setSliders(response.data); // Save the slider data from API response
      } catch (error) {
        setError('Error fetching sliders. Please try again later.');
        console.error(error); // Log the error to the console
      } finally {
        setLoading(false); // Always set loading to false after the fetch
      }
    };

    fetchSliders();
  }, []);

  // Display loading message if data is being fetched
  if (loading) return <p>Loading...</p>;

  // Display error message if there was an error fetching the sliders
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Carousel>
        {sliders.length > 0 ? (
          sliders.map((slider) => {
            // Clean URL construction
            const imageUrl = slider.imageUrl && slider.imageUrl.startsWith('/uploads/')
              ? `http://localhost:8080${slider.imageUrl}`
              : slider.imageUrl && !slider.imageUrl.startsWith('http')
                ? `${IMAGE_BASE_URL}${slider.imageUrl}`
                : slider.imageUrl || ExampleCarouselImage;

            console.log("Image URL:", imageUrl); // Debug: Log the constructed image URL
            
            return (
              <Carousel.Item key={slider.id}>
                <img
                  className="d-block w-100"
                  src={imageUrl} // Use cleaned URL for the image
                  alt={slider.title}
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h3>{slider.title}</h3>
                  <p>{slider.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })
        ) : (
          // Fallback if there are no sliders available
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={ExampleCarouselImage}
              alt="No slides"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default Home;