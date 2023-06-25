<script lang="ts" setup>
import image1 from '~/assets/images/about_image_1.jpg';
import image2 from '~/assets/images/about_image_2.jpg';
import { NBSP } from '~/utils/constants';
</script>

<template>
  <section id="about" class="sectionAbout container">
    <div class="sectionAbout__content">
      <h2 class="sectionAbout__title">О{{ NBSP }}нас</h2>
      <p class="sectionAbout__description">
        Наша компания работает со{{ NBSP }}шведской сталью Hardox®, не{{
          NBSP
        }}имеющей в{{ NBSP }}мире аналогов по{{ NBSP }}стойкости к{{
          NBSP
        }}абразивному износу. А{{ NBSP }}так{{ NBSP }}же{{ NBSP }}со сталью
        российских производителей.
        <br />
        <br />
        Специализируемся на{{ NBSP }}продаже стали и{{ NBSP }}изготовление
        деталей из{{ NBSP }}неё. Работаем с{{ NBSP }}индивидуальными заказами
        по{{ NBSP }}чертежам заказчика.
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

<style lang="scss" scoped>
.sectionAbout {
  display: flex;
  align-items: center;
  gap: var(--grid-gap);
  overflow: hidden;

  @include mq('md') {
    align-items: flex-start;
    flex-direction: column;
    padding-bottom: 65px;
  }

  &__content {
    @include columns(5);

    padding-top: 114px;
    padding-bottom: 125px;

    @include mq('xl') {
      padding-bottom: 94px;
    }

    @include mq('md') {
      width: 100%;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: #111112;
    margin-top: 0;
    margin-bottom: 40px;

    @include mq('xxl') {
      font-size: 48px;
      line-height: 58px;
    }
  }

  &__description {
    font-size: 32px;
    line-height: 39px;
    color: #111112;
    margin: 0;

    @include mq('xxl') {
      font-size: 24px;
      line-height: 30px;
    }
  }

  &__images {
    flex: 1;
    display: flex;
    gap: 19px;
    justify-content: flex-end;

    @include mq('xl') {
      gap: 20px;
    }

    @include mq('md') {
      margin-left: auto;
    }

    img:nth-child(1) {
      width: 411px;
      height: 411px;
      display: block;
      margin-top: 57px;

      @include mq('xxl') {
        width: 280px;
        height: 280px;
        margin-top: 79px;
      }
    }

    img:nth-child(2) {
      width: 401px;
      height: 401px;
      display: block;

      @include mq('xxl') {
        width: 280px;
        height: 280px;
      }
    }
  }
}
</style>
