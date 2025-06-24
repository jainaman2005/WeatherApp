export function getTimeByTimezoneOffset(offsetInSeconds: number): Date {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const targetTime = new Date(utcTime + offsetInSeconds * 1000);
    return targetTime;
}
export function getGradientByHour(hour: number): string {
    switch (true) {
        case hour >= 5 && hour < 8:
            // Dawn — soft blue to white
            return 'bg-gradient-to-r from-blue-300 via-white to-yellow-100';
        case hour >= 8 && hour < 12:
            // Morning — bright yellow to orange
            return 'bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-200';
        case hour >= 12 && hour < 17:
            // Afternoon — strong yellow/orange
            return 'bg-gradient-to-r from-yellow-300 via-orange-300 to-orange-400';
        case hour >= 17 && hour < 20:
            // Sunset — deep orange to gray
            return 'bg-gradient-to-r from-orange-500 via-sky-600 to-blue-950';
        case hour >= 20 && hour < 23:
            // Evening — gray to blue to black
            return 'bg-gradient-to-r from-sky-700 via-blue-900 to-black';
        case (hour >= 23 && hour <= 23) || (hour >= 0 && hour < 5):
            // Night — dark gray to black
            return 'bg-gradient-to-r from-gray-900 via-black to-gray-800';
        default:
            return 'bg-gradient-to-r from-white to-gray-300'; // fallback
    }
}

export function capitalizeWords(str: string): string {
    return str
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}
type Pollutants = {
  pm2_5: number;
  pm10: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
};

type Breakpoint = {
  cLow: number;
  cHigh: number;
  iLow: number;
  iHigh: number;
};

// AQI Breakpoints for US EPA
const breakpoints: Record<string, Breakpoint[]> = {
  pm2_5: [
    { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 500.4, iLow: 301, iHigh: 500 }
  ],
  pm10: [
    { cLow: 0, cHigh: 54, iLow: 0, iHigh: 50 },
    { cLow: 55, cHigh: 154, iLow: 51, iHigh: 100 },
    { cLow: 155, cHigh: 254, iLow: 101, iHigh: 150 },
    { cLow: 255, cHigh: 354, iLow: 151, iHigh: 200 },
    { cLow: 355, cHigh: 424, iLow: 201, iHigh: 300 },
    { cLow: 425, cHigh: 604, iLow: 301, iHigh: 500 }
  ],
  co: [
    { cLow: 0.0, cHigh: 4.4, iLow: 0, iHigh: 50 },
    { cLow: 4.5, cHigh: 9.4, iLow: 51, iHigh: 100 },
    { cLow: 9.5, cHigh: 12.4, iLow: 101, iHigh: 150 },
    { cLow: 12.5, cHigh: 15.4, iLow: 151, iHigh: 200 },
    { cLow: 15.5, cHigh: 30.4, iLow: 201, iHigh: 300 },
    { cLow: 30.5, cHigh: 40.4, iLow: 301, iHigh: 500 }
  ],
  no2: [
    { cLow: 0, cHigh: 53, iLow: 0, iHigh: 50 },
    { cLow: 54, cHigh: 100, iLow: 51, iHigh: 100 },
    { cLow: 101, cHigh: 360, iLow: 101, iHigh: 150 },
    { cLow: 361, cHigh: 649, iLow: 151, iHigh: 200 },
    { cLow: 650, cHigh: 1249, iLow: 201, iHigh: 300 },
    { cLow: 1250, cHigh: 2049, iLow: 301, iHigh: 500 }
  ],
  so2: [
    { cLow: 0, cHigh: 35, iLow: 0, iHigh: 50 },
    { cLow: 36, cHigh: 75, iLow: 51, iHigh: 100 },
    { cLow: 76, cHigh: 185, iLow: 101, iHigh: 150 },
    { cLow: 186, cHigh: 304, iLow: 151, iHigh: 200 },
    { cLow: 305, cHigh: 604, iLow: 201, iHigh: 300 },
    { cLow: 605, cHigh: 1004, iLow: 301, iHigh: 500 }
  ],
  o3: [
    { cLow: 0, cHigh: 54, iLow: 0, iHigh: 50 },
    { cLow: 55, cHigh: 70, iLow: 51, iHigh: 100 },
    { cLow: 71, cHigh: 85, iLow: 101, iHigh: 150 },
    { cLow: 86, cHigh: 105, iLow: 151, iHigh: 200 },
    { cLow: 106, cHigh: 200, iLow: 201, iHigh: 300 }
  ]
};

function computeAQI(concentration: number, pollutant: keyof typeof breakpoints): number {
  const bp = breakpoints[pollutant];
  for (const b of bp) {
    if (concentration >= b.cLow && concentration <= b.cHigh) {
      const aqi = ((b.iHigh - b.iLow) / (b.cHigh - b.cLow)) * (concentration - b.cLow) + b.iLow;
      return Math.round(aqi);
    }
  }
  return 1; // invalid or out-of-range
}
function getAqiCategory(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}
export function getOverallAQI(pollutants: Pollutants): { aqi: number; level : string ;details: Record<string, number> } {
  const aqiValues: Record<string, number> = {
    pm2_5: computeAQI(pollutants.pm2_5, 'pm2_5'),
    pm10: computeAQI(pollutants.pm10, 'pm10'),
    co: computeAQI(pollutants.co, 'co'),
    no2: computeAQI(pollutants.no2, 'no2'),
    so2: computeAQI(pollutants.so2, 'so2'),
    o3: computeAQI(pollutants.o3, 'o3')
  };

  const maxAqi = Math.max(...Object.values(aqiValues));
  return {
    aqi: maxAqi,
    level: getAqiCategory(maxAqi),
    details: aqiValues
  };
}
