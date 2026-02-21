import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

function Scene() {
  const scroll = useScroll();
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    // Link object rotation directly to scroll position for dynamic interaction
    const offset = scroll.offset;
    if (meshRef.current) {
      meshRef.current.rotation.y = offset * Math.PI * 4;
      meshRef.current.rotation.x = offset * Math.PI * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#4f46e5" wireframe={true} />
    </mesh>
  );
}

export default function ThreeCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas frameloop="demand" camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        {/* ScrollControls allows us to tie the 3D camera/object to user scroll position */}
        <ScrollControls pages={3} damping={0.1}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
