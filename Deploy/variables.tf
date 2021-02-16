variable "project" {
  description = "The google cloud project id: https://cloud.google.com/resource-manager/docs/creating-managing-projects"
  type = string
}

variable "image_name" {
  description = "Name of the docker image on google cloud"
  type    = string
}

variable "resource" {
  description = "Name of the cloud run service"
  type=string
}
variable "region" {
  description = "The region of the cloud run service"
  type=string
  default="europe-west1"
}
