import React, { useRef, useEffect, useMemo, useState } from "react";

export function useIsInViewport(ref: React.MutableRefObject<any>) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    if (!window?.IntersectionObserver) {
        return;
    }

    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) =>
                setIsIntersecting(entry.isIntersecting), {
                threshold: 0.8
            }),
        []);

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        }
    }, [ref, observer]);

    return isIntersecting;
}