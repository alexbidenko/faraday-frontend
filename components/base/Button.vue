<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  size?: 's' | 'm' | 'l';
  link?: boolean;
}

const props = withDefaults(defineProps<Props>(), { size: 'm' });
</script>

<template>
  <button
    class="baseButton"
    :class="[`baseButton_${props.size}`, { baseButton_link: props.link }]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.baseButton {
  background-color: #111112;
  border-radius: 32px;
  height: 87px;
  padding: 0 70px;
  color: #f2f2f2;
  border: #111112 solid 2px;
  outline: none;
  font-size: 32px;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;

  @include mq('xxl') {
    border-radius: 24px;
    height: 65px;
    font-size: 24px;
    padding: 0 51px;
  }

  &:hover {
    background-color: #f2f2f2;
    color: #111112;
  }

  &:disabled {
    pointer-events: none;
    border-color: #C8C8C8;
    background-color: #C8C8C8;
    color: #858A8C;
  }

  &_l {
    height: 120px;
    padding: 0 100px;

    @include mq('xxl') {
      height: 93px;
      padding: 0 70px;
    }
  }

  &_s {
    font-size: 24px;
    height: 74px;
    padding: 0 94px;
  }

  &_link {
    height: 50px;
    padding: 12px 24px;
    font-size: 16px;
    background-color: transparent;
    color: #111112;
    border-radius: 20px;

    &:hover {
      background-color: #111112;
      color: #f2f2f2;
    }
  }
}
</style>
