# SUNRISE as a Single-Page Application

### How to use your own project data


#### 1. Create an API client for a SPA
In the [Admin Center](https://admin.commercetools.com/), select your project and go to the `Developers` section and then the `API Clients` tab. Now click on the `Add API client` button to display a form. There, enter a descriptive name for your new API client and simply click on "Select permissions for an API client suited for a mobile or a single page application", found below the `Permissions` checkboxes.  

#### 2. Configure SUNRISE with your API client 
Set environment variables with your project credentials, in particular:
```shell
SUNRISE_CT_AUTH_PROJECT_KEY  # your project key
SUNRISE_CT_AUTH_CLIENT_ID  # your client ID
SUNRISE_CT_AUTH_CLIENT_SECRET  # your client secret

SUNRISE_CT_AUTH_HOST  # authentication host (default: https://auth.commercetools.com)
SUNRISE_CT_API_HOST  # API host (default: https://api.commercetools.com)
```
Remember to use an API client suited for single page applications (SPA), as your credentials will be publicly accessible through the browser.
