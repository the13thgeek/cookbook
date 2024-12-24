import React, { useState, useEffect } from 'react';
import Message from '../components/Message';
import { Link, useNavigate } from 'react-router-dom';
import './Home.scss';
import RecipeGrid from '../components/RecipeGrid';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const surpriseMe = () => {
    navigate("/recipe/surprise");
  }

  useEffect(() => {
    const loadMealData = async () => {
      try {
        const [mealsByTitle, mealsByIngredient] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/search.php?s=${searchTerm}`,{ method: "POST" }),
          fetch(`${import.meta.env.VITE_API_URL}/filter.php?i=${searchTerm}`,{ method: "POST" })
        ]);
        const dataMealsTitle = await mealsByTitle.json();
        const dataMealsIngredient = await mealsByIngredient.json();

        // check both datasets and combine
        let combinedMealData = [];
        if(dataMealsTitle.meals && dataMealsTitle.meals?.length > 0) {
          combinedMealData = [...dataMealsTitle.meals]
        }
        if(dataMealsIngredient && dataMealsIngredient.meals?.length > 0) {
          combinedMealData = [...combinedMealData, ...dataMealsIngredient.meals];
        }
        setMealData(combinedMealData);
        setIsLoading(false);
      } catch(e) {
        console.error('Error: ',e.message);
        setError(e.message);
        setIsLoading(false);
      }
    };

    loadMealData();

  },[searchTerm]);

  

  return (
    <>
    <div className="structure">
      <div className="search-bar">
        <div className="search-box">
          <input type="text" className='txt-searcher' name="searcher" id="searcher" maxLength={50} placeholder='Type a meal or ingredient name' onChange={handleInputChange} />
          <input type="button" value="Surprise me!" className='btn-surprise' onClick={surpriseMe} />
        </div>
      </div>
    </div>
    <div className="structure">
      <div className="recipes">
        <h2>Recipes</h2>
        { isLoading ? (
          <Message type={'info'} message={'Loading, please wait...'} />
        ) : mealData && mealData.length > 0 ? (
          <RecipeGrid recipes={mealData} />
        ) : !error && (
          <Message type={'info'} message={`Sorry, no meals or ingredients matched '${searchTerm}.'`} />
        )}

        {error && (
          <Message type={'error'} message={error} />
        )}        
      </div>
    </div>
    <div className="structure">
      

    </div>
    </>
  )
}

export default Home