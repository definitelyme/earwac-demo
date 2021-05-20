import Vue from "vue";
import "leaflet/dist/leaflet.css";
import $Leaflet from "leaflet";

const vm = new Vue({
  data: {
    map: Object,
    defaultLayer: Object,
    layers: Object,
    preventClick: false,
    timer: 0,
    polylines: [],
    polylinesHistory: [],
  },
});

const kInitialZoom = 3;
// 60.844911, -129.902344
const kCenter = [60.844911, -129.902344];

const mapBoxToken =
  "pk.eyJ1IjoiZm9yeC1tYXBib3giLCJhIjoiY2tvbGl1bm1kMDJxYjJ1czNoYnhyNjJ0NyJ9.wsaahURjGaBv2zBQ3Spmmg";

const clickDelay = 300;

const popup = $Leaflet.popup;

// const get = vm.map;

// const set = (value) => vm.$set(vm, "map", value);

const init = (el, options = {}) => {
  let map = $Leaflet.map(el, {
    layers: [vm?.defaultLayer],
    ...options,
  });

  vm.$set(vm, "map", map);

  return vm?.map;
};

const setupTileLayer = (options = { token: mapBoxToken }, url) => {
  if (!vm?.map) return;

  var _token =
    options?.token && options.token.length ? options.token : mapBoxToken;

  _initLayers(options, _token, url);

  return vm?.map;
};

const draw = (animate = true, center = kCenter, zoom = kInitialZoom) => {
  //   console.log(vm?.map);
  //   console.log(vm?.layers);
  //   console.log(vm?.defaultLayer);

  if (animate) {
    // Draw Leaflet map
    vm?.map?.setView(kCenter, kInitialZoom);

    ///////// START Animation /////////
    // Animation duration
    let ms = 1000;

    setTimeout(async () => {
      await new Promise((resolve) => setTimeout(resolve, ms / 3)); // Sleep

      vm?.map?.flyTo(center, ++zoom);

      await new Promise((resolve) => setTimeout(resolve, ms / 1.5)); // Sleep

      vm?.map?.setZoomAround(center, ++zoom, {
        animate: true,
      });
    }, ms);
  } // Draw Leaflet map without animation
  else vm?.map?.setView(center ?? kCenter, zoom ?? kInitialZoom);

  $Leaflet.control.layers(vm?.layers).addTo(vm?.map);

  return vm?.map;
};

const click = (callback) => {
  vm.map.on("click", (e) => {
    vm.$set(
      vm,
      "timer",
      setTimeout(
        function(arg) {
          // If prevent == false, perform click action
          if (!vm.preventClick) callback(arg);

          // Set prevent to 'false'
          vm.$set(vm, "preventClick", false);
        }.bind(this, e),
        clickDelay
      )
    );
  });
};

const dbclick = (callback) => {
  vm.map.on("dblclick", (e) => {
    // Clear timeout
    clearTimeout(vm?.timer);
    // Set prevent to 'true'
    vm.$set(vm, "preventClick", true);
    // Perform double click action
    callback(e);
  });
};

const _initLayers = (options = {}, token, url) => {
  const {
    tileSize = 512,
    maxZoom = 512,
    zoomOffset = -1,
    zoomControl = false,
  } = options;

  console.log("url ===> " + url);
  //   console.log(options);

  let openStreetMapAttrLink =
      'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    thunderForestAttrLink =
      '<a href="http://thunderforest.com/">Thunderforest</a>',
    mapBoxAttrLink = `<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>`;

  let openStreetMapUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    openStreetMapAttribution = `&copy; ${openStreetMapAttrLink} Contributors`,
    thunderForestUrl = "",
    thunderForestAttribution = `&copy; ${thunderForestAttrLink} Contributors`,
    mapBoxUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`,
    mapBoxAttribution = `&copy; ${mapBoxAttrLink}`;

  // let _url =
  //   url && url.length
  //     ? url
  //     : `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken ??
  //         options.accessToken}`;

  let openStreetMapLayer = $Leaflet.tileLayer(openStreetMapUrl, {
      id: "mapbox/streets-v11",
      attribution: openStreetMapAttribution,
      tileSize: tileSize ?? 512,
      maxZoom: maxZoom ?? 100,
      zoomOffset: zoomOffset ?? -1,
      zoomControl: zoomControl ?? false,
      ...options,
    }),
    thunderForestLayer = $Leaflet.tileLayer(thunderForestUrl, {
      id: "mapbox/streets-v11",
      attribution: thunderForestAttribution,
      tileSize: tileSize ?? 512,
      maxZoom: maxZoom ?? 100,
      zoomOffset: zoomOffset ?? -1,
      zoomControl: zoomControl ?? false,
      ...options,
    }),
    mapBoxLayer = $Leaflet.tileLayer(mapBoxUrl, {
      //   id: "mapbox/streets-v11",
      id: "mapbox/light-v10",
      attribution: mapBoxAttribution,
      tileSize: tileSize ?? 512,
      maxZoom: maxZoom ?? 100,
      zoomOffset: zoomOffset ?? -1,
      zoomControl: zoomControl ?? false,
      accessToken: token,
      ...options,
    });

  // Update reactive state
  vm.$set(vm, "layers", {
    "Map Box Layer": mapBoxLayer,
    "Open Street Map": openStreetMapLayer,
    "Thunder Forest Map": thunderForestLayer,
  });
  // Set default layer
  vm.$set(vm, "defaultLayer", mapBoxLayer);

  return {
    openStreetMapLayer,
    thunderForestLayer,
    mapBoxLayer,
  };
};

const createPolyline = (options, ...latLngs) => {
  //   vm?.polylines.push(...latLngs[0]);
  vm?.polylines.push(...latLngs);

  const { color, weight, opacity, smoothFactor } = options;

  let polyline = $Leaflet
    .polyline(vm?.polylines, {
      color: color ?? "#31AAB7",
      weight: weight ?? 4,
      opacity: opacity ?? 0.8,
      smoothFactor: smoothFactor ?? 1,
      ...options,
    })
    .addTo(vm?.map);

  console.log(polyline);

  // zoom the map to the polyline
  //   vm?.map?.fitBounds(polyline.getBounds());
};

const removePolyline = (options, ...latLngs) => {
  const { color, weight, opacity, smoothFactor } = options;

  $Leaflet
    .polyline(latLngs, {
      color: color ?? "#31AAB7",
      weight: weight ?? 4,
      opacity: opacity ?? 0.8,
      smoothFactor: smoothFactor ?? 1,
      ...options,
    })
    .remove(vm?.map);
};

const geoJSON = (styles, ...features) => {
  console.log(features);
  $Leaflet
    .geoJSON(features, {
      style: styles,
    })
    .addTo(vm?.map);
};

const undoPolyline = () => {
  // let last = vm?.polylines.slice(vm?.polylines.length - 1);
  // Splice from vm.polyline
  let last = vm?.polylines.pop();
  // Push into vm.polylineHistory
  vm?.polylinesHistory.push(last);
  // Update polylines
  removePolyline({}, last);
};

const redoPolyline = () => {
  // Splice from vm.polylineHistory
  let last = vm?.polylinesHistory.pop();
  // Push into vm.polyline
  vm?.polylines.push(last);
  // Update polylines
  createPolyline({}, last);
};

export default {
  $Leaflet,
  vm,
  click,
  dbclick,
  init,
  setupTileLayer,
  draw,
  popup,
  createPolyline,
  removePolyline,
  undoPolyline,
  redoPolyline,
  geoJSON,
};
