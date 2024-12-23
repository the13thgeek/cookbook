import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MealDisplay from '../components/MealDisplay';
import Message from '../components/Message';

const Recipe = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMealInfo = async () => {
      try {
        const responseMealInfo = await fetch(`${import.meta.env.VITE_API_URL}/lookup.php?i=${id}`,{ method: "POST" });
        const mealInfo = await responseMealInfo.json();
        // get first item only
        setMeal(mealInfo.meals[0]);
        setIsLoading(false);
      } catch(e) {
        console.error('Error: ',e.message);
        setError(e.message);
        setIsLoading(false);
      }

    };

    loadMealInfo();

  },[id]);

  return (
    <div className='structure'>
      { isLoading ? (
        <p>Loading...</p>
      ) : !error ? (
        <MealDisplay mealData={meal} /> 
      ) : (
        <Message type={'error'} message={error} />
      )}
    </div>
  )
}

export default Recipe