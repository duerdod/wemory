
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
export const coolShadow = (color: string, number: number) =>
    Array(number)
        .fill(color)
        .reduce(
            (string, current, index) => {
                const properShadowPixel = index + 1
                return string + `
                    ${properShadowPixel}px 
                    ${properShadowPixel}px 
                    0px 
                    ${current} 
                    ${number === properShadowPixel ? ';' : ','}`
            }, '');

// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!! reduce me
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!
// EASY TO READ HUH!!!!