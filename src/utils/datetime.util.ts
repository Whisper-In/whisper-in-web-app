export const convertToMessageTime = (time: Date | string) => {
    time = typeof time == "string" ? new Date(time) : time;

    return time.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
