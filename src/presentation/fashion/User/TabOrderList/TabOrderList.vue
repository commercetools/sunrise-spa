<style src="./TabOrderList.scss" lang="scss"></style>
<i18n src="./TabOrderList.txt" lang="yaml"></i18n>
<script src="./TabOrderList.js"></script>

<template>
  <div class="myaccount-content">
    <h3>{{ t('orders') }}</h3>
    <Spinner v-if="loading" />
    <div
      class="myaccount-table table-responsive text-center"
      v-else-if="orderListNotEmpty"
    >
      <table class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th>{{ t('date') }}</th>
            <th>{{ t('total') }}</th>
            <th>{{ t('paymentStatus') }}</th>
            <th>{{ t('shipmentStatus') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.orderId"
            data-test="order-list"
          >
            <td data-test="order-date">
              <!-- @todo: base date is not working i18n error -->
              <BaseDate
                :date="order.createdAt"
                :format="'short'"
              />
            </td>
            <td data-test="total-price">
              <BaseMoney :money="order.totalPrice" />
            </td>
            <td data-test="payment-state">
              {{ paymentInfo(order) }}
            </td>
            <td data-test="shipment-state">
              {{ translateStatus(order.shipmentState) }}
            </td>
            <td>
              <router-link
                :to="{
                  name: 'order',
                  params: { id: order.orderId },
                }"
                data-test="view-order-btn"
              >
                {{ t('view') }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :total="total"
        :page="page"
        :setPage="setPage"
      />
    </div>
    <div v-else data-test="empty-order-list">
      <span>
        {{ t('emptyOrders') }}
      </span>
    </div>
  </div>
</template>
