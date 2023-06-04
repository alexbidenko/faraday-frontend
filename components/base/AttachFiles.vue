<script lang="ts" setup>
import type {VNode} from 'vue';

const props = defineProps<{
  placeholder: string;
}>();
const emit = defineEmits<{
  select: [files: File[]],
}>();
const slots = defineSlots<{
  hint?: () => VNode[];
}>();

const selectedFiles = ref<{file: File; id: number}[]>([]);
const isDragged = ref(false);
const count = ref(0);

const onChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files || (event as InputEvent).dataTransfer?.files;
  if (files) {
    selectedFiles.value = selectedFiles.value.concat(
      [...files].map((file) => ({
        file,
        id: ++count.value,
      })),
    );
    emit('select', selectedFiles.value.map((el) => el.file));
  }
  isDragged.value = false;
};
</script>

<template>
  <label class="baseAttachFiles">
    <span
      @drop.prevent="onChange"
      @dragover.prevent="isDragged = true"
      @dragenter.prevent="isDragged = true"
      @dragleave.prevent="isDragged = false"
      class="baseAttachFiles__field"
      :class="{baseAttachFiles__field_dragged: isDragged}"
    >
      <input
        @change="onChange"
        type="file"
        multiple
        hidden
      >
      <BaseToggleTransition :state="+!selectedFiles.length" class="baseAttachFiles__content">
        <span v-if="!selectedFiles.length" class="baseAttachFiles__placeholder">
          {{ props.placeholder }}
        </span>
        <BaseCollapse
          v-else
          @click.stop.prevent
          visible
        >
          <TransitionGroup
            tag="ul"
            name="list"
            class="baseAttachFiles__files"
          >
            <li v-for="(item, index) in selectedFiles" :key="item.id" class="baseAttachFiles__item">
              <SvgoSimpleFile class="baseAttachFiles__itemIcon" />
              <span class="baseAttachFiles__itemLabel">
                <span class="baseAttachFiles__itemLabel_name">{{ item.file.name }}</span>
                <span>{{ fileSize(item.file) }}</span>
              </span>
              <button @click="selectedFiles.splice(index, 1)" class="baseAttachFiles__itemDelete">
                <SvgoSimpleClose class="baseAttachFiles__itemDeleteIcon" />
              </button>
            </li>
          </TransitionGroup>
        </BaseCollapse>
      </BaseToggleTransition>
      <SvgoSimplePlus class="baseAttachFiles__icon" />
    </span>

    <span v-if="slots.hint" class="baseAttachFiles__hint">
      <slot name="hint" />
    </span>
  </label>
</template>

<style lang="scss" scoped>
.baseAttachFiles {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__field {
    display: flex;
    min-height: 48px;
    border: 2px solid #111112;
    border-radius: 12px;
    padding: 8px 12px;
    transition: border-color 0.2s ease;

    &_dragged {
      border-color: rgba(17, 17, 18, 0.3);
    }
  }

  &__content {
    flex: 1;
  }

  &__placeholder {
    font-size: 16px;
    line-height: 26px;
    color: #858A8C;
    display: block;
    padding-bottom: 2px;
  }

  & &__icon {
    width: 24px;
    height: 24px;
    display: block;
    margin-top: 1px;
    margin-bottom: 0;
  }

  &__files {
    margin: 0;
    padding: 1px 0;
    position: relative;
  }

  &__hint {
    font-size: 16px;
    line-height: 26px;
    color: #111112;
    display: block;
    padding-left: 13px;
    border-left: 2px solid #B76902;
  }

  &__item {
    display: flex;
    align-items: center;

    & + & {
      padding-top: 6px;
    }
  }

  & &__itemIcon {
    width: 24px;
    height: 24px;
    display: block;
    margin: 2px 0 0;
    flex: 0 0 24px;
  }

  &__itemLabel {
    display: flex;
    gap: 8px;
    margin-right: 4px;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;

    &_name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &__itemDelete {
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(17, 17, 18, 0.1);
    }
  }

  & &__itemDeleteIcon {
    width: 16px;
    height: 16px;
    display: block;
    margin: 0;
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: margin-bottom 0.3s ease, opacity 0.3s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
  }

  .list-leave-active {
    margin-bottom: -32px;
  }
}
</style>
