<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!-- -->
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="top"
      :open-on-hover="true"
      transition="scale"
      absolute
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-account-circle </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-navigation-drawer
      v-model="rightDrawer"
      @toggle-right-drawer="rightDrawer = !rightDrawer"
      right
      temporary
      fixed
      app
    >
      Hello side bar
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    fab: false,
    rightDrawer: false,
  }),

  mounted() {
    //
  },
};
</script>
