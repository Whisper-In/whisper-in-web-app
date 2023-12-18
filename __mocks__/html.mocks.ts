let scrollTop = 0;

function scrollTo(scroll?: ScrollToOptions): void;
function scrollTo(x: number, y: number): void;
function scrollTo(a?: number | ScrollToOptions, b?: number) {
    if (typeof (a) == "number") {
        Element.prototype.scrollLeft = a;

        if (b) {
            scrollTop = b;
        }
    }
    else if ((<ScrollToOptions>a).top || (<ScrollToOptions>a).left) {
        a = <ScrollToOptions>a;
        if (a.top) {
            scrollTop = a.top
        }

        if (a.left) {
            Element.prototype.scrollLeft = a.left
        }
    }
}

Element.prototype.scrollTo = scrollTo;

Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
    get() {
        return 1000
    }
});

Object.defineProperty(HTMLElement.prototype, "scrollTop", {
    get() {
        return scrollTop
    },
    set(value) {
        scrollTop = value
    }
});