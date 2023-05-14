<script lang="ts" setup>
import background from '~/assets/images/form_background.jpg';

const request = useRequest();

const name = ref('');
const phone = ref('');
const message = ref('');
const files = ref<File[]>([]);

const isValid = computed(() => !!(name.value && phone.value && message.value));

const onFileInputChange = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  const fileList = target.files || event.dataTransfer?.files;
  if (!fileList?.length) return;

  files.value = Array.from(fileList);
};

const onSubmit = () => {
  if (!isValid.value) return;

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('phone', phone.value);
  formData.append('message', message.value);
  files.value.forEach((el) => formData.append('files', el, el.name));

  request('/api/email', {body: formData, method: 'POST'});
};
</script>

<template>
  <div class="baseRequestForm">
    <NuxtImg
      :src="background"
      :sizes="IMAGE_SIZES.fullscreen"
      alt="Фон для формы заявки"
      class="baseRequestForm__image"
    />

    <div class="baseRequestForm__content">
      <form @submit.prevent="onSubmit" class="baseRequestForm__form">
        <h3 class="baseRequestForm__title">
          Остались вопросы?
        </h3>

        <div class="baseRequestForm__fields">
          <BaseInput v-model="name" autocomplete="name" placeholder="Как к вам обращаться?" />
          <BaseInput
            v-model="phone"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            placeholder="+7 (999) 999-99-99"
          />
          <BaseTextArea v-model="message" placeholder="Напишите дополнительные пожелания" />
          <input @change="onFileInputChange" type="file" multiple>
        </div>

        <BaseButton type="submit" size="s" class="baseRequestForm__submit">
          Оставить заявку
        </BaseButton>
      </form>
    </div>

    <div class="baseRequestForm__additional">
      <BaseLogo class="baseRequestForm__logo" />
    </div>
  </div>
</template>

<style lang="scss">
.baseRequestForm {
  position: relative;
  display: flex;

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__content {
    @include columns(8);

    position: relative;
    padding-top: 86px;
    padding-bottom: 138px;
  }

  &__form {
    @include columns(4, 2);

    margin: 0 auto;
    background: rgba(243, 233, 233, 0.12);
    border: 2px solid #F2F2F2;
    box-shadow: 12px 22px 27px 24px rgba(58, 58, 58, 0.25);
    backdrop-filter: blur(39px);
    border-radius: 32px;
    padding: 48px 40px;
  }

  &__title {
    font-size: 32px;
    line-height: 39px;
    color: #111112;
    text-align: center;
    margin-top: 0;
    margin-bottom: 78px;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__submit {
    display: block;
    margin: 48px auto 0;
  }

  &__additional {
    position: relative;
    flex: 1;
    background: rgba(183, 105, 2, 0.6);
    backdrop-filter: blur(22px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__logo {
    width: 207px;
  }
}
</style>
