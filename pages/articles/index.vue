<script lang="ts" setup>
type ArticleType = {
  _path: string;
  image: string;
  listTitle: string;
  description: string;
};

const { data: articles } = await useAsyncData<ArticleType[]>('articles', () =>
  queryContent<ArticleType>()
    .where({ shown: true })
    .only([
      '_path',
      'listTitle',
      'description',
      'image',
    ] as unknown as keyof ArticleType)
    .find()
);
</script>

<template>
  <main class="articlesPage container">
    <h1 class="articlesPage__title">Статьи</h1>

    <div v-if="articles" class="articlesPage__grid">
      <div
        v-for="item in articles"
        :key="item._path"
        class="articlesPage__card"
      >
        <div class="articlesPage__cardHeader">
          <NuxtImg
            :src="item.image"
            format="webp"
            :alt="item.listTitle"
            class="articlesPage__cardImage"
          />
          <h2 class="articlesPage__cardTitle">{{ item.listTitle }}</h2>
        </div>
        <p class="articlesPage__cardContent">
          {{ item.description }}
        </p>
        <NuxtLink :to="item._path" class="articlesPage__cardAction">
          <BaseButton link>Подробнее</BaseButton>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.articlesPage {
  padding-top: 86px;
  max-width: 1600px;
  margin: 0 auto;

  &__title {
    color: #111112;
    font-size: 64px;
    font-weight: 700;
    margin-top: 12px;
    margin-bottom: 86px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    @include mq('md') {
      grid-template-columns: 1fr 1fr;
    }

    @include mq('sm') {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__cardHeader {
    position: relative;
    aspect-ratio: 380 / 333;
  }

  &__cardImage {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__cardTitle {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    margin: 0;
    color: #f2f2f2;
    font-size: 32px;
    font-weight: 700;
    background: rgba(66, 63, 63, 0.6);
    padding: 32px 24px;
    backdrop-filter: blur(20px);
  }

  &__cardContent {
    color: #111112;
    font-size: 18px;
    line-height: 28px;
    margin: 0;
    padding-bottom: 32px;
    border-bottom: 1px solid #858a8c;
  }

  &__cardAction {
    margin-left: auto;
  }
}
</style>
