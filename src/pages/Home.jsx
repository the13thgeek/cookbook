import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage , setCurrentPage] = useState(1);
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
        setCurrentPage(1);
      } catch(e) {
        console.error('Error: ',e);
        setIsLoading(false);
      }
    };

    loadMealData();

  },[searchTerm]);

  // pagination stuff
  const totalPages = Math.ceil(mealData.length / import.meta.env.VITE_PAGE_SIZE);
  const currentPageData = mealData.slice( (currentPage - 1) * import.meta.env.VITE_PAGE_SIZE, currentPage * import.meta.env.VITE_PAGE_SIZE );

  const changePage = (page) => {
    if(page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="structure">
      <div className="search-bar">
        <div className="search-box">
          <input type="text" className='txt-searcher' name="searcher" id="searcher" maxLength={50} placeholder='Type a meal or ingredient name' onChange={handleInputChange} />
          <input type="button" value="Surprise me!" className='btn-surprise' onClick={surpriseMe} />
        </div>
      </div>
      <div className="recipes-grid">
        { isLoading ? (
            <p>Loading...</p>
        ) : currentPageData && currentPageData.length > 0 ? (
          currentPageData.map((meal, idx) => (
            <Link to={'/recipe/'+meal.idMeal} style={{ backgroundImage: `url(${meal.strMealThumb}/preview)` }} className='item' key={idx}>
              <div className="shader"></div>
              <div className="contents">
                <h3>{meal.strMeal}</h3>
              </div>
              {/* <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strInstructions}</p>
              <p>{meal.strYoutube}</p>
              <p>{meal.strSource}</p> */}
            </Link>
          ))
        ) : (
          <p>No meals matched.</p>
        )}        
      </div>
      <div className="pagination">
        <button onClick={() => changePage(currentPage-1)} disabled={currentPage <= 1}>&lt; Prev</button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button key={idx} onClick={() => changePage(idx+1)} disabled={currentPage === idx+1}>{idx+1}</button>
        ))}
        <button onClick={() => changePage(currentPage+1)} disabled={currentPage >= totalPages}>Next &gt;</button>
      </div>
      
    </div>
  )
}

export default Home