export const coolShadow = (color: string, number: number, negative = false) =>
  Array(number)
    .fill(color)
    .reduce((string, color, index) => {
      const properShadowPixel = index + 1
      return (
        string +
        `
            ${properShadowPixel}px
            ${negative ? -properShadowPixel : properShadowPixel}px
            0px
            ${color}
            ${number === properShadowPixel ? '' : ','}
            `
      )
    }, '')
