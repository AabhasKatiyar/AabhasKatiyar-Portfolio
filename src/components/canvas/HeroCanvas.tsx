import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 3D Scene & Perspective Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Grid Dimensions
    const cols = 50;
    const rows = 50;
    const numParticles = cols * rows;
    const positions = new Float32Array(numParticles * 3);
    const initialY = new Float32Array(numParticles);
    const colors = new Float32Array(numParticles * 3);

    let idx = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const posX = (x - cols / 2) * 1.5;
        const posZ = (z - rows / 2) * 1.5;
        const posY = Math.sin(posX * 0.25) * Math.cos(posZ * 0.25) * 2;

        positions[idx * 3] = posX;
        positions[idx * 3 + 1] = posY;
        positions[idx * 3 + 2] = posZ;

        initialY[idx] = posY;

        // Gradient Colors: Electric Lime (#c8ff00) to Cyan (#00e5ff)
        const ratio = x / cols;
        colors[idx * 3] = 0.78 * (1 - ratio);       // R
        colors[idx * 3 + 1] = 1.0;                   // G
        colors[idx * 3 + 2] = 0.2 + ratio * 0.8;     // B

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    particleSystem.rotation.x = 0.55;
    scene.add(particleSystem);

    // Mouse Tracking Physics
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

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

      // Smooth inertia camera tracking
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particleSystem.rotation.y = time * 0.04 + targetX * 0.35;
      particleSystem.rotation.x = 0.55 + targetY * 0.25;

      // Wave deformation physics
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < numParticles; i++) {
        const px = array[i * 3];
        const pz = array[i * 3 + 2];
        array[i * 3 + 1] =
          initialY[i] +
          Math.sin(time * 2.2 + px * 0.4) * 0.9 +
          Math.cos(time * 1.8 + pz * 0.4) * 0.9;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
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
        opacity: 0.7,
      }}
    />
  );
};
