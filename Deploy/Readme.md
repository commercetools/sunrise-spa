# Deploy the single page application.

Run the following commands to configure gcloud

```bash
gcloud auth login
gcloud auth configure-docker
```

Make sure you have your [environment variables](https://github.com/commercetools/sunrise-spa/tree/development/Docs#Environment-variables) set up.

Then run the following commands to build the project, create a docker container with the build and publish the container.

```bash
docker build --file ./Deploy/Dockerfile -t gcr.io/[your project]/[image name] .
docker push gcr.io/[your project]/[image name]
```

In the `Deploy/main.tf` file replace `[your project]` with your project, `[resource name]` with how to name it on cloud platform and `[image name]` with the image name you used and run the following command(s) in the `./Deploy` directory: `terraform init` (only the first time) and `terraform apply`.
