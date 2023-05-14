<template>
  <Html lang="ru" />
  <Head>
    <Title>Фарадей</Title>
  </Head>

  <LayoutHeader />

  <NuxtPage />
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
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #121212;
  }
}
</style>
