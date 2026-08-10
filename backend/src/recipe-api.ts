const apiKey = process.env.API_KEY!;

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw new Error("API key not found in environment variables.");
  }

  const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
  const url = new URL(baseURL);

  const pageSize = 10;

  const queryParams = {
    apiKey: apiKey,
    query: searchTerm,
    number: pageSize.toString(),
    offset: String((page - 1) * pageSize),
  };

  url.search = new URLSearchParams(queryParams).toString();

  const searchResponse = await fetch(url.toString());

  if (!searchResponse.ok) {
    const errorText = await searchResponse.text();
    throw new Error(
      `Spoonacular API error (${searchResponse.status}): ${errorText}`
    );
  }

  const resultsJson = await searchResponse.json();
  return resultsJson;
};

export const getRecipeSummary = async (recipeId: number) => {
  if (!apiKey) {
    throw new Error("API key not found in environment variables.");
  }

  const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
  url.search = new URLSearchParams({ apiKey: apiKey }).toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Spoonacular API error (${response.status}): ${errorText}`
    );
  }

  return await response.json();
};