import axios from 'axios';

export async function apiCallWrapper(
  apiFunction: () => Promise<any>
): Promise<any> {
  try {
    const response = await apiFunction();

    return response; // Return data on success
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      } else {
        // Handle other Axios errors
        throw error;
      }
    } else {
      // Handle non-Axios errors
      throw error;
    }
  }
}
