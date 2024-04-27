import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store";
import React from "react";
import {EventService} from "../../../service/Event/EventService";
import {useNavigate} from "react-router-dom";

const EventCreate = () => {
    const navigate = useNavigate();
    const eventTitle = useSelector((state: RootState) => state.eventCreateStore.title);
    const eventDescription = useSelector((state: RootState) => state.eventCreateStore.description);
    const eventPrice = useSelector((state: RootState) => state.eventCreateStore.price);
    const eventSeats = useSelector((state: RootState) => state.eventCreateStore.seats);
    const eventAddress = useSelector((state: RootState) => state.eventCreateStore.address);
    const eventLg = useSelector((state: RootState) => state.eventCreateStore.lg);
    const eventLt = useSelector((state: RootState) => state.eventCreateStore.lt);
    const eventDate = useSelector((state: RootState) => state.eventCreateStore.date);
    const eventStarts_at = useSelector((state: RootState) => state.eventCreateStore.starts_at);
    const eventEnd_at = useSelector((state: RootState) => state.eventCreateStore.end_at);
    const eventCategories = useSelector((state: RootState) => state.eventCreateStore.categories);
    const eventMax_age = useSelector((state: RootState) => state.eventCreateStore.max_age);
    const eventMin_age = useSelector((state: RootState) => state.eventCreateStore.min_age);
    const eventImg = useSelector((state: RootState) => state.eventCreateStore.img);


    const categories = eventCategories.filter(category => category.active).map(category => category.id);

    const request = {
        address: eventAddress,
        categories: categories,
        date: eventDate,
        description: eventDescription,
        end_at: `${eventDate} ${eventEnd_at}`,
        lg: eventLg,
        lt: eventLt,
        max_age: eventMax_age,
        min_age: eventMin_age,
        price: eventPrice,
        seats: eventSeats,
        starts_at: `${eventDate} ${eventStarts_at}`,
        title: eventTitle
    };

    const handleSubmit = () => {
        console.log(request)
        const formData = new FormData();
        formData.append('payload', JSON.stringify(request));
        if(eventImg) {
            formData.append('images', eventImg);
        }

        EventService.createEvent(formData)
            .then((data) => {
                console.log(data)
                navigate('/')
            })
            .catch((error) => console.log(error));
    }
    return(
            <button
                onClick={handleSubmit}
                className='w-[90px] h-[30px] rounded-[15px] text-white bg-select-green'> Submit
            </button>
    );

}

export default EventCreate;