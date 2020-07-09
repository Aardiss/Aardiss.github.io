let myMap;

const init = () => {

  myMap = new ymaps.Map("map", {
    center: [55.739675, 37.739502],
    zoom: 11,
    controls: []
  });

  const coords = [
  [55.756832, 37.586203],
  [55.757425, 37.627059],
  [55.744799, 37.581622],
  [55.749532, 37.607942],
  ];
  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "/img/icons/marker.svg",
    iconImageSize: [46,57],
    iconImageOffset: [-35, -52]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark (coord));
  });

  myMap.GeoObject.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
}

 ymaps.ready(init);