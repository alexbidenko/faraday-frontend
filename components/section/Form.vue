<template>
  <section id="request" class="baseForm container">
    <BaseRequestForm />
  </section>
</template>

<style lang="scss" scoped>
.baseForm {
  padding-top: 94px;
  padding-bottom: 94px;

  @include mq("sm") {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
