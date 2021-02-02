# Configure GCP project
provider "google" {
  project = "[your project]"
}
# Deploy image to Cloud Run
resource "google_cloud_run_service" "[resource name]" {
  name     = "[resource name]"
  location = "europe-west1"
  template {
    spec {
      containers {
        image = "gcr.io/[your project]/[image name]"
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
  location    = google_cloud_run_service.[resource name].location
  project     = google_cloud_run_service.[resource name].project
  service     = google_cloud_run_service.[resource name].name
  policy_data = data.google_iam_policy.noauth.policy_data
}
# Return service URL
output "url" {
  value = "${google_cloud_run_service.[resource name].status[0].url}"
}