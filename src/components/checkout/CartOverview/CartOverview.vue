<style src="./CartOverview.scss" lang="scss" scoped></style>
<i18n src="./CartOverview.txt"></i18n>
<script src="./CartOverview.js"></script>

<template>
  <!-- <div v-if="me && me.activeCart">
    <div class="order-summary">
      <span class="text-uppercase order-summary-title">{{ $t("orderSummary") }}:</span>
      <span class="checkout-total-items">
        {{ $tc('itemsTotal', totalItems) }}
      </span>
    </div>
    <div class="checkout-order">
      <VuePerfectScrollbar>
        <div class="order-summary-items">
          <div v-for="lineItem in sortedLineItems"
               :key="lineItem.id"
               class="order-summary-item">
            <LineItemInfo :line-item="lineItem"
                          class="line-item-info"/>
            <div class="order-item-price">
              <div class="row">
                <div class="col-xs-3">
                  <div class="text-right">
                    <span class="text-uppercase pricing-titles">{{ $t("quantity") }}</span>
                    <br>
                    <span>{{ lineItem.quantity }}</span>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="text-right order-item-value">
                    <span class="text-uppercase pricing-titles">{{ $t("price") }}</span>
                    <br>
                    <BasePrice :price="lineItem.price"/>
                  </div>
                </div>
                <div class="col-xs-5">
                  <div class="text-right order-item-value">
                    <span class="text-uppercase pricing-titles">{{ $t("total") }}</span>
                    <br>
                    <BasePrice :price="totalPrice(lineItem)"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
      <CartLikePriceDetail :cart-like="me.activeCart"
                           :editable="true"/>
      <div class="row">
        <span class="text-uppercase pull-right edit-quantity-order">
          <router-link :to="{ name: 'cart' }">{{ $t("editMyCart") }}</router-link>
        </span>
      </div>
    </div>
  </div> -->
  <div class="your-order-area">
    <h3>Your order</h3>
    <div class="your-order-wrap gray-bg-4">
      <div class="your-order-info-wrap">
        <div class="your-order-info">
          <ul>
            <li>
              Product
              <span>Total</span>
            </li>
          </ul>
        </div>
        <div class="your-order-middle">
          <div
            v-for="lineItem in sortedLineItems"
            :key="lineItem.id"
            class="single-order-middle"
          >
            <div class="single-order-content">
              <h5>
                {{ lineItem.name }}
                <span>× {{ lineItem.quantity }}</span>
              </h5>
              <!-- <span>Vendor:HasTech</span> -->
            </div>
            <div class="single-order-price">
              <span><BasePrice :price="totalPrice(lineItem)"/></span>
            </div>
          </div>
        </div>
        <div class="your-order-info order-subtotal">
          <ul>
            <li>
              Subtotal
              <span>$329</span>
            </li>
          </ul>
        </div>
        <div class="checkout-shipping-content">
          <div class="shipping-content-left">
            <span>Shipping</span>
          </div>
          <div class="shipping-content-right">
            <ul>
              <li>
                <input
                  type="radio"
                  name="shipping"
                  value="info"
                  checked="checked"
                />
                Flat rate: $2.00
              </li>
              <li>
                <input type="radio" name="shipping" value="info2" />Free
                shipping
              </li>
              <li>
                <input type="radio" name="shipping" value="info3" />Local
                pickup: $0.00
              </li>
            </ul>
          </div>
        </div>
        <div class="your-order-info order-total">
          <ul>
            <li>
              Total
              <span>$273.00</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="payment-method">
        <div class="pay-top sin-payment">
          <input
            id="payment_method_1"
            class="input-radio"
            type="radio"
            value="cheque"
            checked="checked"
            name="payment_method"
          />
          <label for="payment_method_1">Direct Bank Transfer</label>
          <div class="payment-box payment_method_bacs">
            <p>
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
          </div>
        </div>
        <div class="pay-top sin-payment">
          <input
            id="payment-method-2"
            class="input-radio"
            type="radio"
            value="cheque"
            name="payment_method"
          />
          <label for="payment-method-2">Check payments</label>
          <div class="payment-box payment_method_bacs">
            <p>
              Please send a check to Store Name, Store Street, Store Town, Store
              State / County, Store Postcode.
            </p>
          </div>
        </div>
        <div class="pay-top sin-payment">
          <input
            id="payment-method-3"
            class="input-radio"
            type="radio"
            value="cheque"
            name="payment_method"
          />
          <label for="payment-method-3">Cash on delivery</label>
          <div class="payment-box payment_method_bacs">
            <p>Pay with cash upon delivery.</p>
          </div>
        </div>
      </div>
      <div class="condition-wrap">
        <p>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our
          <a href="#">privacy policy</a>.
        </p>
        <div class="condition-form mb-25">
          <input type="checkbox" />
          <span>
            I have read and agree to the website
            <a href="#">terms and conditions</a>
            <span class="star">*</span>
          </span>
        </div>
      </div>
    </div>
    <div class="Place-order mt-30">
      <a href="#">Place Order</a>
    </div>
  </div>
</template>
