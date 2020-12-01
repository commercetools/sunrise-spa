<script src="./SubscriptionSelector.js"></script>
<style src="./SubscriptionSelector.scss" lang="scss" scoped></style>

<template>
    <div v-if="subscription"> 
        <div class="row">
          <div class="col-sm-12"><p>&nbsp;</p></div>
        </div>
        <div class="row">
          <div class="col-sm-1">           
            <input class="subscription-radio"
                   v-on:change="$emit('set-subscribe', $event.target.value)" 
                   type="radio" 
                   id="subscribe-onetime" 
                   v-model="subscribe" 
                   name="subscribe" 
                   value="0" 
                   checked="checked" >
          </div>
          <div class="col-sm-5">One-time purchase</div>
        </div>
        <div class="row">
          <div class="col-sm-1">
              <input class="subscription-radio"
                     v-on:change="$emit('set-subscribe', $event.target.value)" 
                     type="radio" 
                     id="subscribe-multiple" 
                     v-model="subscribe" 
                     name="subscribe" 
                     value="1">
          </div>
          <div class="col-sm-5">
               Subscription
          </div>
        </div>
        <div v-if="subscribe==='1'" class="row">
          <div class="col-sm-12">
            <div class="ad-deliver-text">
              <strong>Frequency: &nbsp;&nbsp;</strong>
              <select class="frequency-select"
                      v-on:change="$emit('set-frequency', $event.target.value)" 
                      name="frequency" 
                      id="frequency">
                <option value="14">Every 2 Weeks</option>
                <option value="28">Every 4 Weeks</option>
                <option value="42">Every 6 Weeks</option>
                <option value="56">Every 8 Weeks</option>
                <option value="70">Every 10 Weeks</option>
                <option value="84">Every 12 Weeks</option>
              </select>
            </div>

          </div>
        </div>
      </div>


</template>
