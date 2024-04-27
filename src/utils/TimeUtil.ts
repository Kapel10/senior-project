export const TimeUtil = (date: any) => {

    const eventTime = new Date(date);

    eventTime.setHours(eventTime.getUTCHours() - 1);

    return `${eventTime.getDate().toString().padStart(2, '0')}.${(eventTime.getMonth() + 1).toString().padStart(2, '0')}.${eventTime.getFullYear()} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}`;
};

export function formatDateToMonthDay(dateString: any): string {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    return `${day} ${month}`;
}

export function extractHourAndMinutes(timeString: any): string {
    const date = new Date(timeString);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minutes}`;
}

export function convertPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(/\D/g, '');
}

export function convertDateFormat(dateString: string): string {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    } else {
        return 'Invalid date format';
    }
}

export function refreshPage(){
    window.location.reload();
}