<script lang="ts" setup>
import {ButtonHTMLAttributes} from 'vue';

interface Props extends ButtonHTMLAttributes {
  size?: 'm' | 'l';
}

const props = withDefaults(defineProps<{
  size?: 'm' | 'l';
}>(), {size: 'm'});
</script>

<template>
  <button class="baseButton" :class="`baseButton_${props.size}`">
    <slot />
  </button>
</template>

<style lang="scss">
.baseButton {
  background-color: #111112;
  border-radius: 32px;
  height: 87px;
  padding: 0 70px;
  color: #F2F2F2;
  border: #111112 solid 2px;
  outline: none;
  font-size: 32px;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: #F2F2F2;
    color: #111112;
  }

  &_l {
    height: 120px;
    padding: 0 100px;
  }
}
</style>
