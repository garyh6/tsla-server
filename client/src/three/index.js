import React from "react";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three";

export function Sphere({ args, position }) {
  return (
    <mesh visible userData={{ test: "hello" }} position={position} castShadow>
      <sphereGeometry attach="geometry" args={args} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

// Geometry
export function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -2, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
export function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

export function Plane() {
  const url = "./pony_cartoon/textures/Body_SG1_baseColor.jpeg";
  const [texture] = useLoader(TextureLoader, url);
  console.log("************ texture", texture);
  return (
    <mesh>
      <planeGeometry attach="geometry" args={[10, 0, 2]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}
