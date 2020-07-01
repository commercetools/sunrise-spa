<style src="./CartLikeContentDetail.scss" lang="scss"></style>
<i18n src="./CartLikeContentDetail.txt"></i18n>
<script src="./CartLikeContentDetail.js"></script>

<template>
  <div class="table-content table-responsive cart-table-content">
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>{{$t('description')}}</th>
          <th>{{$t('price')}}</th>
          <th>{{$t('quantity')}}</th>
          <th>{{$t('total')}}</th>
        </tr>
      </thead>
      <LineItemInfo
        v-for="lineItem in cartLike.lineItems"
        :key="lineItem.id"
        data-test="cart-line-item"
        :lineItem="lineItem"
      />
    </table>
  </div>
</template>
