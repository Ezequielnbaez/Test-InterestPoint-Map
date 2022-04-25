require(["esri/config",
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/VectorTileLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/widgets/Search"
], (
  esriConfig,
  Map,
  SceneView,
  VectorTileLayer,
  FeatureLayer,
  Graphic,
  Legend,
  Search
) => {
  esriConfig.apiKey = "AAPK32a3586bfe614d9e9dc2d056e55d87c7OV1rdwssX3LTqWQ__TXswsIe7IGkDBvGPqGH-qZzZipdTmm0ES-mR8lSRVWWsraf";
  const map = new Map({
    basemap: "dark-gray-vector"
  });

  const view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [-58.44861477597812, -34.59090359667831],
    zoom: 16
  });

});
