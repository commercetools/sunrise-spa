<style src="./User.scss" lang="scss"></style>
<script src="./User.js"></script>

<template>
  <span>
    <!-- <Breadcrumb categorySlug="user" /> -->

    <div class="my-account-wrapper pt-50 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <!-- My Account Page Start -->
            <div class="myaccount-page-wrapper">
              <!-- My Account Tab Menu Start -->
              <div class="row">
                <div class="col-lg-4 col-md-4">
                  <SidebarMenu />
                </div>
                <!-- My Account Tab Menu End -->
                <!-- My Account Tab Content Start -->
                <div class="col-lg-8 col-md-8">
                  <div
                    class="tab-content"
                    id="myaccountContent"
                  >
                    <router-view class="my-account-tab" />
                  </div>
                </div>
                <!-- My Account Tab Content End -->
              </div>
            </div>
            <!-- My Account Page End -->
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
