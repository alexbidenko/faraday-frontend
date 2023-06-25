<script lang="ts" setup>
import type { VNode } from 'vue';

const props = defineProps<{
  visible: boolean;
  fixedDuration?: number;
}>();
defineSlots<{
  default: (props: object) => VNode[];
}>();

const content = ref<HTMLDivElement>();
const observer = ref<ResizeObserver>();
const height = ref(0);
const deltaHeight = ref(0);
const isInitialized = ref(false);

const containerHeightStyle = computed(() =>
  isInitialized.value || !props.visible
    ? `${props.visible ? height.value : 0}px`
    : 'auto'
);
const heightTransitionStyle = computed(
  () => `height ${props.fixedDuration || deltaHeight.value}ms ease`
);
const opacityTransitionStyle = computed(
  () => `opacity ${props.fixedDuration || deltaHeight.value}ms ease`
);

watch(content, (v) => {
  if (v) height.value = v.scrollHeight;
});

watch(height, (value, prevValue) => {
  deltaHeight.value = Math.abs(value - prevValue);
});

watch(
  () => props.visible,
  () => {
    deltaHeight.value = height.value;
  }
);

onMounted(() => {
  if (content.value) {
    setTimeout(() => {
      isInitialized.value = true;
    });

    observer.value = new ResizeObserver(() => {
      height.value = content.value?.scrollHeight || 0;
    });
    observer.value.observe(content.value);
  }
});

onBeforeUnmount(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <div
    class="baseCollapse"
    :class="{ baseCollapse_initialized: isInitialized }"
  >
    <div
      class="baseCollapse__content"
      :class="{ baseCollapse__content_visible: props.visible }"
      ref="content"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.baseCollapse {
  $self: &;

  position: relative;
  height: v-bind(containerHeightStyle);
  overflow: hidden;

  &_initialized {
    transition: v-bind(heightTransitionStyle);

    #{$self}__content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      transition: v-bind(opacityTransitionStyle);

      &_visible {
        opacity: 1;
      }
    }
  }
}
</style>
