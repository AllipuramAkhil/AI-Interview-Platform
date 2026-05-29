import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  Float,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";

import {
  useRef,
} from "react";

function AnimatedSphere() {
  const meshRef =
    useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x +=
        0.0015;

      meshRef.current.rotation.y +=
        0.002;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <Sphere
        ref={meshRef}
        args={[1.8, 128, 128]}
        scale={2.2}
      >
        <MeshDistortMaterial
          color="#22d3ee"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0}
          metalness={0.8}
          opacity={0.9}
          transparent
        />
      </Sphere>
    </Float>
  );
}

function GlowRing() {
  return (
    <mesh rotation={[1.5, 0, 0]}>
      <torusGeometry
        args={[4, 0.05, 16, 100]}
      />

      <meshStandardMaterial
        color="#3b82f6"
        emissive="#06b6d4"
        emissiveIntensity={4}
      />
    </mesh>
  );
}

function SmallFloatingOrb({
  position,
  color,
}) {
  return (
    <Float
      speed={3}
      rotationIntensity={2}
      floatIntensity={4}
    >
      <mesh position={position}>
        <sphereGeometry
          args={[0.18, 64, 64]}
        />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function Background3D() {
  return (
    <div
      className="
        absolute
        inset-0
        z-0
        overflow-hidden
      "
    >
      {/* Gradient Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-cyan-500/5
          via-transparent
          to-blue-600/10
        "
      />

      {/* 3D Canvas */}

      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
      >
        {/* Lights */}

        <ambientLight
          intensity={0.7}
        />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          color="#22d3ee"
        />

        <pointLight
          position={[-5, -5, -5]}
          intensity={1.5}
          color="#3b82f6"
        />

        {/* Stars */}

        <Stars
          radius={120}
          depth={80}
          count={7000}
          factor={5}
          saturation={0}
          fade
          speed={1.2}
        />

        {/* Main Sphere */}

        <AnimatedSphere />

        {/* Glow Ring */}

        <GlowRing />

        {/* Floating Orbs */}

        <SmallFloatingOrb
          position={[
            -4,
            2,
            -2,
          ]}
          color="#06b6d4"
        />

        <SmallFloatingOrb
          position={[
            4,
            -1,
            -3,
          ]}
          color="#3b82f6"
        />

        <SmallFloatingOrb
          position={[
            -3,
            -3,
            -1,
          ]}
          color="#8b5cf6"
        />

        <SmallFloatingOrb
          position={[
            3,
            3,
            -2,
          ]}
          color="#22d3ee"
        />

        {/* Controls */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>

      {/* Bottom Glow */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-72
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />
    </div>
  );
}

export default Background3D;