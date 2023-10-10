export const stringToDate = (date: Date | string) => typeof date == "string" ? new Date(date) : date;

export const convertToMessageTime = (date: Date | string) => {
    return stringToDate(date).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

export const convertToMessageDate = (date?: Date | string) => {
    if (!date) {
        return null;
    };

    date = stringToDate(date);
    const today = new Date();
    const milliseconds = today.getTime() - date.getTime();
    const days = milliseconds / (1000 * 60 * 60 * 24);

    if (days >= 1) {
        if (days == 1) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                year: "2-digit",
                month: "short"
            });
        }
    } else {
        const minutes = milliseconds / (1000 * 60);

        if (minutes < 60) {
            return `${Math.round(minutes)} minutes ago`;
        } else {
            const hours = Math.round(minutes / 60);

            if (hours > 1)
                return `${hours} hours ago`;
            else {
                return `${hours} hour ago`;
            }
        }
    }
}

export const convertToMessageDateGroup = (date?: Date | string) => {
    if (!date) {
        return null;
    };

    const tempDate = stringToDate(date);
    const tempToday = new Date();

    date = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
    const today = new Date(tempToday.getFullYear(), tempToday.getMonth(), tempToday.getDate());

    const milliseconds = today.getTime() - date.getTime();
    const days = milliseconds / (1000 * 60 * 60 * 24);

    if (days > 1) {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            year: "2-digit",
            month: "short"
        });
    } else {
        if (days == 1) {
            return "Yesterday";
        } else {
            return "Today";
        }
    }
}

export const isDateEqual = (dateA: Date | string, dateB: Date | string) => {
    dateA = stringToDate(dateA);
    dateA = new Date(dateA?.getFullYear(), dateA?.getMonth(), dateA?.getDate());

    dateB = stringToDate(dateB);
    dateB = new Date(dateB?.getFullYear(), dateB?.getMonth(), dateB?.getDate());

    return dateA.getTime() == dateB.getTime();
}