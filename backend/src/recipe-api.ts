export const searchRecipes = async (searchTerm: string, page: number) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API key not found in environment variables.");
  }

  const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
  const url = new URL(baseURL);

  const pageSize = 10; // Number of recipes per page

  const queryParams = {
    apiKey: apiKey,
    query: searchTerm,
    number: pageSize.toString(), // Requests 10 items per page
    offset: String((page - 1) * pageSize), // Offsets results for pagination
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