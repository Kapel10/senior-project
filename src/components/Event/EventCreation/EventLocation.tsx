import React, { useState } from 'react';
import YandexMap from "../../Map/YandexMap";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store";
import {AutoComplete} from "antd";
import {setAddressEvent, setLgEvent, setLtEvent} from "../../../stores/slices/EventCreationSlice";
import {setLatYandexMap} from "../../../stores/slices/YandexMapSlice";

type Yandex = {
    value: string;
    label: string;
}
const EventLocation = () => {
    const [vars, setVars] = useState<Yandex[]>([])
    //const [inputValue, setInputValue] = useState('');
    const eventLg = useSelector((state: RootState) => state.eventCreateStore.lg);
    const eventLt = useSelector((state: RootState) => state.eventCreateStore.lt);
    const eventAddress = useSelector((state: RootState) => state.eventCreateStore.address);
    const lt1 = useSelector((state: RootState) => state.YandexMapSlice.lat);
    const lg1 = useSelector((state: RootState) => state.YandexMapSlice.lg);
    const dispatch = useDispatch();
    function handleChange(value: string) {
        const apiKey = 'e6bf205f-4dce-4574-979d-9bba7be66812';
        const searchText = `город Астана, ул ${value}`;
        const apiUrl = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${apiKey}&text=${searchText}&types=house,street&results=10`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const arr = data.results.filter(
                    (addr:any) => addr.subtitle.text === "Астана"
                );
                console.log(arr)
                const result: Yandex[] = arr.map((address:any) => {
                    return {
                        value: address.title.text,
                        label: address.title.text
                    }
                })
                setVars(result)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const handleClick = async () => {
        const url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
        const token = "79ae05a1a808f6a1cfb10f21b3e888433d798dad";
        const query = { lat: lt1, lon: lg1 };

        const options: RequestInit = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify(query)
        };

        fetch(url, options)
            .then(response =>
                response.text())
            .then(result => {
                const responseObject = JSON.parse(result);
                console.log(responseObject)

                const firstSuggestion = responseObject.suggestions[0];

                const match = firstSuggestion.value.match(/(?:ул|пр-кт)\s(.*?),\s(?:д\s|дом\s|дома\s)(.*)/);

                if (match) {
                    const street = match[1];
                    const house = match[2];

                    dispatch(setLtEvent(lt1));
                    dispatch(setLgEvent(lg1));
                    dispatch(setAddressEvent(street + ' ' + house));

                }
            })
            .catch(error => console.log("error", error));
    }

    const handleLocation = (value: string) => {

        if(lt1 === -1) {
            const apiKey = '2eb6b6ac-e941-4da8-84ff-c94746e481a4';
            const address = `Казахстан,Астана, ${value}`;

            const apiUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(
                address
            )}`;

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then((data) => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, "text/xml");

                    const featureNodes = xmlDoc.querySelectorAll("GeoObject");
                    for (const featureNode of featureNodes) {
                        const addressNode = featureNode.querySelector("GeocoderMetaData text");
                        const address = addressNode ? addressNode.textContent : null;
                        const posNode = featureNode.querySelector("Point pos");
                        const coordinates = posNode?.textContent !== null ? posNode?.textContent.split(" ") : null;

                        if (address && coordinates) {
                            dispatch(setLtEvent(Number(coordinates[1])));
                            dispatch(setLgEvent(Number(coordinates[0])));
                            dispatch(setAddressEvent(address.substring(19)));
                            break;
                        } else {
                            console.log("Address or Coordinates not found for a feature");
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            handleClick();
        }
        dispatch(setLatYandexMap(-1));

    }
    return (
        <>
            <div className='mx-auto w-[1000px] font-inter'>
                <div className='w-full h-[40px] text-2xl border-b-[1px] border-b-gray-200'>Location</div>
                <div className='flex gap-x-5 my-[20px] items-center'>
                    <AutoComplete  value={eventAddress} onSearch={handleChange} options={vars} onChange={(value) => dispatch(setAddressEvent(value))} className='w-[500px] h-[50px] block outline-none bg-gray-100 rounded-[10px] ' placeholder='Set Location' />
                    <button onClick={()=> handleLocation(eventAddress)} className='border-[1px] h-[30px] rounded-[15px] px-3 py-1 border-black text-xl flex items-center'>Set</button>
                </div>
                <YandexMap x={800} y={400} lat={eventLt} lg={eventLg} showUser={true}/>
            </div>
        </>
    )
}

export default EventLocation;
/*
handleLocation(eventAddress)
 */