<template>
  <div class="row">
    <div class="col-sm-5 text-left footer-title-yellow">
      <p>{{ $t("joinNewsletter") }}</p>
    </div>
    <div class="col-sm-7">
      <form action="#" method="POST" id="form-newsletter" class="email-submit">
        <!--<input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/>-->
        <input name="email" id="newsletter-input" class="email-box" type="email"
               :placeholder="$t('yourEmail')" required>
        <button id="newsletter-button" type="submit" class="search-button">
          <span class="icon-font icon-next"></span>
          <span class="sr-only">{{ $t("subscribe") }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<i18n>
en:
  joinNewsletter: "Join our newsletter"
  subscribe: "Subscribe"
  yourEmail: "Your email..."
de:
  joinNewsletter: "Newsletter abonnieren"
  subscribe: "Anmelden"
  yourEmail: "Ihre E-Mail-Adresse..."
</i18n>
