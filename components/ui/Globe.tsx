"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Color, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

extend({ ThreeGlobe });

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: any;
  }
}

// ---------------- TYPES ----------------
type Arc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string; // ✅ MUST be string
  order: number;
  arcAlt: number;
};

type GlobeConfig = {
  globeColor: string;
  emissive: string;
  atmosphereColor: string;
  atmosphereAltitude: number;
  polygonColor: string;
  arcLength: number;
  arcTime: number;
  pointSize: number;
  maxRings: number;
};

// ---------------- UTILS ----------------
const safeColor = (c: any) => (typeof c === "string" ? c : "#ffffff");

function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

// ---------------- GLOBE ----------------
function Globe({
  data,
  globeConfig,
}: {
  data: Arc[];
  globeConfig: GlobeConfig;
}) {
  const globeRef = useRef<any>(null);
  const [points, setPoints] = useState<any[]>([]);

  // ✅ Convert arcs → points (STRING COLORS ONLY)
  const processedPoints = useMemo(() => {
    const pts: any[] = [];

    data.forEach((arc) => {
      const color = safeColor(arc.color);

      pts.push(
        {
          lat: arc.startLat,
          lng: arc.startLng,
          color,
          size: globeConfig.pointSize,
          order: arc.order,
        },
        {
          lat: arc.endLat,
          lng: arc.endLng,
          color,
          size: globeConfig.pointSize,
          order: arc.order,
        }
      );
    });

    // remove duplicates
    return pts.filter(
      (v, i, arr) =>
        arr.findIndex((x) => x.lat === v.lat && x.lng === v.lng) === i
    );
  }, [data, globeConfig.pointSize]);

  useEffect(() => {
    setPoints(processedPoints);
  }, [processedPoints]);

  // ✅ Material setup
  useEffect(() => {
    if (!globeRef.current) return;

    const mat = globeRef.current.globeMaterial();

    mat.color = new Color(globeConfig.globeColor);
    mat.emissive = new Color(globeConfig.emissive);
    mat.emissiveIntensity = 0.1;
    mat.shininess = 0.9;
  }, [globeConfig]);

  // ✅ Main setup
  useEffect(() => {
    if (!globeRef.current || !points.length) return;

    const globe = globeRef.current;

    // HEX POLYGONS
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor(globeConfig.atmosphereColor)
      .atmosphereAltitude(globeConfig.atmosphereAltitude)
      .hexPolygonColor(() => globeConfig.polygonColor);

    // ARCS
    globe
      .arcsData(data)
      .arcStartLat((d: Arc) => d.startLat)
      .arcStartLng((d: Arc) => d.startLng)
      .arcEndLat((d: Arc) => d.endLat)
      .arcEndLng((d: Arc) => d.endLng)
      .arcColor((d: Arc) => safeColor(d.color))
      .arcAltitude((d: Arc) => d.arcAlt)
      .arcStroke(() => [0.28, 0.3, 0.32][Math.floor(Math.random() * 3)])
      .arcDashLength(globeConfig.arcLength)
      .arcDashInitialGap((d: Arc) => d.order)
      .arcDashGap(15)
      .arcDashAnimateTime(globeConfig.arcTime);

    // POINTS
    globe
      .pointsData(points)
      .pointColor((d: any) => safeColor(d.color))
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);

    // RINGS animation
    const interval = setInterval(() => {
      const indices = genRandomNumbers(
        0,
        points.length,
        Math.floor((points.length * 4) / 5)
      );

      globe
        .ringsData(points.filter((_, i) => indices.includes(i)))
        .ringColor((d: any) => safeColor(d.color))
        .ringMaxRadius(globeConfig.maxRings)
        .ringPropagationSpeed(2)
        .ringRepeatPeriod(2000);
    }, 2000);

    return () => clearInterval(interval);
  }, [points, data, globeConfig]);

  return <threeGlobe ref={globeRef} />;
}

// ---------------- WORLD ----------------
export function World({
  data,
  globeConfig,
}: {
  data: Arc[];
  globeConfig: GlobeConfig;
}) {
  return (
    <Canvas camera={new PerspectiveCamera(50, 1, 180, 1800)}>
      <ambientLight intensity={0.6} />
      <directionalLight position={new Vector3(-400, 100, 400)} />
      <directionalLight position={new Vector3(-200, 500, 200)} />
      <pointLight position={new Vector3(-200, 500, 200)} intensity={0.8} />

      <Globe data={data} globeConfig={globeConfig} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}
