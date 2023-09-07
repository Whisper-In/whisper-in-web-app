export const isScrollEnded = (event: React.UIEvent) => {
    const currentScroll = Math.round(event.currentTarget.scrollTop + event.currentTarget.clientHeight);
    return currentScroll >= event.currentTarget.scrollHeight;
}