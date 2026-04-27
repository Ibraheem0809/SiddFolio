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

// ---------------- SAFE WEBGL CHECK ----------------
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ---------------- GLOBE ----------------
function Globe({ data, globeConfig }: any) {
  const globeRef = useRef<any>(null);
  const [points, setPoints] = useState<any[]>([]);

  const processedPoints = useMemo(() => {
    const pts: any[] = [];

    data.forEach((arc: any) => {
      const color = typeof arc.color === "string" ? arc.color : "#ffffff";

      pts.push(
        { lat: arc.startLat, lng: arc.startLng, color },
        { lat: arc.endLat, lng: arc.endLng, color }
      );
    });

    return pts;
  }, [data]);

  useEffect(() => {
    setPoints(processedPoints);
  }, [processedPoints]);

  useEffect(() => {
    if (!globeRef.current) return;

    const mat = globeRef.current.globeMaterial();
    mat.color = new Color(globeConfig.globeColor);
    mat.emissive = new Color(globeConfig.emissive);
  }, [globeConfig]);

  useEffect(() => {
    if (!globeRef.current || !points.length) return;

    const globe = globeRef.current;

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor(globeConfig.atmosphereColor)
      .atmosphereAltitude(globeConfig.atmosphereAltitude);

    globe
      .arcsData(data)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.arcAlt);
  }, [points, data, globeConfig]);

  return <threeGlobe ref={globeRef} />;
}

// ---------------- WORLD (FIXED) ----------------
export function World({ data, globeConfig }: any) {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebgl(isWebGLAvailable());
  }, []);

  // ✅ Prevent SSR + WebGL crash
  if (!mounted) return null;

  // ❌ If WebGL not supported → fallback UI
  if (!webgl) {
    return (
      <div className="text-white text-center p-10">
        WebGL not supported on this device
      </div>
    );
  }

  return (
    <Canvas camera={new PerspectiveCamera(50, 1, 180, 1800)}>
      <ambientLight intensity={0.6} />
      <directionalLight position={new Vector3(-400, 100, 400)} />
      <pointLight position={new Vector3(-200, 500, 200)} />

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
