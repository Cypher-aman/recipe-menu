import { useParams } from 'react-router-dom';
import { useApiCall } from '../hooks/useApiCall';
import { getRecipeById } from '../api/spoonacularApi';
import CommonError from '../components/Error/CommonError';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { removeItem, setItem, hasItem } from '../utils/localStorageHelper';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Recipe = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  const lastVisited = window.localStorage.getItem('recipes_last_visited');

  const checkIsSaved = () => {
    if (hasItem(id as string)) {
      setIsSaved(true);
    }
  };
  useEffect(() => {
    checkIsSaved();
  }, []);

  console.log('isSaved', isSaved);

  const handleSave = (recipe: any) => {
    if (isSaved) {
      removeItem(id as string);
      setIsSaved(false);
      toast.success('Recipe removed from favorites');
    } else {
      setItem(id as string, recipe);
      setIsSaved(true);
      toast.success('Recipe added to favorites');
    }
  };

  const { data, isLoading, error } = useApiCall(
    () => {
      return getRecipeById(id as string);
    },
    null,
    [id as string]
  );

  console.log(data);
  console.log('rerendering recipe');

  return (
    <main>
      {isLoading && (
        <div className="w-screen h-screen flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      {error && <CommonError message={error.message} />}
      {!error && !isLoading && data && (
        <div className="w-full max-w-[700px] container px-2 py-6  ">
          <div className="text-gray-600 mb-10">
            <a href={lastVisited === 'favorites' ? '/favorites' : '/'}>
              <span className="font-bold">
                {lastVisited === 'favorites' ? 'Favorites' : 'Home'}
              </span>
            </a>{' '}
            &gt; <span>{data.title}</span>
          </div>
          <div className="w-full h-fit ">
            <img
              className="object-cover w-full h-[250px]"
              src={data.image}
              alt={data.title}
            />
            <div className="">
              <button
                onClick={() => handleSave(data)}
                className="text-2xl py-3"
              >
                {isSaved ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-mono">{data.title}</h1>
            <div className="rounded bg-blue-100 px-3 py-5">
              <p className="font-semibold mb-4 text-blue-900">Details</p>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Servings:</span>{' '}
                  <span className="text-gray-900">{data.servings} minutes</span>
                </li>
                <li>
                  <span className="font-semibold">Ready in:</span>{' '}
                  <span className="text-gray-900">
                    {data.readyInMinutes} minutes
                  </span>
                </li>
                <li>
                  <span className="font-semibold">Health Score:</span>{' '}
                  <span className="text-gray-900">{data.healthScore}</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-xl font-mono mb-2">
                Ingredients{' '}
              </p>
              <ul className="space-y-2">
                {data.extendedIngredients?.map((ingredient: any, i: number) => (
                  <li key={i}>
                    <span className="w-[8px] mr-2 inline-block h-[8px] bg-blue-900 rounded-full"></span>
                    <span className="text-gray-600">{ingredient.original}</span>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <p className="font-semibold text-xl font-mono mb-2 mt-5">
                Instructions{' '}
              </p>
              <ul className="space-y-2">
                {data.analyzedInstructions?.[0].steps?.map(
                  (step: any, i: number) => (
                    <li key={i}>
                      <span className=" mr-2 inline-block text-lg font-medium  text-blue-900 rounded-full">
                        {step.number}.
                      </span>
                      <span className="text-gray-600">{step.step}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <hr />
            <div>
              <p className="font-semibold text-xl font-mono mb-2 mt-5">
                Summary{' '}
              </p>
              <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: data.summary }}
              ></p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
//In a food processor, place all ingredients except the water and pulse until mixture is coarsely chopped.

export default Recipe;
