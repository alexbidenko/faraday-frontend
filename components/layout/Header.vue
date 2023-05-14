<script lang="ts" setup>
const route = useRoute();

const isActive = ref(route.path !== '/');

const checkActivity = () => {
  isActive.value = route.path !== '/' || window.scrollY > (window.innerHeight - 80);
};

watch(() => route.path, () => {
  checkActivity();
});

onMounted(() => {
  checkActivity();

  window.addEventListener('resize', checkActivity);
  window.addEventListener('scroll', checkActivity);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkActivity);
  window.removeEventListener('scroll', checkActivity);
});
</script>

<template>
  <header class="layoutHeader container" :class="{layoutHeader_active: isActive}">
    <NuxtLink to="/">
      <BaseLogo class="layoutHeader__logo" />
    </NuxtLink>

    <div class="layoutHeader__links">
      <NuxtLink href="/#about" class="layoutHeader__link">
        О нас
      </NuxtLink>
      <NuxtLink href="/#steel" class="layoutHeader__link">
        Сталь HARDOX
      </NuxtLink>
      <NuxtLink href="/#services" class="layoutHeader__link">
        Услуги
      </NuxtLink>
      <NuxtLink href="/#articles" class="layoutHeader__link">
        Статьи
      </NuxtLink>
    </div>

    <div class="layoutHeader__actions">
      <a href="tel:+79112771967" class="layoutHeader__link">
        +7 911 277-19-67
      </a>
      <NuxtLink to="/#request">
        <BaseButton>
          Узнать
        </BaseButton>
      </NuxtLink>
    </div>
  </header>
</template>

<style lang="scss">
.layoutHeader {
  position: fixed;
  width: 100%;
  z-index: 10;
  padding-top: 32px;
  padding-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, padding-top 0.3s ease;

  &_active {
    background-color: #B76902;
    padding-top: 6px;
  }

  &__logo {
    width: 96px;
    height: 96px;
  }

  &__link {
    font-size: 24px;
    line-height: 34px;
    color: #FFFFFF;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 48px;
  }

  &__actions {
    display: flex;
    gap: 24px;
    align-items: center;
  }
}
</style>
