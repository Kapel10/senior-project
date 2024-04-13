import React,{ useState, useEffect } from "react";
import YandexMap from "./Map/YandexMap";
import { AutoComplete } from 'antd';
import axios from "axios";
import {useDispatch} from "react-redux";
import {storeFunction} from "../stores/slices/functionSlice";

type MyObjectType = {
    value: string;
    label: string;
    house?: string;
    street: string;
    geo_lon: string;
    geo_lat: string;
    fias_id: string;
};

type Yandex = {
    value: string;
    label: string;
}
export default function Test() {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [options, setOptions] = useState<MyObjectType[]>([]);
    const [vars, setVars] = useState<Yandex[]>([])
    const [inputValue, setInputValue] = useState('');
    const [coordinates, setCoordinates] = useState({
        long: '',
        lat: ''
    })
    const handleSearch = async (value: string) => {
        try {
            const suggestions = await suggestFunction(value);
            const optionsArray: MyObjectType[] = suggestions.map((suggest: any) => {
                const label = `${suggest.data.street}${suggest.data.house ? ` ${suggest.data.house}` : ''}`;
                setCoordinates({
                    ...coordinates,
                    long: suggest.data?.geo_lon || '',
                    lat: suggest.data?.geo_lat || ''
                });
                return {
                    value: label,
                    label: label,
                    house: suggest.data.house,
                    street: suggest.data.street,
                    key: suggest.fias_id,
                };
            });
            setOptions(optionsArray);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const coordinatesMap = (lat?: string, long?: string) => {
        return {lat, long}
    }
    function handleChange(value: string) {
        const apiKey = "e6bf205f-4dce-4574-979d-9bba7be66812";
        const searchText = `город Астана, ул ${value}`;
        console.log(searchText)
        // Construct the URL
        const apiUrl = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${apiKey}&text=${searchText}&types=house,street&results=10`;

        // Make the request using the fetch function
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
    return (
        <>
            <AutoComplete onSearch={handleChange} options={vars} onChange={(value) => setInputValue(value)} className='border-2 border-solid m-3 w-[500px]' placeholder="input here" />
            <AutoComplete  placeholder="input here" options={options} onSearch={handleSearch} onChange={(value) => setInputValue(value)} className='w-[200px]'/>
            <button onClick={()=> {dispatch(storeFunction(coordinatesMap(coordinates.lat,coordinates.long)))}} className='border-2 border-solid m-3'>Search</button>
            <YandexMap x={400} y={400} showUser={true}/>
            {coordinates.lat} {coordinates.long}

        </>
    );
}



export const suggestFunction = async(value: string) => {
    const url  = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    const token = '5e402b86a708e261e916f1f65c9d38bbb3c0ff7e';
    const query = `ул ${value}`;
    const city = 'Астана';
    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${token}`,
        },
    };
    const data = {
        query: query,
        locations: [
            {
                city: city,
                country: "*",
            },
        ],
    };

    try {
        const response = await axios.post(url, data, config);
        console.log(response)
        return response.data.suggestions
        /*
        response.data.suggestions.map((suggest: any) => {
            const lat = suggest.data.geo_lat;
            const long = suggest.data.geo_lon;
            const house = suggest.data.house;
            const street = suggest.data.street;
            console.log('The address is ', street,house)
            console.log('The coordinates are ', lat, long)
        )
         */
    }
 catch (error) {
    console.error("Error:", error);
}

}
