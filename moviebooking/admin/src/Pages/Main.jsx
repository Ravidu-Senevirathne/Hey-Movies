import React, { useState, useEffect } from 'react';
import './Main.css';
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';
import EditSliderModal from '../Modals/EditSliderModal';
import AddSliderModal from '../Modals/AddSliderModal';
import DeleteSliderModal from '../Modals/DeleteSliderModal';
import EditMovies from '../Modals/EditMovies';
import DeleteMovies from '../Modals/DeleteMovies';
import AddMovieModal from '../Modals/AddMovies'; // Import your movie modal
import ShowBookingsModal from '../Modals/ShowBookingsModal';

const Main = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false); // State to control AddMovieModal visibility
  const [showEditMovieModal, setShowEditMovieModal] = useState(false);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [movies, setMovies] = useState([]); 
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [sliders, setSliders] = useState([]);

  // Fetch sliders
  const fetchSliders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sliders');
      if (!response.ok) {
        throw new Error('Failed to fetch sliders');
      }
      const data = await response.json();
      setSliders(data);
    } catch (error) {
      console.error('Error fetching sliders:', error);
    }
  };

  // Fetch movies (add this function)
  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/movies');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data); // Update the state with fetched movies
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchSliders();
    fetchMovies(); 
  }, []);

  // Handle saving new slider
  const handleSaveSlider = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/sliders", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save slider");
      }

      const data = await response.json();
      console.log("Slider saved:", data);
      setSuccessMessage("Slider added successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchSliders(); 
    } catch (error) {
      console.error("Error saving slider:", error);
      setSuccessMessage("Error saving slider. Please try again.");
    }
  };

  // Handle deleting a slider
  const handleDeleteSlider = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sliders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete slider');
      }

      setSuccessMessage("Slider deleted successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchSliders();
    } catch (error) {
      console.error('Error deleting slider:', error);
      setSuccessMessage("Error deleting slider. Please try again.");
    }
  };

  // Handle updating a slider
  const handleUpdateSlider = async (id, formData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sliders/${id}`, {
        method: 'PUT',
        body: formData, 
      });

      if (!response.ok) {
        throw new Error('Failed to update slider');
      }

      const data = await response.json();
      console.log("Slider updated:", data);
      setSuccessMessage("Slider updated successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchSliders(); 
    } catch (error) {
      console.error('Error updating slider:', error);
      setSuccessMessage("Error updating slider. Please try again.");
    }
  };

  // Handle saving a new movie 
  const handleSaveMovie = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/movies", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save movie");
      }

      const data = await response.json();
      console.log("Movie saved:", data);
      setSuccessMessage("Movie added successfully!"); 
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchMovies(); 
    } catch (error) {
      console.error("Error saving movie:", error);
      setSuccessMessage("Error saving movie. Please try again.");
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }

      setSuccessMessage("Movie deleted successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
      setSuccessMessage("Error deleting movie. Please try again.");
    }
  };


    // Handle updating a movie
    const handleUpdateMovie = async (id, formData) => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
          method: 'PUT',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to update movie');
        }
  
        const data = await response.json();
        console.log("Movie updated:", data);
        setSuccessMessage("Movie updated successfully!");
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchMovies();
      } catch (error) {
        console.error('Error updating movie:', error);
        setSuccessMessage("Error updating movie. Please try again.");
      }
    };

  return (
    <div className="main-container">
      <Header />
      <Sidebar
        onEditSlider={() => setShowEditModal(true)}
        onAddSlider={() => setShowAddModal(true)}
        onDeleteSlider={() => setShowDeleteModal(true)}
        onAddMovie={() => setShowAddMovieModal(true)} 
        onEditMovie={() => setShowEditMovieModal(true)}
        onDeleteMovie={() => setShowDeleteMovieModal(true)}
        onShowBookings={() => setShowBookingsModal(true)} 
      />

   
      <EditSliderModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        sliders={sliders}
        handleSave={handleUpdateSlider}
      />

      <AddSliderModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSave={handleSaveSlider}
      />

      <DeleteSliderModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDeleteSlider}
        sliders={sliders}
      />

<AddMovieModal
        show={showAddMovieModal}
        handleClose={() => setShowAddMovieModal(false)}
        handleSave={handleSaveMovie}
      />


<EditMovies
  show={showEditMovieModal}
  handleClose={() => setShowEditMovieModal(false)}
  movies={movies}  
  onSave={handleUpdateMovie}  
  selectedMovie={selectedMovie} 
  setSelectedMovie={setSelectedMovie}
/>
      <DeleteMovies
        show={showDeleteMovieModal}
        handleClose={() => setShowDeleteMovieModal(false)}
        movies={movies}
        onDelete={handleDeleteMovie}
        setSelectedMovie={setSelectedMovie}
        selectedMovie={selectedMovie}
      />

<ShowBookingsModal
        show={showBookingsModal}
        handleClose={() => setShowBookingsModal(false)}
      />

      <div className="main-content">
        <h1>Welcome to the Admin Panel</h1>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
      </div>
    </div>
  );
};

export default Main;
