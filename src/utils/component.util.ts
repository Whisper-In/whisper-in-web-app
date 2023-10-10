export const isScrollEnded = (event: React.UIEvent, invert?: boolean) => {
    if (invert) {
        return event.currentTarget.scrollTop <= 0;
    } else {
        const currentScroll = Math.round(event.currentTarget.scrollTop + event.currentTarget.clientHeight);
        return currentScroll >= event.currentTarget.scrollHeight;
    }
}