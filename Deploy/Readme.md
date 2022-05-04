# Deploy the single page application.

Run the following commands to configure gcloud

```bash
gcloud auth login
gcloud auth configure-docker
```

Make sure you have your [environment variables](https://github.com/commercetools/sunrise-spa/tree/development/Docs#Environment-variables) set up.

Create a ./Deploy/teraform.tfvars file with the following content:

```
project="[your project]"
image_name="[image name]"
resource="[resource]"
region="[region]"
```

This file will not be part of the git repo as this file contains settings how you would like to deploy the project.

The value `[your project]` should be [your gcloud project id](https://cloud.google.com/resource-manager/docs/creating-managing-projects) and is also used in the command below, `[image name]` is the name of the docker image you will create with the command below, `[resource]` is the name of your cloud resource and `[region]` is the region you want to deploy to, this is optional as it will default to `europe-west1` when missing.

Then run the following commands to build the project, create a docker container with the build and publish the container (replace `[your project]` and `[image name]` with the values you used in teraform.tfvars).

```bash
docker build --file ./Deploy/Dockerfile -t gcr.io/[your project]/[image name] .
docker push gcr.io/[your project]/[image name]
```
**Important**:

 If you are using Mac with the new Apple M1 chip, you should use the following commands instead:
```bash
docker build --file ./Deploy/Dockerfile --platform linux/amd64 -t gcr.io/[your project]/[image name] .
docker push gcr.io/[your project]/[image name]
```
When building your image using the Apple M1 you are building an ARM-compatible image which Google Cloud does not support.

For the list of supported CPUs on GCP, check [this documentation](https://cloud.google.com/compute/docs/cpu-platforms).

In the `./Deploy` directory run the following commands: `terraform init` (only the first time) and `terraform apply`.
