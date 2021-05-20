<template>
  <v-container fluid class="absolute t-0 b-0 pa-1">
    <v-layout fill-height>
      <v-flex class="box-sizing">
        <v-card
          ref="map_canvas"
          class="mx-auto transition-swing"
          elevation="5"
          height="100%"
          width="100%"
          v-shortkey="{ undo: ['ctrl', 'z'], redo: ['ctrl', 'y'] }"
          @shortkey="revertible"
        ></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import nigeria from "@/utils/polygons.json";

export default {
  name: "Map",
  data: () => ({
    map: null,
    popup: null,
    // 11.953349, 7.294922 -> somewhere in Africs
    // -2.86, 9.88
    westAfrica: [7.318882, 9.799805],
  }),

  methods: {
    async init() {
      /// Setup Map Tile layers (or custom tile pass options)
      this.$maps.setupTileLayer();

      /// Create map instance
      this.$maps.init(this.$refs.map_canvas.$el);

      /// Draw Map (Set view)
      this.map = this.$maps.draw(true, this.westAfrica);

      /// Initalize popups
      this.popup = this.$maps.popup();

      /// Attach Map click listener
      this.$maps.click(this.onMapClick);

      // Attach double click lister
      this.$maps.dbclick(this.onMapDoubleClick);

      //   console.log(nigeria[0].geometry.coordinates[0]);

      //   this.$maps.polyline({}, nigeria[0].geometry.coordinates[0]);
      //   this.$maps.geoJSON((feature) => {
      //     switch (feature.properties.region) {
      //       case "Lagos":
      //         return { color: "#ff0000" };
      //     }
      //   }, nigeria[0]);
    },

    onMapClick(e) {
      this.$maps.createPolyline({}, [e.latlng.lat, e.latlng.lng]);

      this.$emit("toggle-right-drawer");
    },

    onMapDoubleClick(e) {
      this?.popup
        ?.setLatLng(e.latlng)
        .setContent(`You DOUBLE CLICKED on the map!!`)
        .openOn(this.map);
    },

    revertible(event) {
      switch (event.srcKey) {
        case "undo":
          this.$maps.undoPolyline();
          break;
        case "redo":
          this.$maps.redoPolyline();
          break;
      }
    },
  },

  async mounted() {
    await this.init();
  },
};
</script>