<script lang="ts" setup>
import background from '~/assets/images/form_background.jpg';

const request = useRequest();

const name = ref('');
const phone = ref('');
const message = ref('');
const selectedFiles = ref<File[]>([]);
const isValidatedByRecaptcha = ref(false);

const isValid = computed(() => !!(name.value && phone.value && message.value));

const onFilesSelect = (files: File[]) => {
  selectedFiles.value = files;
};

const onSubmit = () => {
  if (!isValid.value || !isValidatedByRecaptcha.value) return;

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('phone', phone.value);
  formData.append('message', message.value);
  selectedFiles.value.forEach((el) => formData.append('files', el, el.name));

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
        <h3 class="baseRequestForm__question">
          Остались вопросы?
        </h3>

        <div class="baseRequestForm__fields">
          <BaseInput
            v-model="name"
            icon="profile"
            autocomplete="name"
            placeholder="Как к вам обращаться?"
          />
          <BaseInput
            v-model="phone"
            icon="phone"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            placeholder="+7 (999) 999-99-99"
          />
          <BaseTextArea v-model="message" placeholder="Напишите дополнительные пожелания" />
          <BaseAttachFiles
            @change="onFilesSelect"
            placeholder="Загрузите файл"
          >
            <template #hint>
              Можем обсудить условия выполнения индивидуального заказа
              (прикрепите чертёж к заявке звонка)
            </template>
          </BaseAttachFiles>
        </div>

        <BaseButton
          :disabled="!isValid"
          type="submit"
          size="s"
          class="baseRequestForm__submit"
        >
          Оставить заявку
        </BaseButton>
      </form>
    </div>

    <div class="baseRequestForm__additional">
      <BaseLogo class="baseRequestForm__logo" />
      <h2 class="baseRequestForm__title">
        Контакты
      </h2>
      <div class="baseRequestForm__contacts">
        <a :href="`tel:${CONSTANTS.phone}`" class="baseRequestForm__link">
          <SvgoSimplePhone />
        </a>
        <a :href="`mailto:${CONSTANTS.email}`" class="baseRequestForm__link">
          <SvgoSimpleEmail />
        </a>
        <a
          :href="CONSTANTS.whatsapp"
          target="_blank"
          rel="nofollow noreferrer noopener"
          class="baseRequestForm__link"
        >
          <SvgoSimpleWhatsapp />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

    @include mq("xxl") {
      padding-left: var(--grid-gap);
    }

    @include mq("md") {
      width: 100%;
      padding-top: 84px;
      padding-bottom: 53px;
    }

    @include mq("sm") {
      padding-left: 16px;
      padding-right: 16px;
    }
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

    @include mq("xxl") {
      @include columns(6, 1);
    }

    @include mq("md") {
      @include columns(10);
    }

    @include mq("sm") {
      width: 100%;
      padding: 48px 12px;
    }
  }

  &__question {
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

    @include mq("md") {
      display: none;
    }
  }

  &__logo {
    width: 207px;
  }

  &__title {
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    color: #FFFFFF;
    margin-top: 80px;
    margin-bottom: 77px;
  }

  &__contacts {
    display: flex;
    align-items: center;
    gap: 94px;
  }

  &__link {
    width: 48px;
    height: 48px;
    color: #FFFFFF;

    &:hover svg {
      transform: translateY(-10px);
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
      margin-bottom: 0;
      transition: transform 0.3s ease;
    }
  }
}
</style>
