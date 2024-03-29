import React, {FC, useEffect, useRef, useState} from 'react';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {useSelector} from "react-redux";
import {RootState} from "../../stores/store";
export interface Coordinates{
    x: number;
    y: number;
    lat?: number;
    lg?: number;
}
const mapOptions = {
    // Disable Yandex Map controls and information
    suppressMapOpenBlock: true,
    suppressMapAutoFocus: true,
    suppressTrafficButton: true,
    suppressZoomControl: true,
    suppressMapTypeControl: true,
    suppressSatelliteHybridControl: true,
    suppressFullScreenControl: true,
    suppressSearchControl: true,
};

export const YandexMap: FC<Coordinates> = ({x,y, lat, lg}) => {

    const mapRef = useRef<any>(null);
    const astanaCoordinates = [51.12646248759976, 71.42314508372331];
    const mapState = {center: astanaCoordinates, zoom: 12};

    const [userCoords, setUserCoords] = useState<number[] | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setUserCoords([latitude, longitude]);
                    locationZoom(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user coordinates:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    }, []);

    useEffect(() => {
        if (lat != null && lg != null) {
            locationZoom(lat, lg);
        }
    }, [lat,lg]);

    const locationZoom = (x: number, y: number) => {
        if (mapRef.current) {
            const mapInstance = mapRef.current;
            mapInstance.setCenter([x, y]);
            mapInstance.setZoom(15); // Adjust the zoom level as needed
            console.log(1)
        }
    }


    return (
        <YMaps>
            <Map defaultState={mapState} defaultOptions={mapOptions} style={{width: `${x}px`, height: `${y}px`}}
                 instanceRef={mapRef}
            >
                {userCoords && <Placemark geometry={userCoords} />}
                {<Placemark geometry={[lat,lg]}  />}
            </Map>
        </YMaps>
    );
}

export default YandexMap;


/*
 const handleFunction = useSelector((state: RootState) => state.functionStore.function)
    console.log(handleFunction)

        const x1 = handleFunction?.lat;
    const y1 = handleFunction?.long;

         {x !== null && <Placemark geometry={[x1,y1]} /> }


         options={{
                    iconLayout: 'default#image',
                    ...calculateIconOptions(),
                    iconImageHref: 'data:image/svg+xml,' + encodeURIComponent(svgContent),
                }}
                                          properties={{
                                              iconContent: `<div className='w-auto h-screen max-w-[20px] max-h-[20px]'></div>`,
                                          }} />}

                                            const icon = <img width="40" height="40" src="https://img.icons8.com/ultraviolet/40/100-percents.png"
                      alt="100-percents"/>

    const svgContent = `
<img width="48" height="48" src="https://img.icons8.com/emoji/48/blue-circle-emoji.png" alt="blue-circle-emoji"/>

  `;


    const calculateIconOptions = () => {
        // Calculate icon size based on map size
        const iconWidth = Math.min(mapSize.width * 0.03, 30); // Adjust as needed
        const iconHeight = Math.min(mapSize.height * 0.03, 42); // Adjust as needed

        // Calculate icon offset based on icon size
        const offsetX = -iconWidth / 2;
        const offsetY = -iconHeight / 2;

        return {
            iconImageSize: [iconWidth, iconHeight],
            iconImageOffset: [offsetX, offsetY],
        };
    };

      const [mapSize, setMapSize] = useState({ width: x, height: y }); // Initial map size

    const handleBoundsChange = (event: any) => {
        const { originalEvent } = event;
        const newMapSize = {
            width: originalEvent.currentTarget.clientWidth,
            height: originalEvent.currentTarget.clientHeight,
        };
        setMapSize(newMapSize);
    };
 */