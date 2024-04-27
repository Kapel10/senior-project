import React, {FC, useEffect, useRef, useState} from 'react';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {useDispatch} from "react-redux";
import {setLatYandexMap, setLgYandexMap} from "../../stores/slices/YandexMapSlice";
import {EventService} from "../../service/Event/EventService";

export interface Coordinates {
    x: number;
    y: number;
    lat?: number;
    lg?: number;
    showUser: boolean;
}

const mapOptions = {
    suppressMapOpenBlock: true,
    suppressMapAutoFocus: true,
    suppressTrafficButton: true,
    suppressZoomControl: true,
    suppressMapTypeControl: true,
    suppressSatelliteHybridControl: true,
    suppressFullScreenControl: true,
    suppressSearchControl: true,
};

export const YandexMap: FC<Coordinates> = ({x, y, lat, lg, showUser}) => {

    const mapRef = useRef<any>(null);
    const astanaCoordinates = [51.12646248759976, 71.42314508372331];
    const mapState = {center: astanaCoordinates, zoom: 12};

    const [userCoords, setUserCoords] = useState<number[] | null>(null);

    const [clickedCoords, setClickedCoords] = useState<number[] | null>(null);

    const [viewportCoords, setViewportCoords] = useState<any>({
        maxLon: null,
        minLon: null,
        maxLat: null,
        minLat: null
    });

    const dispatch = useDispatch();


    useEffect(() => {
        if (showUser) {
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
        }
    }, []);

    useEffect(() => {
        if (lat != null && lg != null) {
            locationZoom(lat, lg);
        }
    }, [lat, lg]);

    const locationZoom = (x: number, y: number) => {
        if (mapRef.current) {
            const mapInstance = mapRef.current;
            mapInstance.setCenter([x, y]);
            mapInstance.setZoom(15);
        }
    }
    const handleMapClick = (e: any) => {
        const coords = e.get('coords');
        setClickedCoords(coords);
        dispatch(setLatYandexMap(coords[0]));
        dispatch(setLgYandexMap(coords[1]));
    };
    const handleBoundsChange = (e: any) => {
        const bounds = e.get('newBounds');
        const topLeft = [bounds[0][0], bounds[1][1]];
        const bottomRight = [bounds[1][0], bounds[0][1]];
        setViewportCoords({
            maxLon: topLeft[1],
            minLon: bottomRight[1],
            maxLat: bottomRight[0],
            minLat: topLeft[0]
        })
        console.log('Bottom Right:', topLeft, 'Top Left:', bottomRight);
    };

    const getEvents = async () => {
        try {

            const request = {
                "text": "",
                "coordinate": {
                    "maxLon": viewportCoords.maxLon,
                    "minLon":viewportCoords.minLon,
                    "maxLat": viewportCoords.maxLat,
                    "minLat": viewportCoords.minLat,
                    "centerLat":71.430427551270, /// center coordinate or user location if available
                    "centerLog":51.128200531006
                },
                "categoies": [],
                "minAge":0,
                "sort": [
                    {
                        "order": "asc", //"desc"
                        "by": "like_count"// follower_count like_count starts_at
                    },
                    {
                        "order": "asc", //"desc"
                        "by": "starts_at"//
                    }
                ]
            }
            const response = await EventService.searchEvent(request);
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEvents();
    }, [viewportCoords]);



    return (
        <div>

            <YMaps>
                <Map defaultState={mapState} defaultOptions={mapOptions} style={{width: `${x}px`, height: `${y}px`}}
                     instanceRef={mapRef} onClick={handleMapClick}  onBoundsChange={handleBoundsChange}
                >
                    {showUser && <>
                        {userCoords && <Placemark geometry={userCoords} />}
                    </>}
                    {<Placemark geometry={[lat,lg]}  />}
                </Map>
            </YMaps>
        </div>

    );
}

export default YandexMap;


/*

{userCoords && <Placemark geometry={userCoords} options={{preset: 'islands#circleIcon', iconColor: '#ff0000' }}/>}

{showUser && <>
                    {userCoords && <Placemark geometry={userCoords} options={{
                        iconLayout: 'default#image',
                        iconImageHref: 'https://keystoneacademic-res.cloudinary.com/image/upload/element/18/180761_Panolowheight4k.jpg', // Use the imported image as the icon
                        iconImageSize: [40, 40], // Adjust size as needed
                        iconImageOffset: [-20, -20], // Adjust offset as needed
                    }}/>}



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