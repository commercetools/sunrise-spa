<template>
  <div>
    <!-- <fieldset class="rating">
      <input type="radio" id="rating{{index}}-star5" name="rating" value="5" {{#if product.rating5}}checked{{/if}}/>
      <label for="rating{{index}}-star5" title="{{ $t('ratings.description5') }}">
        {{ $t('ratings.text5') }}
      </label>
      <input type="radio" id="rating{{index}}-star4" name="rating" value="4" {{#if product.rating4}}checked{{/if}} />
      <label for="rating{{index}}-star4" title="{{ $t('ratings.description4') }}">
        {{ $t('catalog:ratings.text4') }}
      </label>
      <input type="radio" id="rating{{index}}-star3" name="rating" value="3" {{#if product.rating3}}checked{{/if}} />
      <label for="rating{{index}}-star3" title="{{ $t('ratings.description3') }}">
        {{ $t('ratings.text3') }}
      </label>
      <input type="radio" id="rating{{index}}-star2" name="rating" value="2" {{#if product.rating2}}checked{{/if}} />
      <label for="rating{{index}}-star2" title="{{ $t('ratings.description2') }}">
        {{ $t('ratings.text2') }}
      </label>
      <input type="radio" id="rating{{index}}-star1" name="rating" value="1" {{#if product.rating1}}checked{{/if}} />
      <label for="rating{{index}}-star1" title="{{ $t('ratings.description1') }}">
        {{ $t('ratings.text1') }}
      </label>
    </fieldset> -->
    <!-- <span class="star-rating-review">
      <a> -->
         <!-- href="{{@root.meta._links.addReview.href}}" -->
        <!-- {{ $t('reviews.write') }}
      </a>
    </span> -->
  </div>
</template>

<script>
export default {

};
</script>

<i18n>
en:
  ratings:
    text5: "5 stars"
    text4: "4 stars"
    text3: "3 stars"
    text2: "2 stars"
    text1: "1 star"
    description5: "Rocks!"
    description4: "Pretty good"
    description3: "Meh"
    description2: "Kinda bad"
    description1: "Sucks big time"
de:
  ratings:
    text5: "5 Sterne"
    text4: "4 Sterne"
    text3: "3 Sterne"
    text2: "2 Sterne"
    text1: "1 Stern"
    description5: "Rocks!"
    description4: "Pretty good"
    description3: "Meh"
    description2: "Kinda bad"
    description1: "Sucks big time"
</i18n>
