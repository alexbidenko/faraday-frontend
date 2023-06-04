<script lang="ts" setup>
import type {VNode} from 'vue';

enum Direction {
  vertical = 'vertical',
  horizontal = 'horizontal',
  none = 'none',
}

defineOptions({inheritAttrs: false});
const props = withDefaults(defineProps<{
  tag: string;
  visible: boolean;
  fullHeight?: boolean;
  withOverlay?: boolean;
  zIndex?: number;
  contentClass?: string;
}>(), {tag: 'div', zIndex: 10});
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void;
}>();
const attrs = useAttrs();
defineSlots<{
  default: () => VNode[];
}>();
const zIndex = toRef(props, 'zIndex');

const container = ref<HTMLElement>();
const directional = ref(Direction.none);
const isMoved = ref(false);
const touchStartXPosition = ref(0);
const touchStartYPosition = ref(0);
const touchDeltaXPosition = ref(0);

const normalizeXPosition = (event: TouchEvent | MouseEvent) => {
  return 'touches' in event ? event.touches[0].clientX : event.clientX;
};

const normalizeYPosition = (event: TouchEvent | MouseEvent) => {
  return 'touches' in event ? event.touches[0].clientY : event.clientY;
};

const onTouchMove = (event: TouchEvent | MouseEvent) => {
  const xPosition = normalizeXPosition(event);
  const yPosition = normalizeYPosition(event);

  if (directional.value === Direction.none) {
    directional.value = xPosition - touchStartXPosition.value > Math.abs(yPosition - touchStartYPosition.value) ?
      Direction.horizontal :
      Direction.vertical;
  }

  if (directional.value === Direction.horizontal) {
    touchDeltaXPosition.value = Math.max(0, xPosition - touchStartXPosition.value);
    isMoved.value = true;
  }
};

const onTouchEnd = (event: Event) => {
  if (!container.value) return;
  if (isMoved.value) event.preventDefault();
  if (touchDeltaXPosition.value > container.value.clientWidth / 2) {
    setTimeout(() => {
      emit('update:visible', false);
    });
  }
  touchStartXPosition.value = 0;
  touchStartYPosition.value = 0;
  directional.value = Direction.none;
  setTimeout(() => {
    touchDeltaXPosition.value = 0;
    isMoved.value = false;
  });
  container.value.removeEventListener('touchmove', onTouchMove);
  container.value.removeEventListener('mousemove', onTouchMove);
  container.value.removeEventListener('touchend', onTouchEnd);
  container.value.removeEventListener('mouseup', onTouchEnd);
};

const onTouchStart = (event: TouchEvent | MouseEvent) => {
  if (!props.visible || !container.value) return;

  touchStartXPosition.value = normalizeXPosition(event);
  touchStartYPosition.value = normalizeYPosition(event);

  container.value.addEventListener('touchmove', onTouchMove);
  container.value.addEventListener('mousemove', onTouchMove);
  container.value.addEventListener('touchend', onTouchEnd);
  container.value.addEventListener('mouseup', onTouchEnd);
};

defineExpose({container});
</script>

<template>
  <ClientOnly>
    <Teleport to="#modals">
      <Transition name="baseSidebar" :duration="500">
        <div
          v-if="props.visible"
          @click="emit('update:visible', false)"
          class="baseSidebar"
          :class="{baseSidebar_fullHeight: props.fullHeight, baseSidebar_withOverlay: props.withOverlay}"
          :style="{zIndex}"
        >
          <div v-if="props.withOverlay" class="baseSidebar__overlay" />
          <component
            ref="container"
            :is="props.tag"
            :style="[touchStartXPosition ? `transform: translateX(${touchDeltaXPosition}px)` : 'transition: transform 0.5s ease', {zIndex}]"
            @click.stop
            @touchstart="onTouchStart"
            @mousedown="onTouchStart"
            class="baseSidebar__container"
            v-bind="attrs"
          >
            <div class="baseSidebar__content" :class="props.contentClass">
              <slot />
            </div>
          </component>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style lang="scss">
.baseSidebar {
  $self: &;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: contents;
  overflow: hidden;

  &_fullHeight &__container {
    bottom: 0;
  }

  &_withOverlay {
    display: block;

    #{$self}__container {
      z-index: initial !important;
    }
  }

  &__overlay {
    background: rgba(18, 18, 18, 0.4);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  &__container {
    position: fixed;
    top: 0;
    right: 0;
    max-height: 100%;
    display: flex;
    user-select: none;
    overflow: auto;
  }

  &__content {
    width: 100%;
    height: 100%;
  }

  &-enter-active,
  &-leave-active {
    #{$self}__overlay,
    #{$self}__content {
      transition: opacity 0.5s ease;
    }
  }
  &-enter-from,
  &-leave-to {
    #{$self}__overlay,
    #{$self}__content {
      opacity: 0;
    }

    #{$self}__container {
      transform: translateX(100%);
    }
  }
}
</style>
