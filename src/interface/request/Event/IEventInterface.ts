export interface IEventInterface {
    "id": number,
        "title": string,
        "description": string
        "status": number,
        "maxAge": number,
        "minAge": number,
        "price": number,
        "images": [
        {
            "id": number,
            "eventID": number,
            "url": string,
            "createdAt": string
        }
    ],
        "imageIds": null,
        "created_at": string,
        "categories": [
        {
            "id": number,
            "name": string
        },
        {
            "id": number,
            "name": string
        },
        {
            "id": number,
            "name": string
        }
    ],
        "locations": [
        {
            "id": number,
            "eventID": number,
            "address": string,
            "longitude": number,
            "latitude": number,
            "startsAt": string,
            "endsAt": string,
            "seats": number,
            "attendeesCount": number,
            "archived": false
        }
    ],
        "managers": [
        {
            "eventID": number,
            "user": {
                "id": number,
                "userId": number,
                "phone": string,
                "username": string,
                "firstname": string,
                "lastname": string,
                "profileImage": string,
                "dateOfBirth": string,
                "preferences": null
            },
            "role": {
                "id": number,
                "name": string,
                "eventId": number,
                "permissions": [
                    number,
                    number,
                    number
                ]
            }
        }
    ],
        "followerCount": number
}