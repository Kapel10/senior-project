export interface UserInformation {
    "id": number;
    "userId": number;
    "phone": string;
    "username": string;
    "firstname": string;
    "lastname": string;
    "profileImage": string;
    "dateOfBirth": string;
    "preferences": UserCategory[];
}

interface UserCategory {
    "id": number;
    "name": string;
}