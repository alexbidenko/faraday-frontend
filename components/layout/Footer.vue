<script lang="ts" setup>
const [
  { data: hardoxArticles },
  { data: steelArticles },
  { data: serviceArticles },
] = await Promise.all([
  useAsyncData('/hardox-articles/navigation', () =>
    queryContent('/articles/hardox')
      .only(['_path', 'title'])
      .find()
      .then((r) => r.slice(1))
  ),
  useAsyncData('/steel-articles/navigation', () =>
    queryContent('/articles/steel').only(['_path', 'title']).find()
  ),
  useAsyncData('/service-articles/navigation', () =>
    queryContent('/articles/services').only(['_path', 'title']).find()
  ),
]);
</script>

<template>
  <footer class="layoutFooter container">
    <div>
      <BaseLogo class="layoutFooter__logo" />
      <h3 class="layoutFooter__name">Фарадей металл</h3>
      <span class="layoutFooter__slogan">Стоп износ</span>
    </div>

    <div>
      <h4 class="layoutFooter__title">Навигация</h4>
      <NuxtLink to="/#about" class="layoutFooter__link">О нас</NuxtLink>
      <NuxtLink to="/#advantages" class="layoutFooter__link">
        Преимущества
      </NuxtLink>
      <NuxtLink to="/#services" class="layoutFooter__link">Услуги</NuxtLink>
      <NuxtLink to="/articles/hardox" class="layoutFooter__link">
        Виды Стали HARDOX
      </NuxtLink>
      <NuxtLink to="/#request" class="layoutFooter__link">
        Оставить заявку
      </NuxtLink>
    </div>

    <div>
      <h4 class="layoutFooter__title">Информация</h4>
      <NuxtLink to="/articles" class="layoutFooter__link">Статьи</NuxtLink>
      <NuxtLink to="/articles/hardox" class="layoutFooter__link">
        О HARDOX
      </NuxtLink>
    </div>

    <div>
      <h4 class="layoutFooter__title">Марки стали</h4>
      <NuxtLink
        v-for="item in hardoxArticles"
        :key="item._path"
        :to="item._path"
        class="layoutFooter__link"
      >
        {{ item.title }}
      </NuxtLink>
      <div class="layoutFooter__group">
        <NuxtLink
          v-for="item in steelArticles"
          :key="item._path"
          :to="item._path"
          class="layoutFooter__link"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
    </div>

    <div>
      <h4 class="layoutFooter__title">Услуги</h4>
      <NuxtLink
        v-for="item in serviceArticles"
        :key="item._path"
        :to="item._path"
        class="layoutFooter__link"
      >
        {{ item.title }}
      </NuxtLink>
      <div class="layoutFooter__group">
        <NuxtLink to="/#request" class="layoutFooter__link">
          Индивидуальный заказ
        </NuxtLink>
        <NuxtLink to="/" class="layoutFooter__link">Доставка</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.layoutFooter {
  background-color: #b76902;
  padding-top: 106px;
  padding-bottom: 72px;
  display: grid;
  grid-template-columns: 3fr repeat(4, 2fr) 1fr;
  gap: var(--grid-gap);

  @include mq('xl') {
    grid-template-columns: 4fr repeat(4, 2fr);
  }

  &__logo {
    width: 96px;
  }

  &__name {
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    margin-top: 40px;
    margin-bottom: 24px;
  }

  &__slogan {
    color: #fff;
    font-size: 24px;
    line-height: 34px;
  }

  &__title {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    margin-top: 0;
    margin-bottom: 32px;
  }

  &__link {
    color: #fff;
    font-size: 16px;
    line-height: 26px;
    display: block;
    width: fit-content;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }

    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }

  &__group {
    margin-top: 64px;
  }
}
</style>
