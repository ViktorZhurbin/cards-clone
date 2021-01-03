export const fetcher = async (enddpoint: string) => {
  const response = await fetch(enddpoint);
  return response.json();
};
