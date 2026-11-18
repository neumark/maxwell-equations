// Dimensionless teaching models. Coordinates use mathematical y-up convention.
export function electricField(x, y, charges) {
  return charges.reduce(([ex, ey], c) => {
    const dx = x - c.x, dy = y - c.y;
    const r = Math.max(Math.hypot(dx, dy), 0.01);
    return [ex + c.q * dx / r ** 3, ey + c.q * dy / r ** 3];
  }, [0, 0]);
}
// Increasing +z magnetic flux induces clockwise E (negative circulation).
export function inductionCirculation(rate) { return -rate; }
export function magneticCirculation(current, electricFluxRate) { return current + electricFluxRate; }
// x and time are measured in reference wavelengths and periods, so c = 1.
export function waveValue(x, time, frequency) { return Math.sin(2 * Math.PI * frequency * (x - time)); }
export function wavelength(frequency) { return 1 / frequency; }
