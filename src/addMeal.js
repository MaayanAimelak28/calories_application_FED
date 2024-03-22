/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
// this component allows users to add meal items to the application.
import React from 'react';
import { useState } from 'react';
import { idb } from './idb';
import { nanoid } from 'nanoid';
import './styles.css';

function Meal() {

    // the data of each meal.
    const [meal, setMeal] = useState({
        id: '',
        category: 'BREAKFAST', // the default will be BREAKFAST.
        date: '',
        calories: '',
        description: '',
    });

    // destructure the state variables for easier access.
    const { category, date, calories, description } = meal;

    // handle the click event
    async function handleClickMeal(event) {
        // preventing default form submission behavior.
        event.preventDefault();
    
        // generate a unique ID for the meal by using nanoid.
        let ID = meal.id = nanoid();
    
        // updating the meal state with the new meal values.
        setMeal({
            id: ID,
            category: category,
            date: date,
            calories: calories,
            description: description
        });
    
        // if the calories field is empty show an alert message.
        if (!calories) {
            alert('Fill the calories field.');
            return;
        }
        // if the description field is empty show an alert message.
        if (!description) {
            alert('Fill the description field.');
            return;
        }
        // if the date field is empty show an alert message.
        if (!date) {
            alert('Choose the date of the meal');
            return;
        }
    
        try {
            // opening IndexedDB database.
            const db = await window.idb.openCaloriesDB('caloriesdb', 1);
            // create an object containing meal data along with the current date.
            const mealData = { ...meal, date: date };
    
            // adding it to IndexedDB and show an alert message.
            await db.addCalories(mealData);
            alert('The meal has been successfully added');
    
            // reset the state to clear the form fields.
            setMeal({
                id: '',
                category: 'BREAKFAST',
                date: '',
                calories: '',
                description: '',
            });
    
        } catch (error) {
            // detecting and handling errors and showing an alert message.
            console.error('Error adding data to database:', error);
            alert('Error adding data to database:', error);
        }
    }
    
    
    return (
        <section id='contact-form' className='py'>
            <div className='container'>
                <h2><span className='text-primary'>Calorie Management Client Application</span></h2>
                <p>{/* the form for adding calorie consumption items. */}
                Add calorie consumption items:
                </p>
                <form id='my-form'>
                    <div className='form-group'>
                        <label>{/* selecting the category of the meal*/}Category
                            <select name='category' id='category' value={category}
                                onChange={(e) => setMeal({ ...meal, category: e.target.value })}>
                                <option value='BREAKFAST'>BREAKFAST</option>
                                <option value='LUNCH'>LUNCH</option>
                                <option value='DINNER'>DINNER</option>
                                <option value='OTHER'>OTHER</option>
                            </select>
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>{/* updating the calorie property of the meal based on user input */}Calories <input name='calories' id='calories' type='number' pattern='[0-9]*'
                            value={calories} onChange={(e) => setMeal({ ...meal, calories: e.target.value })} required={true} /></label>
                    </div>
                    <div className='form-group'>
                        <label>{/* updating the date property of the meal based on user input */}Date <input type='date' name='date' id={'date'}
                            value={date} onChange={(e) => setMeal({ ...meal, date: e.target.value })} required={true} /></label>
                    </div>
                    <div className='form-group'>
                        <label>{/* updating the description property of the meal based on user input */}Description
                            <input name='description' id='description' type='text' value={description}
                                onChange={(e) => setMeal({ ...meal, description: e.target.value })} required={true} /></label>
                    </div>
                    <button className='add-btn' onClick={handleClickMeal}>Add Meal</button>
                </form>
            </div>
        </section>
    );
}

export default Meal;

