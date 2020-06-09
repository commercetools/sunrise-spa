<style src="./PageUserAccount.scss" lang="scss" scoped></style>
<script src="./PageUserAccount.js"></script>

<template>
<div class="my-account-wrapper pt-100 pb-100 mt-175">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <!-- My Account Page Start -->
        <div class="myaccount-page-wrapper">
          <!-- My Account Tab Menu Start -->
          <div class="row">
            <div class="col-lg-3 col-md-4">
              <SidebarMenu />
            </div>
            <!-- My Account Tab Menu End -->
            <!-- My Account Tab Content Start -->
            <div class="col-lg-9 col-md-8">
              <div class="tab-content" id="myaccountContent">
                <router-view class="col-sm-9 col-md-10 col-xs-12 my-account-tab"/>
              </div>
            </div> <!-- My Account Tab Content End -->
          </div>
        </div> <!-- My Account Page End -->
      </div>
    </div>
  </div>
</div>
</template>
