import None from "./None/None.vue";

let Payment = None;
if (process.env.VUE_APP_USE_ADYEN) {
  Payment = require("./Adyen/Adyen.vue").default;
}
export default Payment;
