import React, { useState, useEffect } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import Message from '../components/Message';

const Favorites = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  // useEffect(() => {
  //   const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  //   setFavorites(savedFavorites);
  // },[favorites]);
 

  return (
    <div className='structure'>
      <div className="recipes">
        <h2>Favorite Recipes</h2>
        { favorites && favorites.length > 0 ? (
          <RecipeGrid recipes={favorites} />
        ) : (
          <Message type={'info'} message={'There are no recipes currently marked as Favorite.'} />
        )}
      </div>
      


    </div>
  )
}

export default Favorites