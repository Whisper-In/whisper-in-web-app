const mobileRegex = new RegExp(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/gi);

export const isMobile = (userAgent: string | null) => {
    console.log("userAgent:", userAgent);
    return userAgent?.match(mobileRegex)?.length ?? 0 > 0
}