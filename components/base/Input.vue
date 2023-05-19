<script lang="ts" setup>
import type {InputHTMLAttributes} from 'vue';

enum Icon {
  profile = 'profile',
  phone = 'phone',
}

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  icon?: Icon;
}

defineOptions({inheritAttrs: false});
const props = defineProps<Props>();
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
    <SvgoSimpleProfile v-if="props.icon === Icon.profile" class="baseInput__icon" />
    <SvgoSimplePhone v-else-if="props.icon === Icon.phone" class="baseInput__icon" />
  </label>
</template>

<style lang="scss" scoped>
.baseInput {
  display: flex;
  align-items: center;
  height: 46px;
  padding-top: 2px;
  padding-right: 12px;
  border-bottom: 2px solid #111112;

  &__field {
    display: block;
    width: 100%;
    color: #111112;
    border: none;
    background: none;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 16px;
    line-height: 26px;
    outline: none;

    &::placeholder {
      color: #858A8C;
    }
  }

  & &__icon {
    width: 24px;
    height: 24px;
    display: block;
    margin: 0;
  }
}
</style>
