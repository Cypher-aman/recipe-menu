// import { parseInstructions } from '../utils/parseApiResponse';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }: { recipe: any }) => {
  return (
    <div className="w-full sm:py-0 py-4 max-w-[800px] sm:h-[300px] flex flex-col sm:flex-row gap-3 border  shadow-md ">
      <div className="w-full sm:w-1/2 h-full ">
        <img
          className="object-none w-full h-full"
          src={recipe.image}
          alt={recipe.title}
        />
      </div>
      <div className="flex flex-col w-full sm:w-1/2 sm:px-0 px-4 justify-center">
        <p
          className={`text-gray-600 uppercase mb-3 ${
            recipe.vegetarian ? 'text-green-300' : 'text-red-300'
          } `}
        >
          {recipe.vegetarian ? 'Vegetarian' : 'Non Vegetarian'}
        </p>
        <h3 className="uppercase text-2xl font-mono text-[#333]">
          {recipe.title}
        </h3>
        <div className="flex mt-3">
          <div className="pr-4 border-r">
            <p className="font-semibold">{recipe.servings}</p>
            <p className="text-gray-500">Servings</p>
          </div>{' '}
          <div className="pr-4 pl-4 border-r">
            <p className="font-semibold ">{recipe.readyInMinutes}</p>
            <p className="text-gray-500">Duration</p>
          </div>{' '}
          <div className="pr-4 pl-4">
            <p className="font-semibold">{recipe.healthScore}</p>
            <p className="text-gray-500">Health Score</p>
          </div>
        </div>
        <Link className="mt-8 w-fit" to={`/recipe/${recipe.id}`}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
            View recipe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
