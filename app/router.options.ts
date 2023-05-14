import type {RouterOptions} from '@nuxt/schema';

export default <RouterOptions> {
  scrollBehavior: async (to, from, savedPosition) => {
    if (savedPosition) return savedPosition;

    const findElement = async (hash: string, x = 0): Promise<HTMLElement | null> => (
      document.querySelector<HTMLElement>(hash) ||
      new Promise((resolve) => {
        if (x > 0) return resolve(document.querySelector<HTMLElement>('#__nuxt'));

        setTimeout(() => {
          resolve(findElement(hash, 1));
        }, 1000);
      })
    );

    if (to.hash) {
      const el = await findElement(to.hash);

      if (el) return {top: el.offsetTop, behavior: 'smooth'};
    }

    return {top: 0, behavior: 'smooth'};
  },
};
