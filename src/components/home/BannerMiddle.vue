<template>
  <div class="col-sm-12 nopadding">
    <div class="aspect-ratio aspect-ratio--8to3">
      <picture>
        <source srcset="../../assets/img/banners/man2-8to3.jpg" media="(min-width: 1200px)">
        <source srcset="../../assets/img/banners/man2-8to3.jpg" media="(min-width: 768px)">
        <img src="../../assets/img/banners/man2-8to3.jpg" class="img-responsive">
      </picture>
    </div>

    <div class="banner-text">
      <h4 class="banner-title">
        <img class="hidden-xs" src="../../assets/img/banners/sun-logo.png"/>
        <br/><br/>
        {{ $t('title') }}
      </h4>
      <p class="banner-subtitle">{{ $t('subtitle') }}</p>
      <p class="hidden-xs hidden-sm">{{ $t('description1') }}<br/><br/>{{ $t('description2') }}</p>
      <a class="btn banner-btn" href="/products/men-clothing-shirts">
        {{ $t('linkLabel') }}
      </a>
    </div>
  </div>
</template>

<i18n>
en:
  title: "Here comes the sun"
  subtitle: "FABULOUS EVERY DAY - SUMMER CHIC"
  description1: "Between rising temperature outside and cool A/C inside, dressing for the the
    summer can be a tricky business. Luckily, we pulled together the most inspiring looks for.
    Check out our must-to-have-it pieces."
  description2: "The weather is heating up, but you don’t have the right
    outfit yet. Thankfully, we are here to help you out. Spring break is upon us and it's
    essential to migrate. So whether you're jetting off to Ibiza or Majorca for a party vacation
    or getting away to greener pastures - here are the fashion pieces we'll be stashing in ourfavorite getaway bags."
  linkLabel: "Shop collection"
de:
  title: "Here comes the sun"
  subtitle: "FABULOUS EVERY DAY - SUMMER CHIC"
  description1: "Die Modetrends für den Sommer spielen mit Prints, Army- und Safarilooks
    sowie Pastel Farben. Accessoires wie runde Sonnenbrillen, geschnürte Stiefel und Shopper
    oder Handtaschen sorgen für Abwechslung. SUNRISE stellt Ihnen die Fashion Trends für den
    Sommer vor. Lassen Sie sich inspirieren!"
  description2: "Kaum ist der Frühling vorbei,
    umfängt uns der warme Sommer. Erfahren Sie, was die wichtigsten Fashion - Trends der
    kommenden Sommersaison sind und welche traumhaften Stücke Sie besitzen sollen! London,
    New York, Mailand, Paris – SUNRISE präsentiert die aktuelle Sommermode aus den Modemetropolen.
    Die neuesten Kleider, elegante Tops, Hosen, Bademode, exklusive Schuhe und Ballerinas,
    bezaubernden Schmuck, Sonnenbrillen und Accessoires für den perfekten Sommer."
  linkLabel: "Shop collection"
</i18n>
