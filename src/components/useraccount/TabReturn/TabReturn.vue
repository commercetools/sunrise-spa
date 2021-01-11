<i18n src="./TabReturn.txt"></i18n>
<script src="./TabReturn.js"></script>
<style lang="scss" src="./TabReturn.scss"></style>

<template>
  <div class="myaccount-content">
    <div v-if="me">
      <h3>{{ $t("title") }}</h3>
      <div class="mt-40">
        <CartLikeContentDetail
          :editable="false"
          :selectable="true"
          :cartLike="me.order"
          @update-selected-items="updateSelectedItems"
        />
      </div>
      <button @click="submitReturn" class="mt-20" data-test="return-submit">
        {{ $t("return") }}
      </button>
    </div>
    <div class="pt-50 pb-55" v-if="!$apollo.loading && !me">
      <h1 class="text-center">{{ $t("notFound") }}</h1>
    </div>
    <modal
      name="returnSuccess"
      width="600"
      height="250"
      @closed="closeModal"
      data-test="return-modal"
    >
      <div class="modal-body text-center return-modal">
        <h2>{{ $t("modalText") }}</h2>
        <button @click="closeModal" class="mt-30" data-test="close-button">
          {{ $t("close") }}
        </button>
      </div>
    </modal>
  </div>
</template>

