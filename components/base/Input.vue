<script lang="ts" setup>
import type {InputHTMLAttributes} from 'vue';
import {defineModel} from 'vue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends /* @vue-ignore */ InputHTMLAttributes {}

defineOptions({inheritAttrs: false});
defineProps<Props>();
const attrs = useAttrs();
const modelValue = defineModel();

const inputAttrs = computed(() => {
  const {class: _, ...otherAttrs} = attrs;
  return otherAttrs;
});

const onChange = (event: Event) => {
  if (attrs.type === 'tel') {
    const target = event.target as HTMLInputElement;
    target.value = phoneFormat(target.value, PhoneMask.detailed);
  }
};
</script>

<template>
  <label class="baseInput" :class="attrs.class">
    <input
      v-model="modelValue"
      @input="onChange"
      class="baseInput__field"
      v-bind="inputAttrs"
    >
  </label>
</template>

<style lang="scss">
.baseInput {
  font-size: 16px;
  line-height: 26px;

  &__field {
    display: block;
    width: 100%;
    height: 46px;
    color: #111112;
    border: none;
    border-bottom: 2px solid #111112;
    background: none;
    padding-left: 12px;
    padding-right: 48px;
    outline: none;

    &::placeholder {
      color: #858A8C;
    }
  }
}
</style>
