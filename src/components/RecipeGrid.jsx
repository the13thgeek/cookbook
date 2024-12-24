import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeGrid.scss';

const RecipeGrid = ({ recipes = null }) => {
  if (!recipes) return null;
  const [currentPage , setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  // pagination stuff
  const totalPages = Math.ceil(recipes.length / import.meta.env.VITE_PAGE_SIZE);
  const currentPageData = recipes.slice( (currentPage - 1) * import.meta.env.VITE_PAGE_SIZE, currentPage * import.meta.env.VITE_PAGE_SIZE );

  const changePage = (page) => {
    if(page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleFavorite = (mealId,mealName,mealThumb) => {
    let newFavorite = {
      idMeal: mealId,
      strMeal: mealName,
      strMealThumb: mealThumb
    }
    setFavorites((prevFavorites) => {
      const meal_exists = prevFavorites.some((meal) => meal.idMeal == mealId);
      if(meal_exists) {
        // toggle remove
        return prevFavorites.filter((item) => item.idMeal !== mealId);
      } else {
        // add to list
        return [...prevFavorites, newFavorite];
      }
    });
  };

  const isFavorite = (mealId) => {
    return favorites.some((item) => item.idMeal === mealId);
  };

  useEffect(() => {
    setCurrentPage(1); // reset every time the search result changes
  },[recipes]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },[favorites]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  },[]);

  return (
    <>
    <div className="recipes-grid">
      { currentPageData.map((meal, idx) => (
        <div className="meal-item" key={idx}>
          <Link to={'/recipe/'+meal.idMeal} title={meal.strMeal}>
            <div className="preview" style={{ backgroundImage: `url(${meal.strMealThumb}/preview)` }}>
              {isFavorite(meal.idMeal) && (
                <div className="favorite">Favorite!</div>
              )}
            </div>
          </Link>
          <div className="contents">
            <h3>{meal.strMeal}</h3>
            {!isFavorite(meal.idMeal) ? (
              <button className='favorite off' onClick={() => toggleFavorite(meal.idMeal,meal.strMeal,meal.strMealThumb)}>Favorite</button>
            ) : (
              <button className='favorite' onClick={() => toggleFavorite(meal.idMeal,meal.strMeal,meal.strMealThumb)}>Remove</button>
            )}
          </div>
          
        </div>
      ))}
    </div>
    <div className="pagination">
      <button className='prevnext' onClick={() => changePage(currentPage-1)} disabled={currentPage <= 1}>&lt; Prev</button>
      {Array.from({ length: totalPages }, (_, idx) => (
        <button className='pagenum' key={idx} onClick={() => changePage(idx+1)} disabled={currentPage === idx+1}>{idx+1}</button>
      ))}
      <button className='prevnext' onClick={() => changePage(currentPage+1)} disabled={currentPage >= totalPages}>Next &gt;</button>
    </div>
    </>
  )
}

export default RecipeGrid