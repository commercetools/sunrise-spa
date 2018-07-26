<template>
  <footer>
    <div class="footer">
      <div id="footer" class="container">
        <div class="row text-uppercase">
          <div class="col-sm-2">
            <div class="footer-col">
              <ul>
                <li class="footer-title hidden-xs">{{ $t("main.footer.customerCare") }}</li>
                <li><a href="#">{{ $t("main.footer.contactUs") }}</a></li>
                <li><a href="#">{{ $t("main.footer.help") }}</a></li>
                <li><a href="#">{{ $t("main.footer.shipping") }}</a></li>
                <li><a href="#">{{ $t("main.footer.returns") }}</a></li>
                <li><a href="#">{{ $t("main.footer.sizeGuide") }}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-2 hidden-xs">
            <div class="footer-col">
              <ul>
                <li class="footer-title hidden-xs">{{ $t("main.footer.aboutUs") }}</li>
                <li><a href="#">{{ $t("main.footer.ourStory") }}</a></li>
                <li><a href="#">{{ $t("main.footer.careers") }}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-2 hidden-xs">
            <div class="footer-col">
              <ul>
                <li class="footer-title hidden-xs">{{ $t("main.footer.shortcuts") }}</li>
                <li><a href="#">{{ $t("main.footer.myAccount") }}</a></li>
                <li><a href="#">{{ $t("main.footer.storeLocator") }}</a></li>
                <li><a href="#">{{ $t("main.footer.giftCards") }}</a></li>
                <li><a href="#">{{ $t("main.footer.payment") }}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 text-center newsletter-box">
            <div class="row">
              <div class="col-sm-5 text-left footer-title-yellow">
                <p>{{ $t("main.footer.joinNewsletter") }}</p>
              </div>
              <div class="col-sm-7">
                <form action="#" method="POST" id="form-newsletter" class="email-submit">
                  <!--<input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/>-->
                  <input name="email" id="newsletter-input" class="email-box" type="email"
                         :placeholder="$t('main.footer.yourEmail')" required>
                  <button id="newsletter-button" type="submit" class="search-button">
                    <span class="icon-font icon-next"></span>
                    <span class="sr-only">{{ $t("main.footer.subscribe") }}</span>
                  </button>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-8 text-left card-info footer-title">
                <p>{{ $t("main.footer.paySecure") }}</p>
                <img src="../assets/img/cards.png" alt="payment types"
                     class="img-responsive payment-cards"/>
              </div>
              <div class="col-sm-4 text-left card-info footer-title">
                <p>{{ $t("main.footer.followUs") }}</p>
                <ul class="social-icons">
                  <li><a href="#">
                    <img class="social-icon" src="../assets/img/Facebook.png" alt="Facebook">
                  </a></li>
                  <li><a href="#">
                    <img class="social-icon" src="../assets/img/Pinterest.png" alt="Pinterest">
                  </a></li>
                  <li><a href="#">
                    <img class="social-icon" src="../assets/img/Google.png" alt="Google+">
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
              <li class="hidden-xs">{{ $t("main.footer.legalInfo") }}</li>
              <li><a href="#">{{ $t("main.footer.imprint") }}</a></li>
              <li><a href="#">{{ $t("main.footer.privacyPolicy") }}</a></li>
              <li><a href="#">{{ $t("main.footer.termsOfUse") }}</a></li>
              <li class="visible-xs">{{ $t("main.footer.legalInfo") }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
