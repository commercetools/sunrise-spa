# SUNRISE as a Single-Page Application

[![CircleCI](https://circleci.com/gh/commercetools/sunrise-spa.svg?style=svg)](https://circleci.com/gh/commercetools/sunrise-spa)

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
In the [Merchant Center](https://mc.commercetools.com/), select your project and go to `Settings`, then click on `Developer Settings` section. You should now find yourself in the `API Clients` tab. Click on the `Create New API Client` button to display a form. There, enter a descriptive name for your new API client and select the `Mobile & single-page application client` template. Once you have filled the form, submit it by clicking on `Create API Client`, you should now be able to see your project credentials.

### 2. Configure SUNRISE with your API client 
Create the file `.env.local` (or any other [`.env` file](https://www.npmjs.com/package/dotenv#usage)) in the root folder of your project with the following content, replacing the data in the template (i.e. `<your project key>`) for your own:

```shell
VUE_APP_CT_PROJECT_KEY=<your project key>
VUE_APP_CT_CLIENT_ID=<your client ID>
VUE_APP_CT_CLIENT_SECRET=<your client secret>
```
> **:warning: Always use an API client suited for single-page applications (SPA), as your credentials will be publicly accessible through the browser.**

Optionally, you can also use a different commercetools host, instead of the default `commercetools.com` (i.e. Europe). For example, to connect to our US hosts: 
```shell
VUE_APP_CT_AUTH_HOST=https://auth.commercetools.co
VUE_APP_CT_API_HOST=https://api.commercetools.co
```

This will set up the necessary environment variables required to run SUNRISE. Feel free to choose any other approach that best suits your needs.

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
