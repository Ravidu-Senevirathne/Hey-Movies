import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-section">
      <h2 className="about-title">About Us</h2>
      <p className="about-description">
        Welcome to <strong>Hey Movies</strong>, your ultimate destination for booking movie tickets online. Our platform is designed with one goal in mind – to make your movie-going experience as seamless and enjoyable as possible.
      </p>
      
      <h3 className="about-subtitle">Why Choose Us?</h3>
      <ul className="about-list">
        <li><strong>Effortless Booking:</strong> With just a few clicks, you can secure your seat for the latest blockbuster or a timeless classic.</li>
        <li><strong>Vast Movie Selection:</strong> From action-packed thrillers to heartwarming dramas, we offer a wide variety of movies to suit every taste.</li>
        <li><strong>Real-Time Availability:</strong> Our system provides up-to-the-minute information on seat availability, ensuring you never miss out.</li>
        <li><strong>Secure Payments:</strong> We offer multiple payment options, all with top-notch security, so you can book with confidence.</li>
      </ul>

      <h3 className="about-subtitle">Our Technology</h3>
      <p className="about-description">
        We harness the latest technology to bring you a user-friendly interface, advanced search and filtering options, and a fully responsive design that works beautifully on any device. Whether you’re at home or on the go, booking your favorite movies has never been easier.
      </p>

      <h3 className="about-subtitle">Our Commitment</h3>
      <p className="about-description">
        At <strong>Hey Movies</strong>, we are committed to providing exceptional customer service. Our support team is available 24/7 to assist you with any inquiries. We also value your privacy and ensure that all your personal information is securely handled.
      </p>

      <h3 className="about-subtitle">Join Our Community</h3>
      <p className="about-description">
        Stay connected with us through our social media channels. Follow us for the latest movie news, special offers, and more. Let’s make your movie nights truly unforgettable.
      </p>
      
      <p className="about-thankyou">
        Thank you for choosing <strong>Hey Movies</strong>. We look forward to being a part of your movie adventures!
      </p>
    </div>
  );
};

export default About;
