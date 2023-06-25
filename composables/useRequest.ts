export default () => {
  const { $csrfFetch } = useNuxtApp();
  return $csrfFetch as typeof $fetch;
};
