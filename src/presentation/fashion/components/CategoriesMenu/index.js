let menu = false;
//example of setting other menu types
// if (process.env.VUE_APP_MENU_TYPE === "2") {
//   menu = require("./manyCategories/ManyCategories.vue")
//     .default;
// }
if (menu === false) {
  //default menu if env is missing
  menu =
    require('./defaultMenu/CategoriesMenu.vue').default;
}
export default menu;
