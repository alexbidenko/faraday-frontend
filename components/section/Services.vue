<script lang="ts" setup>
import image1 from '~/assets/images/service_image_1.jpg';
import image2 from '~/assets/images/service_image_2.jpg';
import image3 from '~/assets/images/service_image_3.jpg';
import image4 from '~/assets/images/service_image_4.jpg';
</script>

<template>
  <section id="services" class="sectionServices container">
    <h2 class="sectionServices__title">
      Услуги
    </h2>

    <div class="sectionServices__container">
      <div class="sectionServices__card">
        <div class="sectionServices__cardHeader">
          <NuxtImg
            :src="image1"
            alt=""
            format="webp"
            class="sectionServices__cardImage"
          />
          <h3 class="sectionServices__cardTitle">
            Продажа стали
          </h3>
        </div>

        <ul class="sectionServices__cardContent">
          <li>Hardox</li>
          <li>09Г2С</li>
          <li>10ХСНД</li>
          <li>СТ3</li>
          <li>СТ45</li>
          <li>СТ40Х</li>
          <li>Другая по запросу</li>
        </ul>
      </div>
      <div class="sectionServices__card">
        <div class="sectionServices__cardHeader">
          <NuxtImg
            :src="image2"
            alt=""
            format="webp"
            class="sectionServices__cardImage"
          />
          <h3 class="sectionServices__cardTitle">
            Изготовление деталей из стали
          </h3>
        </div>

        <ul class="sectionServices__cardContent">
          <li>Лазерная резка</li>
          <li>Плазменная резка</li>
          <li>Газовая резка на станке с ЧПУ</li>
          <li>Гидроаброзивная резка</li>
          <li>Механическая обработка</li>
          <li>Вальцовка</li>
        </ul>
      </div>
      <div class="sectionServices__card">
        <div class="sectionServices__cardHeader">
          <NuxtImg
            :src="image3"
            alt=""
            format="webp"
            class="sectionServices__cardImage"
          />
          <h3 class="sectionServices__cardTitle sectionServices__cardTitle_dark">
            Работа по индивидуальным чертежам заказчика
          </h3>
        </div>

        <div class="sectionServices__cardContent">
          Выполнение индивидуальных заказов по присланным чертежам или в результате обсуждения
        </div>
      </div>
      <div class="sectionServices__card">
        <div class="sectionServices__cardHeader">
          <NuxtImg
            :src="image4"
            alt=""
            format="webp"
            class="sectionServices__cardImage"
          />
          <h3 class="sectionServices__cardTitle sectionServices__cardTitle_dark">
            Доставка
          </h3>
        </div>

        <div class="sectionServices__cardContent">
          <strong>Самовывоз или доставка</strong>
          Санкт-Петербург и Ленинградская область
          <br>
          <br>
          <strong>Транспортными компаниями</strong>
          Другие регионы России
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sectionServices {
  &__title {
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: #111112;
    margin-top: 0;
    margin-bottom: 40px;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;

    @include mq("xl") {
      gap: 20px;
    }

    @include mq("md") {
      gap: 20px;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    width: 100%;
  }

  &__cardHeader {
    position: relative;
    aspect-ratio: 380 / 333;
  }

  &__cardImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__cardTitle {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0;
    font-weight: 700;
    font-size: 1.09vw;
    line-height: 1.2;
    color: #F2F2F2;
    padding: 32px 24px;
    height: 130px;
    background: rgba(243, 233, 233, 0.3);
    backdrop-filter: blur(20px);

    @include mq("md") {
      font-size: 2.4vw;
    }

    &_dark {
      color: #111112;
    }
  }

  &__cardContent {
    font-size: 24px;
    line-height: 34px;
    color: #111112;
    margin-top: 40px;

    @include mq("xl") {
      font-size: 16px;
      line-height: 24px;
    }

    &:not(:last-child) {
      margin-bottom: 32px;
    }

    strong {
      display: block;
      font-weight: 700;
      margin-bottom: 12px;
    }
  }
}
</style>
