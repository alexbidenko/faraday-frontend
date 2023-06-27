<script lang="ts" setup>
const unwrap = <T extends { children?: T[] }>(
  list: T[]
): Omit<T, 'children'>[] =>
  list.reduce<Omit<T, 'children'>[]>(
    (acc, { children, ...item }) => [
      ...acc,
      item,
      ...(children ? unwrap(children) : []),
    ],
    []
  );

const route = useRoute();
const router = useRouter();

const [{ data: page, error }, { data: navigation }, { data: breadcrumbs }] =
  await Promise.all([
    useAsyncData(() =>
      queryContent<any>(route.path)
        .where({
          _extension: 'md',
        })
        .findOne()
    ),
    useAsyncData(() =>
      queryContent(
        `/${route.path.split('/').filter(Boolean).slice(0, 2).join('/')}`
      )
        .only(['_path', 'title'])
        .find()
        .then((r) => r.filter((el) => !/_dir$/.test(el._path)))
    ),
    useAsyncData(() =>
      fetchContentNavigation({ limit: 1, where: [{ _path: route.path }] }).then(
        unwrap
      )
    ),
  ]);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

if (page.value._path !== route.path) {
  await(process.client ? router.push : navigateTo)('/articles');
}
</script>

<template>
  <main class="articlesSlugPage">
    <template v-if="page">
      <header class="articlesSlugPage__header container">
        <NuxtLink to="/" class="articlesSlugPage__crumb">Главная</NuxtLink>
        <span
          v-for="item in breadcrumbs"
          :key="item._path"
          class="articlesSlugPage__crumbWrapper"
        >
          {{ NBSP }}—{{ NBSP }}
          <NuxtLink :to="item._path" class="articlesSlugPage__crumb">
            {{ item.title }}
          </NuxtLink>
        </span>
      </header>
      <h1 class="articlesSlugPage__title container">{{ page.title }}</h1>
      <div class="articlesSlugPage__grid container">
        <div class="articlesSlugPage__navigation">
          <NuxtLink
            v-for="item in navigation"
            :key="item._path"
            :to="item._path"
            class="articlesSlugPage__link"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
        <ContentRendererMarkdown
          :value="page"
          class="articlesSlugPage__content"
        />
        <p class="articlesSlugPage__additional">{{ page.additional }}</p>
      </div>
    </template>
  </main>
</template>

<style lang="scss">
.articlesSlugPage {
  padding-top: 86px;
  padding-bottom: 94px;

  &__header {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    color: #111112;
    font-size: 16px;
    line-height: 26px;
  }

  &__crumb {
    color: #111112;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }

    &.router-link-exact-active {
      color: #b76902;
      opacity: 1;
    }
  }

  &__crumbWrapper {
    display: contents;
  }

  &__title {
    color: #000;
    font-size: 64px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 48px;
    background-color: rgba(183, 105, 2, 0.2);
  }

  &__grid {
    display: grid;
    grid-template-areas: 'navigation content additional';
    grid-column-gap: 140px;
    grid-template-columns: 258px 659px 380px;
    width: fit-content;
    margin: 0 auto;

    @include mq('xxl') {
      grid-column-gap: 60px;
      grid-template-columns: 258px minmax(500px, 659px) 280px;
    }

    @include mq('xl') {
      grid-column-gap: 40px;
      grid-template-columns: 258px minmax(420px, 659px) 280px;
    }

    @include mq('lg') {
      grid-column-gap: 20px;
      grid-template-areas:
        'navigation content'
        '. additional';
      grid-template-columns: 220px 1fr;
    }
  }

  &__navigation {
    grid-area: navigation;
    border-right: 2px solid #858a8c;
    padding: 1px 0;
    height: fit-content;
  }

  &__link {
    display: flex;
    align-items: center;
    color: #111112;
    font-size: 16px;
    line-height: 26px;
    height: 44px;
    text-decoration: none;
    position: relative;

    &:not(:first-child)::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: #858a8c;
      z-index: -2;
    }

    &.router-link-exact-active {
      color: #fff;

      &::after {
        border-radius: 8px 0 0 8px;
        background: #b76902;
        content: '';
        position: absolute;
        top: -1px;
        bottom: -1px;
        left: -25px;
        right: 0;
        z-index: -1;
      }
    }
  }

  &__content {
    grid-area: content;
  }

  &__additional {
    color: #111112;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    grid-area: additional;
  }
}
</style>
