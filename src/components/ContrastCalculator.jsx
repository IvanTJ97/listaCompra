const hexToRGB = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }

};
const luminance = ({ r, g, b }) => {
    let a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ?
            v / 12.92 :
            Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
const contrastCalculator = (color) => {
    const rgbColor = hexToRGB(color);
    const lum = luminance(rgbColor);
    return 1.05 / (lum + 0.05) >= 4.5 ? 'white' : 'black';
};
export default contrastCalculator;