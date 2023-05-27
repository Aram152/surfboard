let myMap;
const init = () => {
    myMap = new ymaps.Map('sectionMap', {
        center: [55.752004, 37.576133],
        zoom: 12,
        controls: []
    });

    const coords = [
        [55.752004, 37.576133],
    ]

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './src/img/map/marker.png',
        iconImageSize: [65, 83],
        iconImageOffset: [-3, -90]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}
ymaps.ready(init);