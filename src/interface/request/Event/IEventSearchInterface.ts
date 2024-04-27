export interface IEventSearchInterface {
    "eventId": number,
    "title": string,
    "description": string
    "likeCount": number,
    "ageMin": number,
    "price": number,
    "images": string[],
    "created_at": string,
    "categories": [
        {
            "categoryId": number,
            "categoryName": string
        },
        {
            "categoryId": number,
            "categoryName": string
        },
        {
            "categoryId": number,
            "categoryName": string
        }
    ],
    "location":
        {
            "id": number,
            "eventID": number,
            "address": string,
            "lon": number,
            "lat": number,
            "seats": number,
            "attendeesCount": number,
            "archived": false
        }
    ,
    "startsAt": string,
    "endsAt": string,
    "author":
        {
            "username": string,
                "userId": number,
                "firstname": string,
                "lastname": string,
                "profileImage": string,
        }
    "followerCount": number
}