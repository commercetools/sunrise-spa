<style src="./PageCheckout.scss" lang="scss"></style>
<script src="./PageCheckout.js"></script>

<template>
  <div class="checkout-main-area pt-130 pb-100">
    <div class="container">
      <div class="customer-zone mb-20">
        <p class="cart-page-title">
          Returning customer?
          <a class="checkout-click" href @click.prevent="showLogin = !showLogin"
            >Click here to login</a
          >
        </p>
        <div v-if="showLogin" class="checkout-login-info">
          <p>
            If you have shopped with us before, please enter your details in the
            boxes below. If you are a new customer, please proceed to the
            Billing & Shipping section.
          </p>
          <form action="#">
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <div class="sin-checkout-login">
                  <label>
                    Username or email
                    <span>*</span>
                  </label>
                  <input type="text" name="user-name" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="sin-checkout-login">
                  <label>
                    Passwords
                    <span>*</span>
                  </label>
                  <input type="password" name="user-password" />
                </div>
              </div>
            </div>
            <div class="button-remember-wrap">
              <button class="button" type="submit">Login</button>
              <div class="checkout-login-toggle-btn">
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
            </div>
            <div class="lost-password">
              <a href="#">Lost your password?</a>
            </div>
          </form>
        </div>
      </div>
      <div class="customer-zone mb-30">
        <p class="cart-page-title">
          Have a coupon?
          <a
            class="checkout-click-2"
            href
            @click.prevent="showCoupon = !showCoupon"
            >Click here to enter your code</a
          >
        </p>
        <div v-if="showCoupon" class="checkout-login-info-2">
          <p>If you have a coupon code, please apply it below.</p>
          <form action="#">
            <input type="text" placeholder="Coupon code" />
            <input type="submit" value="Apply Coupon" />
          </form>
        </div>
      </div>
      <div class="checkout-wrap">
        <div class="row">
          <div class="col-lg-7">
            <div class="billing-info-wrap mr-100">
              <h3>Billing Details</h3>
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="billing-info mb-25">
                    <label>
                      First name
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <input type="text" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="billing-info mb-25">
                    <label>
                      Last name
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <input type="text" />
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="billing-info mb-25">
                    <label>
                      Company name (optional)
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <input type="text" />
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="billing-select mb-25">
                    <label>
                      Country
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <select class="select-active">
                      <option>Azerbaijan</option>
                      <option>Bahamas</option>
                      <option>Bahrain</option>
                      <option>Bangladesh</option>
                      <option>Barbados</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="billing-info mb-25">
                    <label>
                      Street address
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <input
                      class="billing-address"
                      placeholder="House number and street name"
                      type="text"
                    />
                    <input
                      placeholder="Apartment, suite, unit etc. (optional)"
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="billing-info mb-25">
                    <label>
                      Town / City
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <input type="text" />
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="billing-select mb-25">
                    <label>
                      District
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <select class="select-active">
                      <option>Azerbaijan</option>
                      <option>Bahamas</option>
                      <option>Bahrain</option>
                      <option>Bangladesh</option>
                      <option>Barbados</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12">
                  <div class="billing-info mb-25">
                    <label>
                      Postcode / ZIP (optional)
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <input type="text" />
                  </div>
                </div>
                <div class="col-lg-12 col-md-12">
                  <div class="billing-info mb-25">
                    <label>
                      Phone
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <input type="text" />
                  </div>
                </div>
                <div class="col-lg-12 col-md-12">
                  <div class="billing-info mb-25">
                    <label>
                      Email Address
                      <abbr class="required" title="required">*</abbr>
                    </label>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <!-- <div class="checkout-account">
                <input class="checkout-toggle2" type="checkbox" />
                <span>Create an account?</span>
              </div>
              <div class="checkout-account-toggle open-toggle2 mb-30">
                <label>
                  Create account password
                  <abbr class="required" title="required">*</abbr>
                </label>
                <input placeholder="Password" type="password" />
              </div> -->
              <div class="checkout-account mt-20">
                <input class="checkout-ship" type="checkbox" />
                <span>Ship to a different address?</span>
              </div>
              <div class="different-address checkout-ship-open mt-30">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <div class="billing-info mb-25">
                      <label>
                        First name
                        <abbr class="required" title="required">*</abbr>
                      </label>
                      <input type="text" />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="billing-info mb-25">
                      <label>
                        Last name
                        <abbr class="required" title="required">*</abbr>
                      </label>
                      <input type="text" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="billing-info mb-25">
                      <label>
                        Company name (optional)
                        <abbr class="required" title="required">*</abbr>
                      </label>
                      <input type="text" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="billing-select mb-25">
                      <label>
                        Country
                        <abbr class="required" title="required">*</abbr>
                      </label>
                      <select class="select-active">
                        <option>Azerbaijan</option>
                        <option>Bahamas</option>
                        <option>Bahrain</option>
                        <option>Bangladesh</option>
                        <option>Barbados</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="billing-info mb-25">
                      <label>
                        Street address
                        <abbr class="required" title="required">*</abbr>
                      </label>
                      <input
                        class="billing-address"
                        placeholder="House number and street name"
                        type="text"
                      />
                      <input
                        placeholder="Apartment, suite, unit etc. (optional)"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="billing-info mb-25">
                      <label>
                        Town / City
                        <abbr class="required" title="required">*</abbr>
                      </label>
                      <input type="text" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="billing-select mb-25">
                      <label>
                        District
                        <abbr class="required" title="required">*</abbr>
                      </label>
                      <select class="select-active">
                        <option>Azerbaijan</option>
                        <option>Bahamas</option>
                        <option>Bahrain</option>
                        <option>Bangladesh</option>
                        <option>Barbados</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <div class="billing-info mb-25">
                      <label>
                        Postcode / ZIP (optional)
                        <abbr class="required" title="required">*</abbr>
                      </label>
                      <input type="text" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="additional-info-wrap">
                <label>Order notes (optional)</label>
                <textarea
                  placeholder="Notes about your order, e.g. special notes for delivery. "
                  name="message"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <CartOverview />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
