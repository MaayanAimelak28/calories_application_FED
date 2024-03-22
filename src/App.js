/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
import React from 'react';
import Meal from './addMeal'; // import the component for adding meals.
import Report from './report'; // import the component for showing meals.
import './styles.css'; 

function App() {
  return (
    <div className="main-container">
      <div className="left-content"><Meal /> </div>
      <div className="right-content"><Report /> </div>
    </div>
   
  );
}

export default App;