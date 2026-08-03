import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  phase: 'idle' | 'dust' | 'pulse' | 'accelerate' | 'assemble';
}

export const HeroCanvas: React.FC<Props> = ({ phase }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Standard high-performance WebGL setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dust particles (Phase 1)
    const dustCount = 180;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPositions[i] = (Math.random() - 0.5) * 60;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x888888,
      transparent: true,
      opacity: 0,
    });
    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustParticles);

    // Network nodes and lines (Phase 2 & 3)
    const nodeCount = 30;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const initialNodes = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      initialNodes[i * 3] = x;
      initialNodes[i * 3 + 1] = y;
      initialNodes[i * 3 + 2] = z;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.35,
      color: 0x00e87a,
      transparent: true,
      opacity: 0,
    });
    const nodeParticles = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeParticles);

    // Connecting lines setup
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00e87a,
      transparent: true,
      opacity: 0,
    });
    const linePositions = new Float32Array(nodeCount * nodeCount * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(networkLines);

    // Dynamic wave grid (Phase 4 / Dashboard boundary coordinates)
    const gridCols = 30;
    const gridRows = 30;
    const gridCount = gridCols * gridRows;
    const gridPositions = new Float32Array(gridCount * 3);
    const gridColors = new Float32Array(gridCount * 3);

    let idx = 0;
    for (let x = 0; x < gridCols; x++) {
      for (let z = 0; z < gridRows; z++) {
        gridPositions[idx * 3] = (x - gridCols / 2) * 1.6;
        gridPositions[idx * 3 + 1] = -10; // Sit low initially
        gridPositions[idx * 3 + 2] = (z - gridRows / 2) * 1.6;

        gridColors[idx * 3] = 0.0;
        gridColors[idx * 3 + 1] = 0.91; // G
        gridColors[idx * 3 + 2] = 0.48; // B
        idx++;
      }
    }

    const gridGeometry = new THREE.BufferGeometry();
    gridGeometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
    gridGeometry.setAttribute('color', new THREE.BufferAttribute(gridColors, 3));

    const gridMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0,
    });
    const gridParticles = new THREE.Points(gridGeometry, gridMaterial);
    scene.add(gridParticles);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const currentPhase = phaseRef.current;

      // Phase 1: Faint dust opacity fade-in
      if (currentPhase === 'dust' || currentPhase === 'pulse' || currentPhase === 'accelerate' || currentPhase === 'assemble') {
        dustMaterial.opacity = Math.min(dustMaterial.opacity + 0.01, 0.45);
        dustParticles.rotation.y = time * 0.02;
      }

      // Phase 2: Central pulsing star + growing network connections
      if (currentPhase === 'pulse' || currentPhase === 'accelerate' || currentPhase === 'assemble') {
        nodeMaterial.opacity = Math.min(nodeMaterial.opacity + 0.02, 0.85);
        lineMaterial.opacity = Math.min(lineMaterial.opacity + 0.015, 0.25);

        // Build growing lines paths dynamically
        const nodePos = nodeGeometry.attributes.position.array as Float32Array;
        const linePos = lineGeometry.attributes.position.array as Float32Array;
        let lineIdx = 0;

        const maxDist = 6 + Math.sin(time) * 1.5;

        for (let i = 0; i < nodeCount; i++) {
          const ix = nodePos[i * 3];
          const iy = nodePos[i * 3 + 1];
          const iz = nodePos[i * 3 + 2];

          for (let j = i + 1; j < nodeCount; j++) {
            const jx = nodePos[j * 3];
            const jy = nodePos[j * 3 + 1];
            const jz = nodePos[j * 3 + 2];

            const dx = ix - jx;
            const dy = iy - jy;
            const dz = iz - jz;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              linePos[lineIdx * 3] = ix;
              linePos[lineIdx * 3 + 1] = iy;
              linePos[lineIdx * 3 + 2] = iz;

              linePos[lineIdx * 3 + 3] = jx;
              linePos[lineIdx * 3 + 4] = jy;
              linePos[lineIdx * 3 + 5] = jz;
              lineIdx += 2;
            }
          }
        }
        lineGeometry.attributes.position.needsUpdate = true;
      }

      // Phase 3: Network acceleration & camera zoom
      if (currentPhase === 'accelerate') {
        camera.position.z = Math.max(camera.position.z - 0.15, 12);
        nodeParticles.rotation.y = time * 0.15;
        networkLines.rotation.y = time * 0.15;
      }

      // Phase 4: Grid assembly
      if (currentPhase === 'assemble') {
        camera.position.z = Math.max(camera.position.z - 0.1, 8);
        gridMaterial.opacity = Math.min(gridMaterial.opacity + 0.02, 0.6);

        // Smoothly warp grid positions upward to outline layout bounds
        const gridPos = gridGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < gridCount; i++) {
          const targetY = Math.sin(gridPos[i * 3] * 0.3) * Math.cos(gridPos[i * 3 + 2] * 0.3) * 1.5 - 2;
          gridPos[i * 3 + 1] += (targetY - gridPos[i * 3 + 1]) * 0.08;
        }
        gridGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      dustGeometry.dispose();
      dustMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
