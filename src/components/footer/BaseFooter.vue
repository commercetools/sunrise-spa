<template>
  <div>
    <slot/>
    <div class="sub-footer">
      <div class="container">
        <div class="row text-uppercase">
          <div class="col-sm-12">
            <ul class="footer-title imprint-row">
              <li class="hidden-xs">© 2019 Sunrise</li>
              <li><a href="#">{{ $t("imprint") }}</a></li>
              <li><a href="#">{{ $t("privacyPolicy") }}</a></li>
              <li><a href="#">{{ $t("termsOfUse") }}</a></li>
              <li class="visible-xs">© 2019 Sunrise</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
en:
  imprint: "Imprint"
  privacyPolicy: "Privacy policy"
  termsOfUse: "Terms of use"
de:
  imprint: "Impressum"
  privacyPolicy: "Datenschutz"
  termsOfUse: "AGB"
</i18n>
