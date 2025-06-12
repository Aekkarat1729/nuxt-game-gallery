export const useGames = async () => {
  const config = useRuntimeConfig();
  const { data, error } = await useFetch(`${config.public.apiBase}/games`);

  if (error.value) {
    console.error('Failed to load games', error.value);
  }

  return data;
};
