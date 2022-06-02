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

Show a list of products that can be filtered by category, location, store or customer group.

Category filtering is implemented where the category slug is provided on the [route](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/router/routes.js#L33-L41). This value is passed to [ct/useProducts](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/ct/useProducts.js#L202).

The following logic is used to set [currency](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useCurrency.js), [country](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useLocation.js), [customerGroup](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useCustomerTools.js#L47-L51), [channel/store](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useSelectedChannel.js), [category slug](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useProducts.js#L38-L42), [sku](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useProducts.js#L46) (for single product), [search](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useSearch.js#L7), [locale](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useLocale.js), [pagination](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/usePaging.js) and [sorting](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useProducts.js#L13-L30).

Expand is used to [query](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/ct/useProducts.js#L9-L102) more detail from a product, this is used when querying for a [single product](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/presentation/fashion/PageProductDetail/PageProductDetail.js#L11)

## Locale and Location

Locale will show the site in the locale selected, for example German or English. Location will show products that are available in the selected location in the price for that location, for example USD if location is US.

Locales and locations should be stored in your project data as [countries](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/project.json#L6-L11) and [languages](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/project.json#L12-L15) and should be configured in sunrise.config as [countries](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/sunrise.config.js#L46-L49) and [languages](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/sunrise.config.js#L42-L45), make sure you define a [currency for every country](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/sunrise.config.js#L52-L65) and that products have prices in that currency/country. If you do not care for country and only want price selection on currency you can remove [that selection](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/ct/useProducts.js#L178).

Values for locale and country are stored in the [router](https://github.com/commercetools/sunrise-spa/blob/64a8e7191c64a91e7b103901e4ec3af893782794/src/router.js#L40-L41).

The value is optional but when it is [missing](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useDefaultRouteParams.js#L60-L81) from local storage or url then the first from [sunrise.config](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useDefaultRouteParams.js#L27-L44) is used.

Locale and location are set by [modifying a route paramater](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useDefaultRouteParams.js#L94-L113), changes are watched in the [root component](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useDefaultRouteParams.js#L87-L93) and saved to local storage.

Note that when you have items in your cart you cannot change location and store because if you would do this then you can't check out your cart as no valid shipping method can be found for carts that have items from mixed locations. This is not a limitation of the commercetools api but just a simplification of check out logic when all products on the cart are shipped to the same country.

## Category Menu

Shows a menu created from categories that when clicked on an item will show products of only that category.

Only [root categories](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/presentation/fashion/components/CategoriesMenu/defaultMenu/CategoriesMenu.js#L10) (categories with no parent) are [queried](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/ct/useCategories.js#L32) for the menu, if you would like a nested menu or different menu then you can create one [here](https://github.com/commercetools/sunrise-spa/tree/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/presentation/fashion/components/CategoriesMenu) and configure it to be used [here](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/presentation/fashion/components/CategoriesMenu/index.js) by setting an environment variable named `VUE_APP_MENU_TYPE`

Even though you can completely change all logic of the menu the [products route](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/router/routes.js#L34-L40) still treats the url parameter to be a category slug.

## Payment

Payment methods can be defined [here](https://github.com/commercetools/sunrise-spa/blob/171950e08fe0143a7b77a23a549d0b87780a3be9/src/presentation/fashion/PageCheckout/OrderOverview/PaymentMethod/PaymentMethod.js#L3-L14) after "Place Order" is clicked the cart will update with the addresses and then navigate to the [pay](https://github.com/commercetools/sunrise-spa/blob/171950e08fe0143a7b77a23a549d0b87780a3be9/src/presentation/fashion/PageCheckout/PageCheckout.js#L43-L46) route. This is handled in pay.js where it currently just [creates the order from cart](https://github.com/commercetools/sunrise-spa/blob/171950e08fe0143a7b77a23a549d0b87780a3be9/src/presentation/fashion/Pay/Pay.js#L20-L23) passing a method, this method is used to create a [payment](https://github.com/commercetools/sunrise-spa/blob/171950e08fe0143a7b77a23a549d0b87780a3be9/composition/useCartMutation.js#L85-L89), then [add the payment to the cart](https://github.com/commercetools/sunrise-spa/blob/171950e08fe0143a7b77a23a549d0b87780a3be9/composition/useCartMutation.js#L91-L99) and finally [create an order](https://github.com/commercetools/sunrise-spa/blob/171950e08fe0143a7b77a23a549d0b87780a3be9/composition/useCartMutation.js#L103-L105) from this cart.

## Product Item

Shows a single product with more details about the product.

The [product route](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/router/routes.js#L42-L50) will show a product details. In these details you can select a variant of the product such as color and size. You can configure what variant to select in product detail page in the [sunrise.config](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/sunrise.config.js#L167). In the config you can select [what attribute](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/sunrise.config.js#L168) to show in the title of the product and [what attributes](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/sunrise.config.js#L117-L166) to show in the product details.

## Store selector

Select a store and when a store is selected then show products from this store with the prices from this store.

Stores are channels, for a store to show up in google maps you have to give them a [geoLocation](https://github.com/commercetools/commercetools-sunrise-data/blob/master/data/channels.json#L31-L37). The component will list stores that are found within a [range distance](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/ct/useChannels.js#L38-L43) of the selected location.

When a store is selected it will set store information in the [local storage](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useSelectedChannel.js#L5-L9).

If a store is set then it will be used by the [product query](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/ct/useProducts.js#L179-L184) price selection so only products will be listed from selected store with price of that store.

When items are in your cart you cannot open select store to prevent a cart to contain products from different locations as that would over complicate checking out your cart (shipping methods and such).

Selecting stores only works when you have `view_products` [scope](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useAccessRules.js#L7-L19).

## My orders

'My Orders' is a tab located in 'My Account' that shows information about user's orders.

[Order list](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/router/routes.js#L113-L117) is a child route of [user](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/router/routes.js#L88-L129) and shows a table of all the orders created by logged in user, it is not available for anonymous orders.

By clicking 'View' button it [opens](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/router/routes.js#L103-L107) details for the certain order. From here user can [Return item](#Return-items)

## Change password

Component [TabChangePassword](https://github.com/commercetools/sunrise-spa/tree/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/presentation/fashion/User/TabChangePassword) calls [updateMyCustomerPassword](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useCustomerTools.js#L113-L128) that [mutates](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/ct/useCustomerTools.js#L162-L197) the customer record.

After entering old and new passwords and clicking 'Change Password' it runs the mutation and then [logs in](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/composition/useCustomerTools.js#L126) with new credentials using the login method from [auth](https://github.com/commercetools/sunrise-spa/blob/ff92ce46a7c5f40ddbaad0a949c59e93789dcc1b/src/apollo/auth.js#L121-L143).

## Discount codes

In order to apply a discount code in cart, [AddDiscountCodeForm](https://github.com/commercetools/sunrise-spa/tree/247dce6d042f23477a1eea24de3089451dfcf168/src/presentation/fashion/CartDetail/AddDiscountCodeForm) will call [applyDiscount](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/composition/useCartMutation.js#L145).

## Forgot password

Form to reset password at the login page.

When the user [ForgotPassword](https://github.com/commercetools/sunrise-spa/tree/247dce6d042f23477a1eea24de3089451dfcf168/src/presentation/fashion/Login/ForgotPassword) creates a [reset token](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/presentation/fashion/Login/ForgotPassword/ForgotPassword.js#L21). You need `manage_customers` scope to ask for this token. In a production environment this request would be made by your server and then that token will be used to email a reset password url to the client to reset their password. In the demo the reset password url will be opened when [we got the token](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/presentation/fashion/Login/ForgotPassword/ForgotPassword.js#L23-L26).

In the [reset password route](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/router/routes.js#L79-L87) a token is stored in a url parameter. When the user [submits the new password](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/presentation/fashion/User/ResetPassword/ResetPassword.vue#L20) that token will be used to [reset the password](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/presentation/fashion/User/ResetPassword/ResetPassword.js#L33-L37) and when the password is successfully reset the user will be [re routed](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/composition/useCustomerTools.js#L83-L88) to the login page.

## Pagination

Reusable hook/composition api that allows to have pages, for example in products list or orders.

It takes [2 parameters](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/composition/usePaging.js#L14):

- **pageSize**: number of items per page
- **page**: current page number

The component takes [3 parameters](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/presentation/fashion/components/Pagination/Pagination.js#L7-L23)

- **pageSize**: number of items per page
- **page**: current page number
- **total**: total number of items
- **setPage**: function to change current page

## Return items

Page shows order items that can be returned.

This can only work with [manage_orders](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/composition/useAccessRules.js#L23-L34) scope permission in the API client.

It sends all selected items with the [mutation](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/composition/useCustomerTools.js#L102-L103). After a successful update it will [evict the apollo cache](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/composition/useCustomerTools.js#L104-L106) and navigate to the [order detail](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/composition/useCustomerTools.js#L107-L110).

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

`VUE_APP_PAGE_SIZE` sets [DEFAULT_PAGE_SIZE](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/constants.js#L6-L8) that is used in page size for product list and order list.

`VUE_APP_GOOGLE_MAPS_API_KEY` configures the google maps [api key](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/main.js#L19) used for the [store selector](https://github.com/commercetools/sunrise-spa/blob/247dce6d042f23477a1eea24de3089451dfcf168/src/presentation/fashion/Stores/StoreLocator.vue#L9-L20).
