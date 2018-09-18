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
In the [Merchant Center](https://mc.commercetools.com/), select your project and go to `Settings` then click on `Developer Settings` section and you should find yourself in the API Clients tab. Now click on the `Create New API client` button to display a form. There, enter a descriptive name for your new API client and click on `Select Template for a Mobile client` then click on `Create API Client` button, now you should be able to see your project credentials.

### 2. Configure SUNRISE with your API client 
Set environment variables with your project credentials. For example, by creating an [`.env` file](https://www.npmjs.com/package/dotenv#usage) (e.g. `.env.local`) in the root folder of the project, as follows:

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
