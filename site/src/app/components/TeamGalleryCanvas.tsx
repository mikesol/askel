"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage, Text } from "@react-three/drei";
import * as THREE from "three";

interface PhotoData {
  src: string;
  name: string;
  role: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

const photos: PhotoData[] = [
  {
    src: "/team/varia.jpeg",
    name: "Vária",
    role: "CEO",
    position: [-2.2, 0.3, -1],
    rotation: [0, 0.25, 0.04],
  },
  {
    src: "/team/niklas.jpeg",
    name: "Niklas",
    role: "Finance",
    position: [-0.5, 0.5, -2],
    rotation: [0, 0.1, -0.03],
  },
  {
    src: "/team/mikke.jpeg",
    name: "Mikael",
    role: "Operations",
    position: [1.2, 0.3, -1.5],
    rotation: [0, -0.15, 0.03],
  },
  {
    src: "/team/mike.jpeg",
    name: "Mike",
    role: "Technology",
    position: [2.8, 0.4, -1],
    rotation: [0, -0.3, -0.04],
  },
];

function FloatingPhoto({
  photo,
  index,
}: {
  photo: PhotoData;
  index: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const basePos = useRef(new THREE.Vector3(...photo.position));
  const targetScale = useRef(1);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle floating
    meshRef.current.position.y =
      basePos.current.y + Math.sin(t * 0.5 + index * 1.2) * 0.08;
    meshRef.current.position.x =
      basePos.current.x + Math.cos(t * 0.3 + index * 0.8) * 0.04;

    // Hover scale
    targetScale.current = hovered ? 1.15 : 1;
    const s = THREE.MathUtils.lerp(
      meshRef.current.scale.x,
      targetScale.current,
      0.1
    );
    meshRef.current.scale.setScalar(s);

    // Hover z
    const targetZ = hovered ? basePos.current.z + 1 : basePos.current.z;
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ,
      0.1
    );
  });

  return (
    <group
      ref={meshRef}
      position={photo.position}
      rotation={photo.rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <DreiImage
        url={photo.src}
        scale={[1.6, 1.2]}
        transparent
        opacity={hovered ? 1 : 0.85}
      />
      {/* Border frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.66, 1.26]} />
        <meshBasicMaterial
          color={hovered ? "#00d4aa" : "#222222"}
          transparent
          opacity={hovered ? 0.6 : 0.3}
        />
      </mesh>
      {/* Name label */}
      {hovered && (
        <Text
          position={[0, -0.75, 0.05]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
        >
          {`${photo.name} — ${photo.role}`}
        </Text>
      )}
    </group>
  );
}

function CameraRig() {
  const { camera, gl } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [gl]);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseRef.current.x * 0.3,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      -mouseRef.current.y * 0.2,
      0.05
    );
    camera.lookAt(0, 0, -1.5);
  });

  return null;
}

interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly tags: readonly string[];
  readonly image: string;
}

export default function TeamGalleryCanvas({
  team,
}: {
  team: readonly TeamMember[];
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={0.5} />
      <CameraRig />
      {photos.map((photo, i) => (
        <FloatingPhoto key={photo.src} photo={photo} index={i} />
      ))}
    </Canvas>
  );
}
