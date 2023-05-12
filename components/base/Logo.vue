<template>
  <div class="baseLogo">
    <SvgoLogo filled class="baseLogo__image" />
  </div>
</template>

<style lang="scss">
.baseLogo {
  position: relative;
  aspect-ratio: 1 / 1;

  &__image {
    position: absolute;
    width: 108%;
    height: auto;
    display: block;
    margin-bottom: 0;
  }
}
</style>
