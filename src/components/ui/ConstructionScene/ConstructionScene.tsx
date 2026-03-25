'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import styles from './ConstructionScene.module.css';

interface ConstructionSceneProps {
  className?: string;
}

export default function ConstructionScene({ className = '' }: ConstructionSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  const createWireframeMaterial = useCallback((color: number, opacity: number = 1) => {
    return new THREE.LineBasicMaterial({
      color,
      transparent: opacity < 1,
      opacity,
      linewidth: 1,
    });
  }, []);

  const createBuilding = useCallback(() => {
    const buildingGroup = new THREE.Group();
    const whiteColor = 0xffffff;
    const lightGrayColor = 0xcccccc;
    const glowOrangeColor = 0xff6b00;
    const buildingWidth = 2;
    const buildingDepth = 2;
    const floorHeight = 0.3;
    const numFloors = 12;

    const columnPositions = [
      [-buildingWidth / 2, -buildingDepth / 2],
      [buildingWidth / 2, -buildingDepth / 2],
      [-buildingWidth / 2, buildingDepth / 2],
      [buildingWidth / 2, buildingDepth / 2],
    ];

    columnPositions.forEach(([x, z]) => {
      const columnGeom = new THREE.BoxGeometry(0.08, numFloors * floorHeight, 0.08);
      const columnEdges = new THREE.EdgesGeometry(columnGeom);
      const columnLine = new THREE.LineSegments(columnEdges, createWireframeMaterial(whiteColor));
      columnLine.position.set(x, (numFloors * floorHeight) / 2, z);
      buildingGroup.add(columnLine);
    });

    for (let i = 0; i <= numFloors; i++) {
      const floorY = i * floorHeight;
      const floorGeom = new THREE.BoxGeometry(buildingWidth, 0.05, buildingDepth);
      const floorEdges = new THREE.EdgesGeometry(floorGeom);
      const floorLine = new THREE.LineSegments(
        floorEdges,
        createWireframeMaterial(i % 3 === 0 ? glowOrangeColor : lightGrayColor, i % 3 === 0 ? 0.9 : 0.6)
      );
      floorLine.position.y = floorY;
      buildingGroup.add(floorLine);

      if (i < numFloors) {
        const gridLineGeomX = new THREE.BoxGeometry(buildingWidth - 0.1, 0.02, 0.02);
        const gridLineGeomZ = new THREE.BoxGeometry(0.02, 0.02, buildingDepth - 0.1);
        for (let j = 0; j < 3; j++) {
          const offset = (j - 1) * (buildingWidth / 3);
          const lineX = new THREE.LineSegments(new THREE.EdgesGeometry(gridLineGeomX), createWireframeMaterial(lightGrayColor, 0.3));
          lineX.position.set(0, floorY + 0.1, offset);
          buildingGroup.add(lineX);
          const lineZ = new THREE.LineSegments(new THREE.EdgesGeometry(gridLineGeomZ), createWireframeMaterial(lightGrayColor, 0.3));
          lineZ.position.set(offset, floorY + 0.1, 0);
          buildingGroup.add(lineZ);
        }
      }
    }

    for (let i = 1; i < numFloors; i++) {
      const beamY = i * floorHeight;
      const beamGeomX = new THREE.BoxGeometry(buildingWidth - 0.08, 0.04, 0.04);
      const beamGeomZ = new THREE.BoxGeometry(0.04, 0.04, buildingDepth - 0.08);
      [-buildingDepth / 2 + 0.04, buildingDepth / 2 - 0.04].forEach((z) => {
        const beam = new THREE.LineSegments(new THREE.EdgesGeometry(beamGeomX), createWireframeMaterial(lightGrayColor, 0.5));
        beam.position.set(0, beamY, z);
        buildingGroup.add(beam);
      });
      [-buildingWidth / 2 + 0.04, buildingWidth / 2 - 0.04].forEach((x) => {
        const beam = new THREE.LineSegments(new THREE.EdgesGeometry(beamGeomZ), createWireframeMaterial(lightGrayColor, 0.5));
        beam.position.set(x, beamY, 0);
        buildingGroup.add(beam);
      });
    }

    const coreWidth = 0.6;
    const coreDepth = 0.6;
    const coreGeom = new THREE.BoxGeometry(coreWidth, numFloors * floorHeight, coreDepth);
    const coreEdges = new THREE.EdgesGeometry(coreGeom);
    const coreLine = new THREE.LineSegments(coreEdges, createWireframeMaterial(glowOrangeColor, 0.7));
    coreLine.position.y = (numFloors * floorHeight) / 2;
    buildingGroup.add(coreLine);

    for (let i = 2; i < numFloors; i += 2) {
      const internalBeamGeom = new THREE.BoxGeometry(coreWidth - 0.1, 0.02, 0.02);
      const internalBeam = new THREE.LineSegments(new THREE.EdgesGeometry(internalBeamGeom), createWireframeMaterial(glowOrangeColor, 0.5));
      internalBeam.position.set(0, i * floorHeight, 0);
      buildingGroup.add(internalBeam);
    }

    return buildingGroup;
  }, [createWireframeMaterial]);

  const createCrane = useCallback(() => {
    const craneGroup = new THREE.Group();
    const whiteColor = 0xffffff;
    const orangeColor = 0xff6b00;
    const topY = 12 * 0.3 + 0.2;
    const mastHeight = 2.5;

    const mastGeom = new THREE.BoxGeometry(0.15, mastHeight, 0.15);
    const mastLine = new THREE.LineSegments(new THREE.EdgesGeometry(mastGeom), createWireframeMaterial(whiteColor));
    mastLine.position.set(0, topY + mastHeight / 2, 0);
    craneGroup.add(mastLine);

    for (let i = 0; i <= 4; i++) {
      const barGeom = new THREE.BoxGeometry(0.03, mastHeight, 0.03);
      const barLine = new THREE.LineSegments(new THREE.EdgesGeometry(barGeom), createWireframeMaterial(whiteColor, 0.6));
      barLine.position.set((i - 2) * 0.1, topY + mastHeight / 2, (i % 2 === 0 ? 1 : -1) * 0.05);
      craneGroup.add(barLine);
    }

    const jibLength = 3;
    const jibGeom = new THREE.BoxGeometry(jibLength, 0.1, 0.1);
    const jibLine = new THREE.LineSegments(new THREE.EdgesGeometry(jibGeom), createWireframeMaterial(orangeColor, 0.9));
    jibLine.position.set(jibLength / 2, topY + mastHeight - 0.1, 0);
    craneGroup.add(jibLine);

    for (let i = 0; i < 3; i++) {
      const supportGeom = new THREE.BoxGeometry(0.02, 0.4, 0.02);
      const supportLine = new THREE.LineSegments(new THREE.EdgesGeometry(supportGeom), createWireframeMaterial(whiteColor, 0.5));
      supportLine.position.set(0.3 + i * 0.8, topY + mastHeight - 0.3, 0);
      craneGroup.add(supportLine);
    }

    const counterGeom = new THREE.BoxGeometry(0.8, 0.15, 0.3);
    const counterLine = new THREE.LineSegments(new THREE.EdgesGeometry(counterGeom), createWireframeMaterial(whiteColor, 0.7));
    counterLine.position.set(-jibLength / 2 + 0.4, topY + mastHeight - 0.1, 0);
    craneGroup.add(counterLine);

    const cabinGeom = new THREE.BoxGeometry(0.25, 0.2, 0.2);
    const cabinLine = new THREE.LineSegments(new THREE.EdgesGeometry(cabinGeom), createWireframeMaterial(orangeColor, 0.8));
    cabinLine.position.set(0.2, topY + mastHeight + 0.1, 0);
    craneGroup.add(cabinLine);

    const cableGeom = new THREE.BoxGeometry(0.02, 1.2, 0.02);
    const cableLine = new THREE.LineSegments(new THREE.EdgesGeometry(cableGeom), createWireframeMaterial(whiteColor, 0.4));
    cableLine.position.set(jibLength - 0.2, topY + mastHeight - 0.7, 0);
    craneGroup.add(cableLine);

    const hookGeom = new THREE.BoxGeometry(0.08, 0.12, 0.08);
    const hookLine = new THREE.LineSegments(new THREE.EdgesGeometry(hookGeom), createWireframeMaterial(orangeColor, 0.9));
    hookLine.position.set(jibLength - 0.2, topY + mastHeight - 1.3, 0);
    craneGroup.add(hookLine);

    const stayGeom = new THREE.BoxGeometry(0.03, 1.5, 0.03);
    const stayLine = new THREE.LineSegments(new THREE.EdgesGeometry(stayGeom), createWireframeMaterial(whiteColor, 0.5));
    stayLine.position.set(-jibLength / 2 + 0.6, topY + mastHeight - 0.8, 0.15);
    stayLine.rotation.z = Math.PI / 6;
    craneGroup.add(stayLine);

    return craneGroup;
  }, [createWireframeMaterial]);

  const createScaffolding = useCallback(() => {
    const scaffoldGroup = new THREE.Group();
    const whiteColor = 0xffffff;
    const lightGrayColor = 0xaaaaaa;
    const buildingWidth = 2;
    const buildingDepth = 2;
    const floorHeight = 0.3;
    const numFloors = 12;

    const scaffoldSides = [
      { x: buildingWidth / 2 + 0.4, z: 0, rotY: Math.PI / 2 },
      { x: 0, z: buildingDepth / 2 + 0.4, rotY: 0 },
    ];

    scaffoldSides.forEach(({ x, z, rotY }) => {
      for (let floor = 0; floor <= numFloors; floor += 2) {
        const poleGeom = new THREE.BoxGeometry(0.03, floorHeight * 2, 0.03);
        const poleEdges = new THREE.EdgesGeometry(poleGeom);
        const poleLine = new THREE.LineSegments(poleEdges, createWireframeMaterial(whiteColor, 0.4));
        [-buildingWidth / 2 - 0.2, buildingWidth / 2 + 0.2].forEach((offset) => {
          const pole = poleLine.clone();
          if (rotY === Math.PI / 2) {
            pole.position.set(x, floor * floorHeight + floorHeight, offset);
          } else {
            pole.position.set(offset, floor * floorHeight + floorHeight, z);
          }
          pole.rotation.y = rotY;
          scaffoldGroup.add(pole);
        });
      }

      for (let floor = 0; floor <= numFloors; floor += 2) {
        const barGeom = new THREE.BoxGeometry(buildingWidth + 0.4, 0.02, 0.02);
        const barEdges = new THREE.EdgesGeometry(barGeom);
        const barLine = new THREE.LineSegments(barEdges, createWireframeMaterial(lightGrayColor, 0.3));
        const bar = barLine.clone();
        if (rotY === Math.PI / 2) {
          bar.position.set(x, floor * floorHeight + floorHeight, z);
          bar.rotation.y = Math.PI / 2;
        } else {
          bar.position.set(x, floor * floorHeight + floorHeight, z);
        }
        scaffoldGroup.add(bar);
      }

      for (let floor = 0; floor < numFloors - 1; floor += 2) {
        const diagGeom = new THREE.BoxGeometry(0.015, floorHeight * 2.2, 0.015);
        const diagEdges = new THREE.EdgesGeometry(diagGeom);
        const diag1 = new THREE.LineSegments(diagEdges, createWireframeMaterial(lightGrayColor, 0.25));
        const diag2 = new THREE.LineSegments(diagEdges, createWireframeMaterial(lightGrayColor, 0.25));
        if (rotY === Math.PI / 2) {
          diag1.position.set(x, floor * floorHeight + floorHeight * 1.5, -buildingWidth / 2);
          diag1.rotation.z = Math.PI / 4;
          diag2.position.set(x, floor * floorHeight + floorHeight * 1.5, buildingWidth / 2);
          diag2.rotation.z = -Math.PI / 4;
        } else {
          diag1.position.set(-buildingWidth / 2, floor * floorHeight + floorHeight * 1.5, z);
          diag1.rotation.x = Math.PI / 4;
          diag2.position.set(buildingWidth / 2, floor * floorHeight + floorHeight * 1.5, z);
          diag2.rotation.x = -Math.PI / 4;
        }
        scaffoldGroup.add(diag1);
        scaffoldGroup.add(diag2);
      }
    });

    return scaffoldGroup;
  }, [createWireframeMaterial]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    mouseRef.current = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    };
  }, []);

  const handleResize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(6, 5, 8);
    camera.lookAt(0, 3, 0);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.6);
    pointLight.position.set(5, 8, 5);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xff6b00, 0.3);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);

    scene.add(createBuilding());
    scene.add(createCrane());
    scene.add(createScaffolding());

    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      scene.rotation.y += 0.003;
      targetRotationRef.current.x = mouseRef.current.y * 0.1;
      targetRotationRef.current.y = mouseRef.current.x * 0.15;
      camera.position.x += (6 + targetRotationRef.current.y * 2 - camera.position.x) * 0.05;
      camera.position.y += (5 + targetRotationRef.current.x * 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 3, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });
    };
  }, [createBuilding, createCrane, createScaffolding, handleMouseMove, handleResize]);

  return (
    <div
      ref={containerRef}
      className={`${styles.scene} ${className}`}
      style={{ cursor: 'grab' }}
    />
  );
}
