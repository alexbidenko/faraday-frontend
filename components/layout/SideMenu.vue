<script lang="ts" setup>
const MODAL_KEY = 'side-menu';

const modalStore = useModalStore();
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    modalStore.closeModal(MODAL_KEY);
  }
);

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
      <div class="layoutSideMenu__grid">
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
          <NuxtLink href="/articles" class="layoutSideMenu__link">
            Статьи
          </NuxtLink>
        </div>
        <div class="layoutSideMenu__column">
          <NuxtLink to="/articles" class="layoutSideMenu__link">
            Статьи
          </NuxtLink>
          <NuxtLink to="/articles/hardox" class="layoutSideMenu__link">
            О HARDOX
          </NuxtLink>
          <NuxtLink to="/articles/steel/09g2s" class="layoutSideMenu__link">
            Марки стали
          </NuxtLink>
          <NuxtLink
            to="/articles/services/laser-cutting"
            class="layoutSideMenu__link"
          >
            Все услуги
          </NuxtLink>
        </div>
      </div>

      <div class="layoutSideMenu__additional">
        <a :href="`tel:${CONSTANTS.phone}`" class="layoutSideMenu__subLink">
          {{ CONSTANTS.formattedPhone }}
        </a>
      </div>
    </div>
  </BaseSidebar>
</template>

<style lang="scss">
.layoutSideMenu {
  width: 720px;
  max-width: 100%;
  background: #121212;

  @include mq('sm') {
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

    @include mq('md') {
      display: block;
    }
  }

  &__content {
    padding: 94px 60px 48px;
    height: 100%;
    display: flex;
    flex-direction: column;

    @include mq('sm') {
      padding: 32px 16px;
    }
  }

  &__grid {
    display: flex;
    gap: 34px;

    @include mq('sm') {
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

    @include mq('sm') {
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
    color: #ffffff;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }

    @include mq('sm') {
      font-size: 30px;
      line-height: 38px;
    }
  }

  &__additional {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
  }

  &__subLink {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #ffffff;
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
