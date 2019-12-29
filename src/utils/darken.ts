export const darken = (hsl: string): string => {
    const color = hsl.split(',');
    const [hue, saturation, light] = color;
    const lightness = Number(light.substring(3, 0)) - 10;
    return [hue, saturation, `${lightness}%)`].join();
};