// Simplified Finland border outline as SVG path
// Coordinate system: SVG viewBox maps lat 59.8–70.1 (y, inverted) and lon 19.5–31.6 (x)
// We use a helper to convert lat/lon to SVG coords in FinlandMap.tsx

// Simplified outline — ~40 control points tracing Finland's border
// Drawn clockwise from SW corner (Åland area) up the west coast,
// across Lapland, down the east border, along the south coast
export const FINLAND_OUTLINE_PATH = `
  M 21.0,60.1
  L 21.2,60.5
  L 21.0,61.0
  L 21.3,61.5
  L 21.5,62.0
  L 21.3,62.5
  L 21.5,63.0
  L 22.5,63.3
  L 23.0,63.8
  L 23.5,64.2
  L 24.0,64.8
  L 24.2,65.2
  L 24.0,65.8
  L 24.2,66.3
  L 23.8,67.0
  L 23.5,67.5
  L 24.0,68.0
  L 25.0,68.5
  L 25.8,69.0
  L 26.5,69.3
  L 27.5,69.9
  L 28.0,69.5
  L 29.0,69.1
  L 29.5,68.5
  L 30.0,67.8
  L 30.2,67.0
  L 30.5,66.5
  L 30.0,66.0
  L 29.5,65.3
  L 29.8,64.8
  L 30.5,64.2
  L 30.8,63.5
  L 31.2,63.0
  L 31.0,62.5
  L 30.5,62.0
  L 30.2,61.5
  L 29.5,61.2
  L 28.5,60.8
  L 27.5,60.5
  L 26.5,60.3
  L 25.5,60.2
  L 24.5,60.1
  L 23.5,60.0
  L 22.5,60.0
  Z
`;
