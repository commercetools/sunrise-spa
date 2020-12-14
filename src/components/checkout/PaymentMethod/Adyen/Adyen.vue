<script src="./Adyen.js"></script>
<i18n src="./Adyen.txt"></i18n>

<template>
<div>
  <div v-show="showComponent" ref="adyen"></div>
  <div v-show="showLoading">
    <span class="bold-text">
      Loading
    </span>
  </div>
  <div v-show="showPaid">
    <span class="bold-text">
      {{$t("paid")}}
    </span>
  </div>
  <div v-show="showError">
    <div class="error-message" style="color:red">
      {{$t("unknownError")}}
    </div>
    <button @click="retry">{{$t("retry")}}</button>
  </div>
</div>
</template>
