import {defineStore} from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const modalKeys = ref<Record<string, string>>({});

  const openModal = (key: string) => {
    if (process.client) {
      modalKeys.value[key] = key;
      document.body.classList.add('overflow-hidden');
    }
  };

  const closeModal = (key: string) => {
    delete modalKeys.value[key];
    if (!Object.keys(modalKeys.value).length && process.client) document.body.classList.remove('overflow-hidden');
  };

  const toggleModal = (key: string, value = !modalKeys.value[key]) => {
    if (value) openModal(key);
    else closeModal(key);
  };

  return {
    modalKeys,
    openModal,
    closeModal,
    toggleModal,
  };
});
