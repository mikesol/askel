export interface CityCoord {
  name: string;
  lat: number;
  lon: number;
}

export const CITIES: CityCoord[] = [
  // Southern Finland (most prospects cluster here)
  { name: "Helsinki", lat: 60.17, lon: 24.94 },
  { name: "Espoo", lat: 60.21, lon: 24.66 },
  { name: "Vantaa", lat: 60.29, lon: 25.04 },
  { name: "Turku", lat: 60.45, lon: 22.27 },
  { name: "Tampere", lat: 61.50, lon: 23.79 },
  { name: "Lahti", lat: 60.98, lon: 25.66 },
  { name: "Porvoo", lat: 60.39, lon: 25.66 },
  { name: "Hämeenlinna", lat: 60.99, lon: 24.46 },
  { name: "Kotka", lat: 60.47, lon: 26.95 },
  { name: "Kouvola", lat: 60.87, lon: 26.70 },
  { name: "Lappeenranta", lat: 61.06, lon: 28.19 },
  { name: "Pori", lat: 61.49, lon: 21.80 },
  { name: "Rauma", lat: 61.13, lon: 21.51 },
  { name: "Salo", lat: 60.39, lon: 23.13 },
  { name: "Lohja", lat: 60.25, lon: 24.07 },
  // Central Finland
  { name: "Jyväskylä", lat: 62.24, lon: 25.75 },
  { name: "Kuopio", lat: 62.89, lon: 27.68 },
  { name: "Joensuu", lat: 62.60, lon: 29.76 },
  { name: "Mikkeli", lat: 61.69, lon: 27.27 },
  { name: "Seinäjoki", lat: 62.79, lon: 22.84 },
  { name: "Vaasa", lat: 63.10, lon: 21.62 },
  { name: "Kokkola", lat: 63.84, lon: 23.13 },
  // Northern Finland
  { name: "Oulu", lat: 65.01, lon: 25.47 },
  { name: "Kajaani", lat: 64.23, lon: 27.73 },
  { name: "Rovaniemi", lat: 66.50, lon: 25.73 },
  { name: "Kemi", lat: 65.74, lon: 24.56 },
  { name: "Tornio", lat: 65.85, lon: 24.15 },
  { name: "Sodankylä", lat: 67.42, lon: 26.60 },
  { name: "Inari", lat: 69.07, lon: 27.03 },
];
