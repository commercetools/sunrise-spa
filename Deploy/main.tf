# Configure GCP project
provider "google" {
  project = var.project
}
# Deploy image to Cloud Run
resource "google_cloud_run_service" "spa" { 
  name     = var.resource
  location = var.region
  template {
    spec {
      containers {
        image = "gcr.io/${var.project}/${var.image_name}"
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}
# Create public access
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}
# Enable public access on Cloud Run service
resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.spa.location
  project     = google_cloud_run_service.spa.project
  service     = google_cloud_run_service.spa.name
  policy_data = data.google_iam_policy.noauth.policy_data
}
# Return service URL
output "url" {
  value = google_cloud_run_service.spa.status[0].url
}