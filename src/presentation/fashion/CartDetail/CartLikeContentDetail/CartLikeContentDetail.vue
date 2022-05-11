<style
  src="./CartLikeContentDetail.scss"
  lang="scss"
></style>
<i18n src="./CartLikeContentDetail.txt" lang="yaml"></i18n>
<script src="./CartLikeContentDetail.js"></script>

<template>
  <div
    class="table-content table-responsive cart-table-content"
  >
    <table>
      <thead>
        <tr>
          <th style="width: 10%" v-if="selectable"></th>
          <th v-if="editable"></th>
          <th></th>
          <th>{{ t('description') }}</th>
          <th v-if="!selectable && !returnedItem">
            {{ t('price') }}
          </th>
          <th>{{ t('quantity') }}</th>
          <th v-if="!selectable && !returnedItem">
            {{ t('total') }}
          </th>
          <th v-if="returnedItem">
            {{ t('returnStatus') }}
          </th>
        </tr>
      </thead>
      <LineItemInfo
        :editable="editable"
        :returnedItem="returnedItem"
        :selectable="selectable"
        v-for="lineItem in cart.lineItems"
        :key="lineItem.id"
        :lineItem="lineItem"
        :discount="lineItem.price.discount"
        @select-return-item="selectReturnItem"
        @unselect-return-item="unselectReturnItem"
        data-test="cart-line-item"
      />
    </table>
  </div>
</template>
