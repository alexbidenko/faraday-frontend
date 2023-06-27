<script lang="ts" setup>
import ogImage from '~/assets/images/og_image.png';

const DESCRIPTION =
  'Компания Фарадей работает со шведской сталью Hardox. А так же со сталью российских производителей. Специализируемся на продаже стали и изготовление деталей. Работаем с индивидуальными заказами по чертежам.';
</script>

<template>
  <Html lang="ru" />
  <Head>
    <Title>Фарадей Металл</Title>
    <Meta name="description" :content="DESCRIPTION" />
    <Meta property="og:title" content="Фарадей Металл" />
    <Meta property="og:description" :content="DESCRIPTION" />
    <Meta property="og:image" :content="ogImage" />
    <Meta property="og:image:width" content="1920" />
    <Meta property="og:image:height" content="1080" />
    <Meta name="twitter:card" content="summary_large_image" />

    <Meta name="viewport" content="width=1024, initial-scale=1" />
    <Link rel="shortcut icon" href="/favicon.ico" />
    <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <Link rel="icon" type="image/png" href="/favicon.png" />
    <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111112" />
    <Meta name="theme-color" content="#111112" />
    <Meta name="msapplication-TileColor" content="#111112" />
  </Head>

  <LayoutHeader />

  <NuxtPage />

  <LayoutFooter />

  <div id="modals" />
</template>

<style lang="scss" src="@/assets/styles/grid.scss"></style>
<style lang="scss">
* {
  font-family: Inter, sans-serif;
  font-weight: 400;
  box-sizing: border-box;
}

body {
  margin: 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #121212;
  }
}

.page-enter-active,
.page-leave-active {
  &:not(.articlesSlugPage) {
    transition: opacity 0.5s ease;
  }
}
.page-enter-from,
.page-leave-to {
  &:not(.articlesSlugPage) {
    opacity: 0;
  }
}
</style>
