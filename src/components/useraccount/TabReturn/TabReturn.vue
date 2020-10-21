<i18n src="./TabReturn.txt"></i18n>
<script src="./TabReturn.js"></script>

<template>
    <div class="myaccount-content">
    <div v-if="me">
      <h3>{{ $t('title') }}</h3>
      <div class="mt-40">
        <CartLikeContentDetail :editable="false" :selectable="true" :cartLike="me.order"
                               @updateSelectedItems="updateSelectedItems"/>
      </div>
      <button @click="submitReturn" class="mt-20">
        Return
      </button>
    </div>
    <div class="pt-50 pb-55" v-if="!$apollo.loading && !me">
      <h1 class="text-center">{{ $t('notFound') }}</h1>
    </div>
  </div>
</template>
