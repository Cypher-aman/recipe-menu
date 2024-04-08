import axios from 'axios';
import { apiCallWrapper } from '../utils/apiCallWrapper';

const BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const spoonacularApi = axios.create({
  baseURL: BASE_URL,
});

export async function getRandomRecipe() {
  return apiCallWrapper(async () => {
    const response = await spoonacularApi.get('/random', {
      params: {
        number: 20,
        apiKey: API_KEY,
      },
    });
    return response.data;
  });
}

export async function getSearchResults(query: string) {
  return apiCallWrapper(async () => {
    const response = await spoonacularApi.get('/search', {
      params: {
        query,
        apiKey: API_KEY,
      },
    });
    return response.data;
  });
}

export async function getRecipeById(id: string) {
  return apiCallWrapper(async () => {
    const response = await spoonacularApi.get(`/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  });
}

export async function getRecipeBySearch(query: string) {
  return apiCallWrapper(async () => {
    const response = await spoonacularApi.get('/complexSearch', {
      params: {
        query,
        apiKey: API_KEY,
      },
    });
    return response.data;
  });
}

export async function getRecipeByIngredient(ingredient: string) {
  return apiCallWrapper(async () => {
    const response = await spoonacularApi.get('/findByIngredients', {
      params: {
        ingredients: ingredient,
        apiKey: API_KEY,
      },
    });
    return response.data;
  });
}

export default spoonacularApi;
