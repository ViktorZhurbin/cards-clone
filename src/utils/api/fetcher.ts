export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(endpoint, options);
  return response.json();
};
