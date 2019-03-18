<template>
  <footer>
    <div class="footer">
      <div id="footer" class="container">
        <div class="row text-uppercase">
          <div class="col-sm-2">
            <div class="footer-col">
              <ul>
                <li class="footer-title hidden-xs">{{ $t("customerCare") }}</li>
                <li>
                  <a href="tel:0044123456000"
                   class="link-hotline">
                   {{ $t("callUs") }}
                  </a>
                </li>
                <li><a href="#">{{ $t("help") }}</a></li>
                <li><a href="#">{{ $t("shipping") }}</a></li>
                <li><a href="#">{{ $t("returns") }}</a></li>
                <li><a href="#">{{ $t("sizeGuide") }}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-2 hidden-xs">
            <div class="footer-col">
              <ul>
                <li class="footer-title hidden-xs">{{ $t("aboutUs") }}</li>
                <li><a href="#">{{ $t("ourStory") }}</a></li>
                <li><a href="#">{{ $t("careers") }}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-2 hidden-xs">
            <div class="footer-col">
              <ul>
                <li class="footer-title hidden-xs">{{ $t("shortcuts") }}</li>
                <li><a href="#">{{ $t("myAccount") }}</a></li>
                <li><a href="#">{{ $t("storeLocator") }}</a></li>
                <li><a href="#">{{ $t("giftCards") }}</a></li>
                <li><a href="#">{{ $t("payment") }}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 text-center newsletter-box">
            <NewsletterForm/>
            <div class="row">
              <div class="col-sm-8 text-left card-info footer-title">
                <p>{{ $t("paySecure") }}</p>
                <img src="../../assets/img/cards.png" alt="payment types"
                     class="img-responsive payment-cards"/>
              </div>
              <div class="col-sm-4 text-left card-info footer-title">
                <p>{{ $t("followUs") }}</p>
                <ul class="social-icons">
                  <li><a href="#">
                    <img class="social-icon" src="../../assets/img/Facebook.png" alt="Facebook">
                  </a></li>
                  <li><a href="#">
                    <img class="social-icon" src="../../assets/img/Pinterest.png" alt="Pinterest">
                  </a></li>
                  <li><a href="#">
                    <img class="social-icon" src="../../assets/img/Google.png" alt="Google+">
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-footer">
      <div class="container">
        <div class="row text-uppercase">
          <div class="col-sm-12">
            <ul class="footer-title imprint-row">
              <li class="hidden-xs">{{ $t("legalInfo") }}</li>
              <li><a href="#">{{ $t("imprint") }}</a></li>
              <li><a href="#">{{ $t("privacyPolicy") }}</a></li>
              <li><a href="#">{{ $t("termsOfUse") }}</a></li>
              <li class="visible-xs">{{ $t("legalInfo") }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import NewsletterForm from './NewsletterForm.vue';

export default {
  components: {
    NewsletterForm,
  },
};
</script>

<i18n>
en:
  paySecure: "Pay securely with these payment methods"
  followUs: "Follow us"
  customerCare: "Customer Care"
  contactUs: "Contact Us"
  help: "Help"
  shipping: "Shipping"
  returns: "Returns"
  sizeGuide: "Size Guide"
  aboutUs: "About Us"
  ourStory: "Our Story"
  careers: "Careers"
  shortcuts: "Shortcuts"
  myAccount: "My Account"
  storeLocator: "Store Locator"
  giftCards: "Gift Cards"
  payment: "Payment"
  legalInfo: "© 2015 Sunrise"
  imprint: "Imprint"
  privacyPolicy: "Privacy policy"
  termsOfUse: "Terms of use"
  callUs: "Call us on +44 123 456 000"
de:
  paySecure: "Sicher zahlen"
  followUs: "Follow us"
  customerCare: "Kundenservice"
  contactUs: "Kontaktieren Sie uns"
  help: "Hilfe"
  shipping: "Versand"
  returns: "Retoure"
  sizeGuide: "Größentabelle"
  aboutUs: "Über uns"
  ourStory: "Unsere Geschichte"
  careers: "Karriere"
  shortcuts: "Shortcuts"
  myAccount: "Mein Konto"
  storeLocator: "Filiale suchen"
  giftCards: "Geschenkkarten"
  payment: "Zahlung"
  legalInfo: "© 2015 Sunrise"
  imprint: "Impressum"
  privacyPolicy: "Datenschutz"
  termsOfUse: "AGB"
  callUs: "Rufen Sie uns auf +44 123 456 000 an"
</i18n>
