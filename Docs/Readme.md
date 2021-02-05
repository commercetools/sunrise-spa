# Fashion store front end web example

## On this page

- [Filter products](#Filter-products)
- [Locale and location](#Locale-and-Location)
- [Category menu](#Category-Menu)
- [Payment](#Payment)
- [Product item](#Product-Item)
- [Store selector](#Store-selector)
- [My orders](#My-orders)
- [Change password](#Change-password)
- [Discount codes](#Discount-codes)
- [Forgot password](#Forgot-password)
- [Pagination](#Pagination)
- [Return items](#Return-items)
- [Environment variables](#Environment-variables)

## Filter products

Show a list of products that can be filtered by facets, price range, category or location.

Facets have to be defined as attributes in product types data, for sunrise this is [size](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/product-type.json#L1229-L1242), [color](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/product-type.json#L1245-L1404) and [designer](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/product-type.json#L88-L971) the `isSearchable` property has to be true.

To indicate in the frontend what attributes are available for facet search you must add them to the [sunrise.config](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/sunrise.config.js#L75-L105). At the moment only enum, lenum, text and ltext attribute type are supported, if you have a different facet type then add support for them [here](https://github.com/commercetools/sunrise-spa/blob/f3114ca18ec192188476fa1ddf0c810c60e3f237/src/components/common/shared.js#L4-L13) and [here](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/src/api/products.js#L14-L20).

When a user clicks on a facet value it will emit a [changed](https://github.com/commercetools/sunrise-spa/blob/9268b886ac8a6f6c205064b47df2c8bb640039ef/src/components/productoverview/ProductFilter/Filters/shared.js#L9-L13) event that is [listened to](https://github.com/commercetools/sunrise-spa/blob/33ff99720181c8a6d790263f6c2250797b88bd6e/src/components/productoverview/ProductFilter/ProductFilter.vue#L16) by product filter and [handled](https://github.com/commercetools/sunrise-spa/blob/f3114ca18ec192188476fa1ddf0c810c60e3f237/src/components/productoverview/ProductFilter/ProductFilter.js#L68-L75) by adding filter values to the url query parameters.

Category filtering is implemented where the category slug is provided on the [route](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L92-L108). This value is used in [paramsFromComponent](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/src/api/products.js#L145-L148) function to create an api parameter to filter on category.

Values for filtering on currency, country, customerGroup and channel are provided in vuex store and read in [paramsFromComponent](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/src/api/products.js#L150-L155).

Value for locale (language of filter values and result) comes from a [helper function](https://github.com/commercetools/sunrise-spa/blob/f3114ca18ec192188476fa1ddf0c810c60e3f237/src/components/common/shared.js#L99) called in [paramsFromComponent](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/src/api/products.js#L157)

Price range filtering is [stored in the route query](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/src/api/products.js#L169).

## Locale and Location

Locale will show the site in the locale selected, for example German or English. Location will show products that are available in the selected location in the price for that location, for example USD if location is US.

Locales and locations should be stored in your project data as [countries](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/project.json#L6-L11) and [languages](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/project.json#L12-L15) and should be configured in sunrise.config as [countries](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/sunrise.config.js#L35-L38) and [languages](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/sunrise.config.js#L31-L34).

Values for locale and location are stored in the router as [country](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L40-L41) and [locale](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L42-L44).

The value is optional but when it is [missing](https://github.com/commercetools/sunrise-spa/blob/9c128fb0d1417493c02ed3758c8ded5e87249770/src/components/root/root.js#L13) in the url parameters then the value from the [vuex store or default](https://github.com/commercetools/sunrise-spa/blob/9c128fb0d1417493c02ed3758c8ded5e87249770/src/components/root/root.js#L14) is used.

When a user changes location or locale by [clicking](https://github.com/commercetools/sunrise-spa/blob/8efc4ae8190f0e587bb169682e06b4f505b2aa1f/src/components/header/LocationSelector/LocationSelector.vue#L9) on a new value the new value will be [stored in vuex](https://github.com/commercetools/sunrise-spa/blob/bac3cd78ffc576523b78c62895becba7d0e8410f/src/components/header/LocationSelector/LocationSelector.js#L11) and then [navigate](https://github.com/commercetools/sunrise-spa/blob/bac3cd78ffc576523b78c62895becba7d0e8410f/src/components/header/LocationSelector/LocationSelector.js#L12-L18) to the url with the new value.

Note that when you have items in your cart you cannot change location because if you would do this then you can't check out your cart as no valid shipping method can be found for carts that have items from mixed locations. This is not a limitation of the commercetools api but just a simplification of check out logic when all products on the cart are shipped to the same country.

## Category Menu

Shows a menu created from categories that when clicked on an item will show products of only that category.

Nested categories are [queried](https://github.com/commercetools/sunrise-spa/blob/a19ec0b61f1ddbf9c1f7e0253f8d0bebae3f3317/src/components/header/CategoriesMenu/defaultMenu/CategoriesMenu.js#L94-L127) 3 levels deep where the root level are categories that have [no parent](https://github.com/commercetools/sunrise-spa/blob/a19ec0b61f1ddbf9c1f7e0253f8d0bebae3f3317/src/components/header/CategoriesMenu/defaultMenu/CategoriesMenu.js#L99) category. These categories are then rendered as nested [router links](https://github.com/commercetools/sunrise-spa/blob/a19ec0b61f1ddbf9c1f7e0253f8d0bebae3f3317/src/components/header/CategoriesMenu/defaultMenu/CategoriesMenu.vue#L15-L22) the root level will open a menu when the mouse cursor hovers over it making the menu unusable for touch screen devices such as mobile.

To make your own mobile menu you can set a `VUE_APP_MENU_TYPE` value and according to this value [load a different menu](https://github.com/commercetools/sunrise-spa/blob/a19ec0b61f1ddbf9c1f7e0253f8d0bebae3f3317/src/components/header/CategoriesMenu/index.js#L2-L5). If using require to dynamically compile a component doesn't work (sometimes known to break in some cases) then you can [configure webpack](https://stackoverflow.com/a/65702131) to dynamically compile components.

Even though you can completely change all logic of the menu the [products route](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L92-L108) still treats the url parameter to be a category slug.

## Payment

Before a cart is saved as an order a payment needs to have been made.

Based on an environment variable a payment component is created at compile time, the default payment is [none](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/PaymentMethod/index.js#L3) that will not require you to pay.

A payment component will emit a [card-paid](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/PaymentMethod/None/None.js#L5-L6) at some point that is listened to by the [order overview component](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/OrderOverview/OrderOverview.vue#L61) and will be handled by [cardPaid](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/OrderOverview/OrderOverview.js#L42-L47) that will set payment id and paid. When paid is true it will show the [place order button](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/OrderOverview/OrderOverview.vue#L90-L101) and payment id is provided in the [complete-order](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/OrderOverview/OrderOverview.js#L54) event so the payment id can [be set on the cart](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/PageCheckout/PageCheckout.js#L73-L83).

One payment method that is implemented with a component is Adyen, more information how to set this up is [provided in the component](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/PaymentMethod/Adyen/Adyen.js#L1-L14).

## Product Item

Shows a single product with more details about the product.

The [product route](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L140-L153) will show a product details. In these details you can select a variant of the product such as color and size. You can configure what variant to select in product detail page in the [sunrise.config](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/sunrise.config.js#L114). In the config you can select [what attribute](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/sunrise.config.js#L115) to show in the title of the product and [what attributes](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/sunrise.config.js#L106-L113) to show in the product details.

You can add `preview=true` to the product detail url to show unpublished products or variants. For this to work you need to add `view_products` scope when you create the api client in merchant center.

## Store selector

Select a store and when a store is selected then show products from this store with the prices from this store.

Stores are channels, for a store to show up in google maps you have to give them a [geoLocation](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/channels.json#L31-L37). The component will list stores that are [found](https://github.com/commercetools/sunrise-spa/blob/1200f12fd885288ba6275ebc145ac8549c1ec388/src/components/stores/PageStoreLocator/PageStoreLocator.js#L177-L181) within a range of the selected location.

When a store is selected it will set store information in the [vuex store](https://github.com/commercetools/sunrise-spa/blob/1200f12fd885288ba6275ebc145ac8549c1ec388/src/components/stores/PageStoreLocator/PageStoreLocator.js#L68-L71) and [remove it](https://github.com/commercetools/sunrise-spa/blob/1200f12fd885288ba6275ebc145ac8549c1ec388/src/components/stores/PageStoreLocator/PageStoreLocator.js#L52-L53) when a store is unselected.

If a store is set in the vuex store then it will be used by the [product query](https://github.com/commercetools/sunrise-spa/blob/cec8f934cf88fff60722afc32b7237b5f462bd61/src/api/products.js#L154) so only products will be listed from selected store with price of that store.

When items are in your cart you cannot open select store to prevent a cart to contain products from different locations as that would over complicate checking out your cart (shipping methods and such).

## My orders

'My Orders' is a tab located in 'My Account' that shows information about user's orders.

[Order list](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L127-L131) is a child route of [user](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L110-L116) and shows a table of all the orders made by logged in user, it is not available for anonymous orders.

By clicking 'View' button it [opens](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L121-L123) details for the certain order. From here user can [Return item](#Return-items)

## Change password

@todo: will document once this is re implemented

Component [TabChangePassword](https://github.com/commercetools/sunrise-spa/tree/documentation/src/components/useraccount/TabChangePassword) uses [mutation](https://github.com/commercetools/sunrise-spa/blob/documentation/src/mixins/customerMixin.js#L27-L49) from customer mixin.

After entering old and new passwords and clicking 'Change Password' it runs the mutation and then [logs in](https://github.com/commercetools/sunrise-spa/blob/documentation/src/components/useraccount/TabChangePassword/TabChangePassword.js#L26) with new credentials using the login method from the [auth mixin](https://github.com/commercetools/sunrise-spa/blob/9328addb9b6f45100c4528b9a30a2efdd233dcd7/src/mixins/authMixin.js#L5-L7).

## Discount codes

Reusable component that allows to show and remove discount codes in 'CartLike' components like cart or order.

Component takes two parameters:

- **CartLike (Object)**: Object that contains cart or order details
- **editable (Boolean)**: when set `true` allows to remove discount codes, when set `false` it has read-only view

In order to apply a discount code in cart, [AddDiscountCodeForm](https://github.com/commercetools/sunrise-spa/tree/master/src/components/cartdetail/AddDiscountCodeForm) is used.

## Forgot password

Form to reset password at the login page.

[Serverless function](https://github.com/commercetools/sunrise-spa/blob/master/src/components/login/ForgotPassword/ForgotPassword.js#L21) on AWS is used to send the email with reset link.

It takes current project credentials to generate token and currently it will only work for client with `manage_customers` scope permission.

## Pagination

Reusable component that allows to have pages, for example in products list or orders.

It takes [3 parameters](https://github.com/commercetools/sunrise-spa/blob/89f03bf67bd06b69e74064f433b7c7aec89d04cf/src/components/common/Pagination/Pagination.js#L2):

- **pageSize**: number of items per page
- **total**: number of total items
- **page**: current page number

Component also [emits](https://github.com/commercetools/sunrise-spa/blob/master/src/components/common/Pagination/Pagination.js#L26-L34) `pagechanged` with changed current page as data so a consuming component can [listen to this event](https://github.com/commercetools/sunrise-spa/blob/cc366c2d55c00d342a0f17fbf21e83c0091ff127/src/components/productoverview/ProductList/ProductList.vue#L40) and [act accordingly](https://github.com/commercetools/sunrise-spa/blob/f3114ca18ec192188476fa1ddf0c810c60e3f237/src/components/productoverview/ProductList/ProductList.js#L190).

## Return items

Page shows order items that can be returned.

This can only work with `manage_orders` scope permission in the API client.

It sends all selected items with the [mutation](https://github.com/commercetools/sunrise-spa/blob/master/src/components/useraccount/TabReturn/TabReturn.js#L35-L50). After a successful update it will [show a modal](https://github.com/commercetools/sunrise-spa/blob/master/src/components/useraccount/TabReturn/TabReturn.js#L53) informing the user that the order was updated successfully.

## Environment variables

You can store environment variables in .env.local that will be used by the project.

The following come from merchant center [api client](https://docs.commercetools.com/tutorials/getting-started#creating-an-api-client) for mobile and single page application exported for `Sunrise spa`.

```
VUE_APP_CT_PROJECT_KEY
VUE_APP_CT_CLIENT_ID
VUE_APP_CT_CLIENT_SECRET
VUE_APP_CT_SCOPE
VUE_APP_CT_AUTH_HOST
VUE_APP_CT_API_HOST
```

`CT_CLIENT_ID` and `CT_CLIENT_SECRET` are the client id and secret from the api client used for cypress end to end testing.

`VUE_APP_PAGE_SIZE` defines [how many products](https://github.com/commercetools/sunrise-spa/blob/f3114ca18ec192188476fa1ddf0c810c60e3f237/src/components/productoverview/ProductList/ProductList.js#L139) and [how many orders](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/useraccount/TabOrderList/TabOrderList.js#L21) to show.

`VUE_APP_GOOGLE_MAPS_API_KEY` is the google maps api key used for the [store selector](https://github.com/commercetools/sunrise-spa/blob/bcbe407c79e63adb640ec18e0211dd9dced195a9/src/main.js#L24).

The [following values](https://github.com/commercetools/sunrise-spa/blob/a2b1759f0fdd26e076c0a6c2d9ce48e1c8f0d4d5/src/components/checkout/PaymentMethod/Adyen/Adyen.js#L7-L11) are used for Adyen payment configuration.

`VUE_APP_MENU_TYPE` can be used to tell the compiler to use [a different menu](https://github.com/commercetools/sunrise-spa/blob/a19ec0b61f1ddbf9c1f7e0253f8d0bebae3f3317/src/components/header/CategoriesMenu/index.js#L2-L5).
