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
  //DECLARACIÓN DE CONSTANTES
  const map = new Map({
    basemap: "dark-gray-vector"
  });

  const view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [-58.44861477597812, -34.59090359667831],
    zoom: 16
  });

  const point = {
    type: "point",
    longitude: -58.44861477597812,
    latitude: -34.59090359667831
  };

  const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 1
    }
  };
  const myLayer = new FeatureLayer({

    title: "Points",
    fields: [{
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      },
      {
        name: "Nombre",
        alias: "Nombre",
        type: "string"
      },
      {
        name: "Cat",
        alias: "Cat",
        type: "string"
      },
      {
        name: "Dir",
        alias: "Dir",
        type: "string"
      },
      {
        name: "Tel",
        alias: "Tel",
        type: "string"
      },
      {
        name: "X",
        alias: "X",
        type: "double"
      },
      {
        name: "Y",
        alias: "Y",
        type: "double"
      }
    ],
    objectIdField: "ObjectID",
    geometryType: "point",
    spatialReference: {
      wkid: 4326
    },
    source: [],
    renderer: {
      type: "simple",
      symbol: {
        type: "web-style",
        styleName: "Esri2DPointSymbolsStyle",
        name: "landmark"
      }
    },
    popupTemplate: {
      title: "{Nombre}",
      content: "<ul><li><b>Dirección:</b>{Dir} </li>" +
        "<li><b>Teléfono:</b>{Tel} </li>" +
        "<li><b>(X,Y):</b>{X},{Y} </li>" +
        "<li><b>Categoría:</b>{Cat} </li><ul>"
    }
  });
  map.add(myLayer);
  const addBtn = document.getElementById("add");
  const form = document.getElementById('form');
  const removeBtn = document.getElementById("remove");
  const search = new Search({
    view: view
  });

  //INTERACCIÓN CON VIEW
  view.popup.autoCloseEnabled = true;
  view.ui.add(search, "top-right");
  view.ui.add(document.getElementById("form"), "top-right");

  //BOTONES
  addBtn.addEventListener("click", addFeatures);
  removeBtn.addEventListener("click", removeFeatures);
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    addFeatures(form.elements);
  });

  //FUNCIONES
  function addFeatures(formElements) {

    let coordlist = form.elements["point-coord"].value.split(",");
    if ((parseFloat(coordlist[0]).toFixed(5) < 180 && parseFloat(coordlist[0]).toFixed(5) > -180) && (parseFloat(coordlist[1]).toFixed(5) <= 90 && parseFloat(coordlist[1]).toFixed(5) >= -90)) {
      const data = [{
        CAT: form.elements["point-category"].value,
        NOMBRE: form.elements["point-name"].value,
        X: parseFloat(coordlist[0]).toFixed(5),
        Y: parseFloat(coordlist[1]).toFixed(5),
        TEL: form.elements["point-tel"].value,
        DIR: form.elements["point-dir"].value
      }];

      var graphics = [];
      var graphic;
      graphic = new Graphic({
        geometry: {
          type: "point",
          latitude: data[0].X,
          longitude: data[0].Y
        },
        attributes: data[0]
      });
      graphics.push(graphic);
      const addEdits = {
        addFeatures: graphics
      };

      applyEditsToLayer(addEdits);
    }
    else {
      view.popup.open({
        title: "Error",
        location: view.center.clone(),
        content: "Coordenadas inválidas"
      });
    }
  }


  function removeFeatures(selectedFeature) {
    console.log(selectedFeature);
    myLayer.queryFeatures().then((results) => {
      const deleteEdits = {
        deleteFeatures: results.features
      };
      applyEditsToLayer(deleteEdits);
    });
  }


  function applyEditsToLayer(edits) {
    myLayer
      .applyEdits(edits)
      .then((results) => {
        if (results.addFeatureResults.length > 0) {
          var objectIds = [];
          results.addFeatureResults.forEach((item) => {
            objectIds.push(item.objectId);
          });
          myLayer
            .queryFeatures({
              objectIds: objectIds
            })
            .then((results) => {
              console.log(
                results.features.length,
              );
            })
        }
      })
      .catch((error) => {
        console.error();
      });
  }

});
