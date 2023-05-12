<script lang="ts" setup>
import image1 from '~/assets/images/about_image_1.jpg';
import image2 from '~/assets/images/about_image_2.jpg';
</script>

<template>
  <section class="sectionAbout container">
    <div class="sectionAbout__content">
      <h2 class="sectionAbout__title">
        О нас
      </h2>
      <p class="sectionAbout__description">
        Наша компания работает со шведской сталью Hardox®, не имеющей в мире аналогов по стойкости к абразивному износу.
        А так же со сталью российских производителей.
        <br>
        <br>
        Специализируемся на продаже стали и изготовление деталей из неё.
        Работаем с индивидуальными заказами по чертежам заказчика.
      </p>
    </div>

    <div class="sectionAbout__images">
      <NuxtImg
        :src="image1"
        width="411"
        height="411"
        alt="Изображение секции о нас"
      />
      <NuxtImg
        :src="image2"
        width="401"
        height="401"
        alt="Изображение секции о нас"
      />
    </div>
  </section>
</template>

<style lang="scss">
.sectionAbout {
  display: flex;
  align-items: center;
  gap: var(--grid-gap);

  &__content {
    @include columns(5);

    padding-top: 114px;
    padding-bottom: 125px;
  }

  &__title {
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: #111112;
    margin-top: 0;
    margin-bottom: 40px;
  }

  &__description {
    font-size: 32px;
    line-height: 39px;
    color: #111112;
    margin: 0;
  }

  &__images {
    flex: 1;
    display: flex;
    gap: 19px;
    justify-content: flex-end;

    img:nth-child(1) {
      width: 411px;
      height: 411px;
      display: block;
      margin-top: 57px;
    }

    img:nth-child(2) {
      width: 401px;
      height: 401px;
      display: block;
    }
  }
}
</style>
