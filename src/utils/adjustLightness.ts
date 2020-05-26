export const adjustLightness = (hsl: string, value = 10): string => {
  const color = hsl.split(',')
  const [hue, saturation, light] = color
  let calcLight = Number(light.substring(3, 0))
  let lightness = (calcLight -= value)
  return [hue, saturation, `${lightness}%)`].join()
}
