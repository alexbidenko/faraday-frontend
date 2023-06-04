<script lang="ts" setup>
const MODAL_KEY = 'side-menu';

const modalStore = useModalStore();
const route = useRoute();

watch(() => route.fullPath, () => {
  modalStore.closeModal(MODAL_KEY);
});

const onGlobalClick = () => {
  if (modalStore.modalKeys[MODAL_KEY]) {
    modalStore.closeModal(MODAL_KEY);
  }
};

const onClickMenuButton = () => {
  if (modalStore.modalKeys[MODAL_KEY]) modalStore.closeModal(MODAL_KEY);
  else modalStore.openModal(MODAL_KEY);
};

onMounted(() => {
  window.addEventListener('click', onGlobalClick);
});

onBeforeUnmount(() => {
  modalStore.closeModal(MODAL_KEY);
  window.removeEventListener('click', onGlobalClick);
});
</script>

<template>
  <BaseModalButton
    @click.stop="onClickMenuButton"
    :burger="!modalStore.modalKeys[MODAL_KEY]"
    dark
    class="layoutSideMenu__openButton"
    aria-label="Открыть навигационное меню"
  />

  <BaseSidebar
    @update:visible="modalStore.toggleModal(MODAL_KEY, $event)"
    :visible="!!modalStore.modalKeys[MODAL_KEY]"
    full-height
    tag="nav"
    class="layoutSideMenu"
  >
    <div class="layoutSideMenu__content">
      <div class="layoutSideMenu__column">
        <NuxtLink href="/#about" class="layoutSideMenu__link">
          О нас
        </NuxtLink>
        <NuxtLink href="/#steel" class="layoutSideMenu__link">
          Сталь HARDOX
        </NuxtLink>
        <NuxtLink href="/#services" class="layoutSideMenu__link">
          Услуги
        </NuxtLink>
        <NuxtLink href="/#articles" class="layoutSideMenu__link">
          Статьи
        </NuxtLink>
      </div>
      <div class="layoutSideMenu__column">
        <NuxtLink to="/" class="layoutSideMenu__link">
          Главная
        </NuxtLink>
        <NuxtLink to="/about" class="layoutSideMenu__link">
          О бренде
        </NuxtLink>
        <NuxtLink to="/contacts" class="layoutSideMenu__link">
          Контакты
        </NuxtLink>
        <NuxtLink to="/faq" class="layoutSideMenu__link">
          FAQ
        </NuxtLink>
        <NuxtLink to="/delivery-and-payment" class="layoutSideMenu__link">
          Доставка и оплата
        </NuxtLink>

        <div class="layoutSideMenu__additional">
          <button class="layoutSideMenu__subLink">
            Аккаунт
          </button>
        </div>
      </div>
    </div>
  </BaseSidebar>
</template>

<style lang="scss">
.layoutSideMenu {
  width: 720px;
  max-width: 100%;
  background: #121212;

  @include mq("sm") {
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  &__openButton {
    top: 4px;
    right: 6px;
    position: fixed;
    display: none;

    @include mq("md") {
      display: block;
    }
  }

  &__content {
    padding: 94px 60px 48px;
    display: flex;
    gap: 34px;
    height: 100%;

    @include mq("sm") {
      padding: 32px 16px;
      flex-direction: column;
      gap: 52px;
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 14px;

    &:nth-child(1) {
      width: 301px;
    }

    @include mq("sm") {
      gap: 10px;

      &:nth-child(1) {
        margin-top: 34px;
        width: initial;
      }
    }
  }

  &__link {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: 0.2px;
    color: #FFFFFF;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }

    @include mq("sm") {
      font-size: 30px;
      line-height: 38px;
    }
  }

  &__additional {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;

    @include mq("sm") {
      margin-top: 42px;
    }
  }

  &__subLink  {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #FFFFFF;
    transition: opacity 0.3s ease;
    background: none;
    padding: 0;
    border: none;
    text-align: start;
    cursor: pointer;
    width: fit-content;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
