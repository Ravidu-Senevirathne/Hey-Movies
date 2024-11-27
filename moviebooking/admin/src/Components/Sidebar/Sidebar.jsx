import React from 'react';
import './Sidebar.css';

const Sidebar = ({ 
  onEditSlider, 
  onAddSlider, 
  onDeleteSlider, 
  onAddMovie, 
  onEditMovie, 
  onDeleteMovie ,
  onShowBookings
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><button onClick={onEditSlider}>Edit Sliders</button></li>
          <li><button onClick={onAddSlider}>Add Slider</button></li>
          <li><button onClick={onDeleteSlider}>Delete Slider</button></li>
          <li><button onClick={onAddMovie}>Add Movies</button></li>
          <li><button onClick={onEditMovie}>Edit Movies</button></li>
          <li><button onClick={onDeleteMovie}>Delete Movies</button></li>
          <li> <button onClick={onShowBookings}>Show Bookings</button> </li>
          <li><button>More Options</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
