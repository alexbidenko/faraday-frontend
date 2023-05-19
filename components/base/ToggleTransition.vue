<script lang="ts" setup>
import type {VNode} from 'vue';

const props = defineProps<{
  state: number | string;
}>();
defineSlots<{
  default: () => VNode[];
}>();

const component = ref<HTMLDivElement>();
const withDelay = ref(false);
const height = ref<number>();
const initialized = ref(false);
const observer = ref<ResizeObserver>();
const transitionEnabled = ref(false);
const isOverflowHidden = ref(false);

const transitionStyle = computed(() => `height ${transitionEnabled.value ? 0.3 : 0}s ease ${transitionEnabled.value && withDelay.value ? 0.3 : 0}s`);
const heightStyle = computed(() => height.value !== undefined ? `${height.value}px` : 'auto');

const onTransitionStart = () => {
  isOverflowHidden.value = true;
};

const onTransitionEnd = () => {
  isOverflowHidden.value = false;
};

watch(() => props.state, () => {
  transitionEnabled.value = true;
  setTimeout(() => {
    transitionEnabled.value = false;
  }, withDelay.value ? 600 : 300);
});

watch(component, (v) => {
  observer.value?.disconnect();

  if (v) {
    const newHeight = v.clientHeight;
    withDelay.value = newHeight < (height.value || 0);
    height.value = newHeight;
    initialized.value = true;

    observer.value = new ResizeObserver(() => {
      height.value = v.clientHeight;
    });
    observer.value.observe(v);
  }
}, {immediate: true});

onBeforeUnmount(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <div
    @transitionstart="onTransitionStart"
    @transitionend="onTransitionEnd"
    class="baseToggleTransition"
    :class="{baseToggleTransition_initialized: initialized}"
  >
    <Transition name="toggle-transition">
      <div
        :key="props.state"
        ref="component"
        @transitionstart.stop
        @transitionend.stop
        class="baseToggleTransition__slot"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.baseToggleTransition {
  height: v-bind(heightStyle);
  position: relative;
  transition: v-bind(transitionStyle);
  overflow: hidden;

  &_initialized &__slot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}

.toggle-transition-enter-active {
  transition: opacity 0.3s ease 0.3s;
}
.toggle-transition-leave-active {
  transition: opacity 0.3s ease;
}

.toggle-transition-enter-from,
.toggle-transition-leave-to {
  opacity: 0;
}
</style>
