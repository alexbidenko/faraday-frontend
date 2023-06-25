<script lang="ts" setup>
import type { TextareaHTMLAttributes } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends /* @vue-ignore */ TextareaHTMLAttributes {}

defineProps<Props>();
const modelValue = defineModel<string>();
</script>

<template>
  <textarea v-model="modelValue" class="baseTextArea" />
</template>

<style lang="scss" scoped>
.baseTextArea {
  min-height: 164px;
  border: 2px solid #111112;
  border-radius: 12px;
  font-size: 16px;
  line-height: 26px;
  color: #111112;
  padding: 8px 10px;
  background: none;
  resize: none;
  outline: none;

  &::placeholder {
    color: #858a8c;
  }
}
</style>
