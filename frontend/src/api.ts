const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = "http://localhost:5000/api/recipe/search";
  const url = `${baseUrl}?searchTerm=${encodeURIComponent(searchTerm)}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

export { searchRecipes };