# SUNRISE as a Single-Page Application

[![CircleCI](https://circleci.com/gh/commercetools/sunrise-spa.svg?style=svg)](https://circleci.com/gh/commercetools/sunrise-spa)
[![Netlify Status](https://api.netlify.com/api/v1/badges/40ae8067-e59d-4c71-a232-8f0b222bc291/deploy-status)](https://app.netlify.com/sites/sunrise/deploys)

## Demo
https://sunrise.netlify.com/

## Deploy it on Netlify
[Netlify](https://www.netlify.com/) allows you to clone the repository, configure the project with your own data and deploy it, all in one click.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/commercetools/sunrise-spa)

## Run it locally 

Steps   | with [Yarn](https://yarnpkg.com/)  | with [NPM](https://www.npmjs.com/) |
------- | ---------------------------------- | ---------------------------------- |
Install | `yarn install`                     | `npm install`                      |
Run     | `yarn serve`                       | `npm run serve`                    |


## How to use your own project data
SUNRISE comes with some read-only data set by default that you can use. But if you need to use a different set of data or to manage the project via [Merchant Center](https://mc.commercetools.com/), then you'll need to connect SUNRISE to your own commercetools project.

Once you have created your commercetools project and populated it with data, follow the next steps to connect to it.

### 1. Create an API client for a SPA
In the [Merchant Center](https://mc.commercetools.com/), go to the [New API Client](https://mc.commercetools.com/sunrise-spa-ci/settings/developer/api-clients/now) section (`Settings` > `Developer Settings` > `API Clients` > `Create New API Client`). Enter a descriptive name for your new API client and select the template `Mobile & single-page application client`. Once you have filled the form, submit it by clicking on `Create API Client`, you should now be able to see your project credentials. Don't close the window yet!

> **:warning: Always use an API client suited for single-page applications (SPA), as your credentials will be publicly accessible through the browser.**

### 2. Configure SUNRISE with your API client
Below the credentials, you should see a dropdown with different technologies: select `Sunrise SPA` and click on the download button. This will download a file named `.env.local` with your credentials, which you should place in the root folder of your SUNRISE SPA project.

> **:warning: Make sure the downloaded file is called exactly `.env.local`, as browsers may remove the initial dot and apply further modifications to the filename.**

This will set up the necessary environment variables required to run SUNRISE SPA.

## Development tips

### Add any queried fields to the mutation
When executing a mutation (e.g. to update the active cart), we receive as a response the updated resource, which Apollo then uses to update the cached data in Apollo store. It is thanks to this cache that all components are able to display the same information, even after mutations. 

But when we under-fetch in the mutation and fail to update some cached fields we are displaying in a component, this component will not be updated at all with any new data. To avoid that, make sure to add any field you are querying in the mutation. The update mutations are found in the methods `updateMyCart` and `updateMyCustomer`.

Related issue: https://github.com/apollographql/apollo-client/issues/3267


## Run tests
The project has unit and end-to-end tests covering each functionality. Unit tests will run out of the box, but end-to-end tests require some further configuration, explained in the section below.

Test   | with [Yarn](https://yarnpkg.com/)  | with [NPM](https://www.npmjs.com/) |
------- | ---------------------------------- | ---------------------------------- |
Unit | `yarn test:unit`                     | `npm run test:unit`                      |
End-to-end     | `yarn test:e2e`                       | `npm run test:e2e`                    |

### Configure end-to-end tests
In order to continue, it is necessary that you have full control over the commercetools project associated with SUNRISE.

Follow the same steps explained in the section [How to use your own project data](#how-to-use-your-own-project-data) to create a second API client, but this time create it with the `Admin client` template instead. Then add your new client ID and secret as the following environment variables (e.g. in `.env.local` file): 

```shell
CYPRESS_CT_CLIENT_ID=<your client ID>
CYPRESS_CT_CLIENT_SECRET=<your client secret>
```
