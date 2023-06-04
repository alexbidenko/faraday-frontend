<script lang="ts" setup>
const wrapper = ref<HTMLButtonElement>(null);

defineExpose({wrapper});

const props = defineProps<{
  burger?: boolean;
  dark?: boolean;
}>();
</script>

<template>
  <button
    ref="wrapper"
    class="baseModalButton"
    :class="{baseModalButton_opened: !props.burger, baseModalButton_dark: props.dark}"
  >
    <span class="baseModalButton__line" />
    <span class="baseModalButton__line" />
    <span class="baseModalButton__line" />
  </button>
</template>

<style lang="scss">
.baseModalButton {
  $self: &;

  width: 64px;
  height: 64px;
  padding: 0;
  border-radius: 50%;
  z-index: 11;
  border: none;
  cursor: pointer;
  outline: none;
  background: none;

  &:hover::before {
    background-color: rgba(255, 255, 255, 0.6);
  }

  &_dark {
    filter: invert(1);
  }

  &_opened {
    #{$self}__line {
      width: 35px;
      transition:  transform 0.3s ease, width 0.3s ease, background-color 0.3s ease;

      &:nth-child(1) {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      &:nth-child(2) {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:nth-child(3) {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  &__line {
    height: 2px;
    background-color: #121212;
    width: 39px;
    position: absolute;
    border-radius: 1px;
    top: 50%;
    left: 50%;
    transition: transform 0.3s ease, width 0.3s ease, background-color 0.3s ease 0.2s;
    transform-origin: 50% 50%;

    &:nth-child(1) {
      transform: translate(-50%, calc(-50% - 10px));
    }

    &:nth-child(2) {
      transform: translate(-50%, -50%);
    }

    &:nth-child(3) {
      transform: translate(-50%, calc(-50% + 10px));
    }
  }
}
</style>
