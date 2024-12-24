import React from 'react';
import { formatHTML } from '../utils/Common';
import YouTubeEmbed from './YouTubeEmbed';
import './MealDisplay.scss';

const MealDisplay = ({ mealData = null }) => {
  // don't render if mealData is not provided
  if (!mealData) return null;

  return (
    <div className='meal-info'>
      <div className="overview">
        <div className="recipe-image">
          <img src={mealData.strMealThumb} alt={mealData.strMeal} />
        </div>
        <div className="recipe-heading">
          <h1>{mealData.strMeal}</h1>
          <div className="sub-heading">
            <span className="category">{mealData.strCategory}</span>
            <span className="area">{mealData.strArea}</span>
          </div>
          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
            { Array.from({ length: 20 }, (_, i) => mealData[`strIngredient${i + 1}`])
                .filter(Boolean)
                .map((ingredient, index) => (
            <li key={index}>{ingredient} <span className="measure">({mealData[`strMeasure${index+1}`].trim()})</span></li>
          ))}
            </ul>
          </div>
          {mealData.strSource && (
            <a href={mealData.strSource} target='_blank' className="source">Recipe Source &gt;</a>
          )}
        </div>        
      </div>
      <div className="recipe-body">
        <h3>Instructions</h3>
        <div className="instructions" dangerouslySetInnerHTML={{ __html: formatHTML(mealData.strInstructions) }} />
        { mealData.strYoutube && (
          <>
          <h3>Recipe Video</h3>
          <YouTubeEmbed url={mealData.strYoutube} />
          </>
        )}
        <a className='return' href='/'>&lt; Back to Recipes</a>
      </div>
            
      {/* <pre>
        {JSON.stringify(mealData, null, 2)}
      </pre> */}
    </div>
  )
}

export default MealDisplay