export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = "http://localhost:5000/api/recipes/search";
  const url = `${baseUrl}?searchTerm=${encodeURIComponent(searchTerm)}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

export const getRecipeSummary = ({ recipeId }: { recipeId: string }) => async () => {
  const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return response.json();
};