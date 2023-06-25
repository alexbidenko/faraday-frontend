<script lang="ts" setup>
const route = useRoute();

const isActive = ref(route.path !== '/');
const isStatic = ref(route.path !== '/');

const checkActivity = () => {
  isActive.value =
    route.path !== '/' || window.scrollY > window.innerHeight - 80;
};

const checkStatic = () => {
  isStatic.value = route.path !== '/';
};

watch(
  () => route.path,
  () => {
    checkActivity();
    checkStatic();
  }
);

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
  <header
    class="layoutHeader container"
    :class="{ layoutHeader_active: isActive, layoutHeader_static: isStatic }"
  >
    <NuxtLink to="/">
      <BaseLogo class="layoutHeader__logo" />
    </NuxtLink>

    <div class="layoutHeader__links">
      <NuxtLink href="/#about" class="layoutHeader__link"> О нас </NuxtLink>
      <NuxtLink href="/articles/hardox" class="layoutHeader__link">
        Сталь HARDOX
      </NuxtLink>
      <NuxtLink href="/#services" class="layoutHeader__link"> Услуги </NuxtLink>
      <NuxtLink href="/articles" class="layoutHeader__link"> Статьи </NuxtLink>
    </div>

    <div class="layoutHeader__actions">
      <a :href="`tel:${CONSTANTS.phone}`" class="layoutHeader__link">
        {{ CONSTANTS.formattedPhone }}
      </a>
      <NuxtLink to="/#request">
        <BaseButton> Узнать </BaseButton>
      </NuxtLink>
    </div>
  </header>

  <LayoutSideMenu />
</template>

<style lang="scss" scoped>
.layoutHeader {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  padding-top: 32px;
  padding-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, padding-top 0.3s ease;

  &_active {
    background-color: #b76902;
    padding-top: 6px;
  }

  &_static {
    position: static;
  }

  @include mq('xl') {
    padding-top: 24px;
    padding-bottom: 4px;

    &_active {
      padding-top: 4px;
    }
  }

  @include mq('lg') {
    padding-top: 22px;

    &_active {
      padding-top: 4px;
    }
  }

  &__logo {
    width: 96px;
    height: 96px;

    @include mq('lg') {
      width: 64px;
      height: 64px;
    }
  }

  &__link {
    font-size: 24px;
    line-height: 34px;
    color: #ffffff;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }

    @include mq('xxl') {
      font-size: 16px;
      line-height: 26px;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 48px;

    @include mq('xl') {
      gap: 34px;
    }

    @include mq('lg') {
      display: none;
    }
  }

  &__actions {
    display: flex;
    gap: 24px;
    align-items: center;

    @include mq('xl') {
      gap: 32px;
    }

    @include mq('md') {
      display: none;
    }
  }
}
</style>
