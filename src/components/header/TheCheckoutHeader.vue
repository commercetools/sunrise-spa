<template>
  <div class="checkout-header">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-xs-12">
          <router-link to="/"
                       class="brand-logo">
            <img src="../../assets/img/logo-white-text.svg"
                 alt="SUNRISE"
                 class="img-responsive checkout-header-logo"/>
          </router-link>
        </div>
        <div class="col-sm-8 col-xs-12">
          <div class="checkout-header-callus">
            <span class="">{{ $t('needHelp') }}</span>
            <span class="checkout-header-number">
              <img src="../../assets/img/phone.png"
                   alt="phone icon"
                   class="phone-icon"/>
              +49 899982996-0
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
en:
  needHelp: "Need help? Customer Service"
de:
  needHelp: "Brauchen Sie Hilfe? Kundenservice"
</i18n>
