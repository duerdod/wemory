export const darken = (hsl: string, value = 10): string => {
    const color = hsl.split(',');
    const [hue, saturation, light] = color;
    const lightness = Number(light.substring(3, 0)) - value;
    return [hue, saturation, `${lightness}%)`].join();
};