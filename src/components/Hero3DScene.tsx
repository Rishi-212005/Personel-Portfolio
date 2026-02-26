import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

class R3FErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

const FloatingIcosahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[2.5, 0.5, -1]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.12} wireframe />
      </mesh>
    </Float>
  );
};

const FloatingTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={[-2.8, -0.5, -2]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.1} wireframe />
      </mesh>
    </Float>
  );
};

const FloatingOctahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, -2, -1.5]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} wireframe />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.03} color="#2dd4bf" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const Hero3DScene = () => (
  <R3FErrorBoundary>
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#2dd4bf" />
        <pointLight position={[-5, -5, 3]} intensity={0.3} color="#7c3aed" />
        <FloatingIcosahedron />
        <FloatingTorus />
        <FloatingOctahedron />
        <Particles />
      </Canvas>
    </div>
  </R3FErrorBoundary>
);

export default Hero3DScene;
