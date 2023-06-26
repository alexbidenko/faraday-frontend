<script lang="ts" setup>
import background from '~/assets/images/form_background.jpg';
import { NBSP } from '~/utils/constants';

const request = useRequest();

const name = ref('');
const phone = ref('');
const message = ref('');
const selectedFiles = ref<File[]>([]);
const isSuccessful = ref(false);

const isValid = computed(() => !!(name.value && phone.value && message.value));

const onFilesSelect = (files: File[]) => {
  selectedFiles.value = files;
};

const onSubmit = () => {
  if (!isValid.value) return;

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('phone', phone.value);
  formData.append('message', message.value);
  selectedFiles.value.forEach((el) => formData.append('files', el, el.name));

  request('/api/email', { body: formData, method: 'POST' })
    .then(() => {
      name.value = '';
      phone.value = '';
      message.value = '';
      selectedFiles.value = [];

      isSuccessful.value = true;

      setTimeout(() => {
        isSuccessful.value = false;
      }, 10000);
    })
    .catch(() => {
      alert('Во время отправки сообщеняи произошла ошибка');
    });
};
</script>

<template>
  <div
    class="baseRequestForm"
    :class="{ baseRequestForm_success: isSuccessful }"
  >
    <NuxtImg
      :src="background"
      :sizes="IMAGE_SIZES.fullscreen"
      alt="Фон для формы заявки"
      class="baseRequestForm__image"
    />

    <div class="baseRequestForm__content">
      <div class="baseRequestForm__card">
        <form @submit.prevent="onSubmit" class="baseRequestForm__form">
          <h3 class="baseRequestForm__question">Остались вопросы?</h3>

          <div class="baseRequestForm__fields">
            <BaseInput
              v-model="name"
              icon="profile"
              autocomplete="name"
              placeholder="Как к вам обращаться?"
            />
            <BaseInput
              v-model="phone"
              icon="phone"
              type="tel"
              autocomplete="tel"
              inputmode="tel"
              placeholder="+7 (999) 999-99-99"
            />
            <BaseTextArea
              v-model="message"
              placeholder="Напишите дополнительные пожелания"
            />
            <BaseAttachFiles
              @change="onFilesSelect"
              placeholder="Загрузите файл"
            >
              <template #hint>
                Можем обсудить условия выполнения индивидуального заказа
                (прикрепите чертёж к{{ NBSP }}заявке звонка)
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

        <div class="baseRequestForm__successful">
          <span>Остались вопросы?</span>
          <div class="baseRequestForm__result">
            <SvgoSuccessful filled class="baseRequestForm__icon" />
            <span>
              Спасибо за обращение! Мы свяжемся с вами в ближайшее время
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="baseRequestForm__additional">
      <BaseLogo class="baseRequestForm__logo" />
      <h2 class="baseRequestForm__title">Контакты</h2>
      <div class="baseRequestForm__contacts">
        <a :href="`tel:${CONSTANTS.phone}`" class="baseRequestForm__link">
          <SvgoSimplePhone filled />
        </a>
        <a :href="`mailto:${CONSTANTS.email}`" class="baseRequestForm__link">
          <SvgoSimpleEmail filled />
        </a>
        <a
          :href="CONSTANTS.whatsapp"
          target="_blank"
          rel="nofollow noreferrer noopener"
          class="baseRequestForm__link"
        >
          <SvgoSimpleWhatsapp filled />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.baseRequestForm {
  $self: &;

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

    @include mq('xxl') {
      padding-left: var(--grid-gap);
    }

    @include mq('md') {
      width: 100%;
      padding-top: 84px;
      padding-bottom: 53px;
    }

    @include mq('sm') {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  &__card {
    @include columns(4, 2);

    position: relative;
    margin: 0 auto;
    background: rgba(243, 233, 233, 0.12);
    border: 2px solid #f2f2f2;
    box-shadow: 12px 22px 27px 24px rgba(58, 58, 58, 0.25);
    backdrop-filter: blur(39px);
    border-radius: 32px;
    padding: 48px 40px;

    @include mq('xxl') {
      @include columns(6, 1);
    }

    @include mq('md') {
      @include columns(10);
    }

    @include mq('sm') {
      width: 100%;
      padding: 48px 12px;
    }
  }

  &__form {
    transition: opacity 0.3s ease 0.3s;
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

    @include mq('md') {
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
    color: #ffffff;
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
    color: #ffffff;

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

  &__successful {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #111112;
    font-size: 32px;
    text-align: center;
    padding: inherit;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &__result {
    margin: auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__icon {
    width: 145px;
    height: 145px;
    display: block;
    margin-bottom: 94px;
  }

  &_success {
    #{$self}__form {
      transition-delay: 0s;
      opacity: 0;
    }

    #{$self}__successful {
      transition-delay: 0.3s;
      opacity: 1;
      pointer-events: initial;
    }
  }
}
</style>
