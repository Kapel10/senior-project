import React, {FC, useEffect, useRef, useState} from 'react';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {useDispatch} from "react-redux";
import {setEventYandexMap, setLatYandexMap, setLgYandexMap} from "../../stores/slices/YandexMapSlice";
import {EventService} from "../../service/Event/EventService";
import {IEventInterface} from "../../interface/request/Event/IEventInterface";
import {IEventSearchInterface} from "../../interface/request/Event/IEventSearchInterface";

export interface CoordinatesProb {
    x: number;
    y: number;
    lat?: number;
    lg?: number;
    showUser: boolean;
    searchEvent?: string;
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

export const SearchMap: FC<CoordinatesProb> = ({x, y, lat, lg, showUser, searchEvent}) => {

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

    const [searchEvents, setSearchEvents] = useState<IEventSearchInterface[]>([]);

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

    const locationZoomForEvent = (x: number, y: number) => {
        if (mapRef.current) {
            const mapInstance = mapRef.current;
            mapInstance.setCenter([x, y]);
            mapInstance.setZoom(16);
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
                "text": searchEvent,
                "coordinate": {
                    "maxLon": viewportCoords.maxLon,
                    "minLon":viewportCoords.minLon,
                    "maxLat": viewportCoords.maxLat,
                    "minLat": viewportCoords.minLat,
                    "centerLat":71.430427551270, /// center coordinate or user location if available
                    "centerLog":51.128200531006
                },
                "categories": [],
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
            console.log(JSON.stringify(request));
            const response = await EventService.searchEvent(request);
            setSearchEvents(response.data.data.events);
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
                        {userCoords && <Placemark geometry={userCoords} options={{preset: 'islands#circleIcon', iconColor: '#ff0000' }}
                        />}
                    </>}
                    {searchEvents && searchEvents.length > 0 && searchEvents.map(event => (
                        <div>
                                <Placemark geometry={[event.location.lat, event.location.lon]}
                                           onClick={() => {
                                               locationZoomForEvent(event.location.lat, event.location.lon);
                                               dispatch(setEventYandexMap(event))
                                           }}
                                />
                        </div>
                    ))}
                    {<Placemark geometry={[lat,lg]}  />}
                </Map>
            </YMaps>
        </div>

    );
}

export default SearchMap;

/*
options={{preset: 'islands#circleIcon', iconColor: '#0000ff' }}
 */

