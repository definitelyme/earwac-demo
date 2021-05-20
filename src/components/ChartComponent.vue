<template>
  <v-container
    fluid
    class="fill-height py-0"
    style="height: 100vh; max-height: 100%; background: #d4e0ed"
  >
    <v-expand-transition>
      <v-layout row fill-height>
        <v-col cols="12" sm="12" md="4" lg="5" class="d-sm-none d-md-flex">
        </v-col>
        <!--  -->
        <v-col cols="12" sm="6" md="4" lg="4" align-self="end" class="pr-sm-2">
          <v-sheet
            :elevation="30"
            class="mx-auto rounded-lg rounded-sm-xl pa-4 d-flex flex-column justify-content-center align-items-stretch"
            width="100%"
          >
            <span
              class="d-none d-sm-inline-flex rounded-pill font-weight-bold mb-4"
              >Filter</span
            >

            <v-row
              align="center"
              justify="center"
              dense
              class="d-flex d-sm-none mb-2"
            >
              <v-col cols="4" sm="3" align-self="center">
                <v-flex class="text-center item-center">
                  <hr class="horizontal-bar rounded-pill" />
                </v-flex>
              </v-col>
            </v-row>
            <!--  -->
            <v-layout column align-content-space-between>
              <v-flex
                class="d-flex flex-column flex-sm-row justify-space-between k-min-height-0 mb-sm-4"
              >
                <filter-select-component
                  :items="months"
                  label="Select Month"
                  class="mr-sm-2 mb-4 mb-sm-0"
                />
                <filter-select-component
                  :items="years"
                  label="Select Years"
                  class="ml-sm-2 mb-4 mb-sm-0"
                />
              </v-flex>
              <!--  -->
              <v-flex
                class="d-flex flex-column flex-sm-row justify-space-between k-min-height-0 mb-sm-4"
              >
                <filter-select-component
                  :items="months"
                  label="Duration"
                  class="mr-sm-2 mb-4 mb-sm-0"
                />
                <filter-select-component
                  :items="months"
                  label="Location"
                  class="ml-sm-2 mb-8 mb-sm-0"
                />
              </v-flex>
              <!--  -->
              <v-flex
                class="d-flex flex-row justify-space-between k-min-height-0"
                ><v-btn
                  elevation="0"
                  color="grey lighten-2"
                  class="text-capitalize rounded-lg"
                  >Apply</v-btn
                >
                <!--  -->
                <v-btn
                  elevation="0"
                  color="white"
                  class="text-capitalize rounded-lg"
                  ripple=""
                  >Clear</v-btn
                ></v-flex
              >
            </v-layout>
          </v-sheet>
        </v-col>
        <!--  -->
        <!--  -->
        <v-col cols="12" sm="6" md="4" lg="3" class="pl-sm-2">
          <v-sheet
            :elevation="100"
            class="mx-auto rounded-lg rounded-sm-xl fill-height pa-4"
            fill-width
          >
            <v-row no-gutters>
              <v-col
                ><v-btn
                  color="#F3F6FC"
                  class="capitalize float-right rounded-lg pa-3"
                  elevation="0"
                  :ripple="{
                    center: true,
                  }"
                  rounded
                >
                  <v-icon left small color="#005dce">
                    mdi-download-outline
                  </v-icon>
                  <span
                    class="text-capitalize text-body-2"
                    style="color: #005dce"
                    >Download</span
                  >
                  <v-icon right small color="#005dce">
                    mdi-chevron-down
                  </v-icon></v-btn
                ></v-col
              >
            </v-row>
            <!--  -->
            <v-row no-gutters class="pt-2">
              <v-col cols="12">
                <p class="text-body-2 font-weight-medium">Chart Header</p>
              </v-col>
              <v-col>
                <!-- <sparkline-component> </sparkline-component> -->
                <chart-header
                  label="None"
                  :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
                  :chart-data="['270', '330', '215', '350', '300', '200']"
                  :chart-colors="{
                    borderColor: 'green',
                  }"
                  :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                  }"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="text-body-2 font-weight-medium">Histogram Angled</p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-layout>
    </v-expand-transition>
  </v-container>
</template>

<script>
// import ChartHeader from "@/components/ChartHeader/ChartHeader.vue";
export default {
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: [
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
      ],
    };
  },

  // components: { ChartHeader },
};
</script>

<style lang="scss">
.horizontal-bar {
  height: 0.45rem;
  width: 100%;
  border-width: 0;
  background-color: #d6d6d6;
}
.k-min-height-0 {
  min-height: 0 !important;
}
</style>