<script lang="ts" setup>
import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/vue';

import image1 from '~/assets/images/service_image_1.jpg';
import image2 from '~/assets/images/service_image_2.jpg';
import image3 from '~/assets/images/service_image_3.jpg';
import image4 from '~/assets/images/service_image_4.jpg';
import { NBSP } from '~/utils/constants';
</script>

<template>
  <section id="services" class="sectionServices container">
    <h2 class="sectionServices__title">Услуги</h2>

    <Swiper
      :slides-per-view="1"
      :space-between="12"
      :breakpoints="{ 768: { enabled: false } }"
    >
      <SwiperSlide class="sectionServices__card">
        <div class="sectionServices__cardHeader">
          <NuxtImg
            :src="image1"
            alt=""
            format="webp"
            class="sectionServices__cardImage"
          />
          <h3 class="sectionServices__cardTitle">Продажа стали</h3>
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

        <NuxtLink
          to="/articles/steel/1.09g2s"
          class="sectionServices__cardLink"
        >
          Подробнее
        </NuxtLink>
      </SwiperSlide>
      <SwiperSlide class="sectionServices__card">
        <div class="sectionServices__cardHeader">
          <NuxtImg
            :src="image2"
            alt=""
            format="webp"
            class="sectionServices__cardImage"
          />
          <h3 class="sectionServices__cardTitle">
            Изготовление деталей из{{ NBSP }}стали
          </h3>
        </div>

        <ul class="sectionServices__cardContent">
          <li>Лазерная резка</li>
          <li>Плазменная резка</li>
          <li>Газовая резка на{{ NBSP }}станке с{{ NBSP }}ЧПУ</li>
          <li>Гидроаброзивная резка</li>
          <li>Механическая обработка</li>
          <li>Вальцовка</li>
        </ul>

        <NuxtLink
          to="/articles/steel/1.09g2s"
          class="sectionServices__cardLink"
        >
          Подробнее
        </NuxtLink>
      </SwiperSlide>
      <SwiperSlide class="sectionServices__card">
        <div class="sectionServices__cardHeader">
          <NuxtImg
            :src="image3"
            alt=""
            format="webp"
            class="sectionServices__cardImage"
          />
          <h3
            class="sectionServices__cardTitle sectionServices__cardTitle_dark"
          >
            Работа по{{ NBSP }}индивидуальным чертежам заказчика
          </h3>
        </div>

        <div class="sectionServices__cardContent">
          Выполнение индивидуальных заказов по{{ NBSP }}присланным чертежам
          или{{ NBSP }}в{{ NBSP }}результате обсуждения
        </div>
      </SwiperSlide>
      <SwiperSlide class="sectionServices__card">
        <div class="sectionServices__cardHeader">
          <NuxtImg
            :src="image4"
            alt=""
            format="webp"
            class="sectionServices__cardImage"
          />
          <h3
            class="sectionServices__cardTitle sectionServices__cardTitle_dark"
          >
            Доставка
          </h3>
        </div>

        <div class="sectionServices__cardContent">
          <strong>Самовывоз или доставка</strong>
          Санкт-Петербург и{{ NBSP }}Ленинградская область
          <br />
          <br />
          <strong>Транспортными компаниями</strong>
          Другие регионы России
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="sectionServices__container" />
  </section>
</template>

<style lang="scss" scoped>
.sectionServices {
  @include mq('sm') {
    padding: 0 !important;
  }

  &__title {
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: #111112;
    margin-top: 0;
    margin-bottom: 40px;
  }

  :deep(.swiper) {
    @include mq('sm') {
      padding: var(--container-padding);
    }
  }

  :deep(.swiper-wrapper) {
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;

    @include mq('xl') {
      gap: 20px;
    }

    @include mq('md') {
      gap: 20px;
      grid-template-columns: repeat(2, 1fr);
    }

    @include mq('sm') {
      gap: 0;
    }

    @include mq('none', 'sm') {
      display: grid;
    }
  }

  &__card {
    @include mq('none', 'sm') {
      width: 100% !important;
      margin-right: 0 !important;
    }
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
    color: #f2f2f2;
    padding: 32px 24px;
    height: 130px;
    background: rgba(243, 233, 233, 0.3);
    backdrop-filter: blur(20px);

    @include mq('md') {
      font-size: 2.4vw;
    }

    @include mq('sm') {
      font-size: 6vw;
      line-height: 29px;
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
    margin-bottom: 0;
    padding-bottom: 32px;

    @include mq('xl') {
      font-size: 16px;
      line-height: 24px;
    }

    &:not(:last-child) {
      margin-bottom: 24px;
      border-bottom: 1px solid #858a8c;
    }

    strong {
      display: block;
      font-weight: 700;
      margin-bottom: 12px;
    }

    &:is(ul) {
      padding-left: 24px;
    }
  }

  &__cardLink {
    margin-left: auto;
    display: block;
    width: fit-content;
    color: #111112;
    font-size: 16px;
    line-height: 26px;
    text-underline-offset: 6px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
