import RecipeCard from '../components/RecipeCard';
import { getItems } from '../utils/localStorageHelper';
import { IoMdHome } from 'react-icons/io';

const Favorites = () => {
  const items = Object.values(getItems());
  window.localStorage.setItem('recipes_last_visited', 'favorites');

  return (
    <div className="container px-2 py-4 md:py-10 mx-auto max-w-[800px]">
      <a
        href="/"
        className="w-fit flex items-center gap-1 font-mono  rounded p-2 border"
      >
        <IoMdHome className="" /> Home
      </a>
      <h1 className="text-3xl font-mono text-center font-semibold">
        Favorites
      </h1>
      <div className="py-10 flex flex-col gap-4 items-center">
        {items === null && <p>No items in favorites</p>}
        {items?.length === 0 && <p>No items in favorites</p>}
        {items?.map((item: any) => (
          <RecipeCard key={item.id} recipe={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
