import { useEffect, useState } from "react";

export type ScrollDirection = "UP" | "DOWN" | undefined

export function useScrollVertical() {
    const [scrollDirection, setScrollDirection] = useState<"UP" | "DOWN" | undefined>(undefined);

    useEffect(() => {
        if (document?.body) {
            document.body.addEventListener("wheel", (e) => {
                if (e.deltaY > 0) {
                    setScrollDirection("DOWN");
                } else {
                    setScrollDirection("UP");
                }
            });
        }
    }, [document.body]);

    return scrollDirection;
}