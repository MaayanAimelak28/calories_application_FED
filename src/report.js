/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
// this component generates and displays the monthly report.
import React, { useState } from 'react';
import { idb } from './idb';

function Report() {
    // managing the visibility of the meal report.
    const [showMeal, setShowMeal] = useState(false);
    // storing the selected month and year.
    const [MonthYear, setMonthYear] = useState('');
    // storing the selected meals.
    const [meals, setMeals] = useState([]);
    // handling changes in the selected month and year.
    const updateMonthYear = event => {
        const monthYear = event.target.value;
        setMonthYear(monthYear);
    };
    // this function bring the report from the database.
    const getTheReport = async () => {
        try {
            // opening IndexedDB database.
            const caloriesdb = await window.idb.openCaloriesDB('caloriesdb', 1);
            const allItems = await caloriesdb.getAllItems(); 
            // filter the items based on the selected month and year.
            const filteredItems = allItems.filter(item => {
                // extract the date of the item.
                const itemDate = new Date(item.date);
                // returns if the item's date matches the selected month and year.
                return itemDate.getMonth() + 1 === parseInt(MonthYear.split('-')[1]) &&
                    itemDate.getFullYear() === parseInt(MonthYear.split('-')[0]);
            });
            // if there no meal data found for the selected month and year show an alert message.
            if (filteredItems.length === 0) {
                alert('No data found for these selected year and month.');
                return;
            }
            // showing the meals based on the selected month and year.
            const meals = filteredItems;
            setMeals(meals);
            // showing the meal report.
            setShowMeal(true);
        // catches errors in generating the report and show an alert message.   
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Error generating report:', error);
        }
    };
    
    // reset the page by hiding the meal report and resetting the selected month and year.
    const resetPage = () => {
        setShowMeal(false); 
        setMonthYear(''); 
    };
    
    return (
        <section id='report' className='py'>
            <div className='container'>
                <h2><span className='text-primary'>Calorie Consumption Report</span></h2>
                <p>
                    Generate a detailed report for a specific month and year:
                </p>
                <div className='form-group'>
                    <label>Select year and month: </label>
                    <input className='monthYear' type='month' name='monthYear' value={MonthYear} onChange={updateMonthYear} />
                </div>
                
                <button className='generate-btn' onClick={getTheReport}>{/* the button to generate the report */}Generate Report</button>
                
                {showMeal && meals && meals.length > 0 && ( 
                    <div className='report-data'>
                        <h3>Meals Report</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Calories</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meals.map(meal => (
                                    <tr key={meal.id}>
                                        <td>{meal.category}</td>
                                        <td>{meal.calories}</td>
                                        <td>{meal.description}</td>
                                        <td>{new Date(meal.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* the button to reset the page */}
                <button className='reset-btn' onClick={(e) => {e.preventDefault();resetPage(); }}>Reset</button>

            </div>
        </section>
    );
}

export default Report;

