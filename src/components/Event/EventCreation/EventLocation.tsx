import React, { useState } from 'react';
import YandexMap from "../../Map/YandexMap";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store";
import {AutoComplete} from "antd";

type Yandex = {
    value: string;
    label: string;
}
const EventLocation = () => {
    const [vars, setVars] = useState<Yandex[]>([])
    const [inputValue, setInputValue] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
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

    const handleLocation = (value: string) => {
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
                        setLatitude(Number(coordinates[1]))
                        setLongitude(Number(coordinates[0]));
                        console.log("Address:", address);
                        console.log("Latitude:", latitude);
                        console.log("Longitude:", longitude);
                        break;
                    } else {
                        console.log("Address or Coordinates not found for a feature");
                    }

                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }



    return (
        <>
            <div className='mx-auto w-[1000px] font-inter'>
                <div className='w-full h-[40px] text-2xl border-b-[1px] border-b-gray-200'>Location</div>
                <div className='flex gap-x-5 my-[20px] items-center'>
                    <AutoComplete onSearch={handleChange} options={vars} onChange={(value) => setInputValue(value)} className='w-[500px] h-[50px] block outline-none bg-gray-100 rounded-[10px] ' placeholder='Set Location' />
                    <button onClick={()=> handleLocation(inputValue)} className='border-[1px] h-[30px] rounded-[15px] px-3 py-1 border-black text-xl flex items-center'>Set</button>
                </div>
                <YandexMap x={800} y={300} lat={latitude} lg={longitude}/>
            </div>
        </>
    )
}

export default EventLocation;

/*

 <input placeholder='Set location' className='w-[500px] h-[50px] block outline-none bg-gray-100 rounded-[10px] p-5 my-[20px]'
                onChange={}
                />
 */