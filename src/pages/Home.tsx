import {
  getRandomRecipe,
  getRecipeByIngredient,
  getRecipeBySearch,
} from '../api/spoonacularApi';
import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonError from '../components/Error/CommonError';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [searchBy, setSearchBy] = useState<string>('dishType');
  const [searchQuery, setSearchQuery] = useState<string>('');

  window.localStorage.setItem('recipes_last_visited', 'home');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    getRandomRecipe()
      .then((response) => {
        console.log('response-random', response);
        setData(response.recipes);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery) return;
    const timer = setTimeout(() => {
      setIsLoading(true);
      if (searchBy === 'ingredients') {
        getRecipeByIngredient(searchQuery)
          .then((response) => {
            console.log('response-ingredient', response);
            setData(response);
          })
          .catch((error) => {
            setError(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        getRecipeBySearch(searchQuery)
          .then((response) => {
            console.log('response-search', response);
            setData(response.results);
          })
          .catch((error) => {
            setError(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchBy, searchQuery]);

  return (
    <main className="">
      <div className="h-[300px] px-2 bg-slate-900 relative flex justify-center items-center flex-col">
        <Link
          to="/favorites"
          className="text-white absolute font-mono top-5 right-5"
        >
          My Favorites
        </Link>
        <div className="flex gap-4 w-full justify-center sm:flex-row flex-col items-center">
          <input
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-[500px] px-2 py-3 rounded focus:outline-blue-800 focus:border-none "
            type="text"
            name=""
            id=""
          />
          <select
            value={searchBy}
            defaultValue="dishType"
            onChange={handleFilterChange}
            className="px-2 rounded py-3 w-[150px]"
          >
            <option value="ingredients">Ingredients</option>
            <option selected={true} value="dishType">
              Dish Type
            </option>
          </select>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <div>
          <CommonError message={error.message} />
        </div>
      )}
      {!error && !isLoading && data && (
        <section className="flex flex-col px-2 gap-8 py-8 items-center">
          {data.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      )}
      {!error && !isLoading && !data && <p>No data</p>}
    </main>
  );
};

export default Home;
