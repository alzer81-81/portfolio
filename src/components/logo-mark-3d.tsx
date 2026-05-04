"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const LOGO_URL = "/logo.svg";
const EXTRUDE_DEPTH = 0.18;

export function LogoMark3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldReduceMotion = reduceMotion.matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.1, 7.8);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.52);
    keyLight.position.set(3.8, 5.2, 7.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.18);
    fillLight.position.set(-4, -1.5, 5.5);
    scene.add(fillLight);

    const root = new THREE.Group();
    scene.add(root);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 5.2),
      new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.08 }),
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -1.88, 0);
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.7;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = -Math.PI / 3.2;
    controls.maxAzimuthAngle = Math.PI / 3.2;

    const material = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.9,
      metalness: 0.04,
    });

    const resize = () => {
      const size = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(size.width));
      const height = Math.max(1, Math.round(size.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    let disposed = false;
    let animationFrame = 0;
    let logoGroup: THREE.Group | null = null;

    const animate = () => {
      if (disposed) return;

      if (logoGroup && !shouldReduceMotion) {
        logoGroup.rotation.y += 0.0038;
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const buildLogo = async () => {
      const loader = new SVGLoader();
      const response = await fetch(LOGO_URL);
      const svgText = await response.text();
      const data = loader.parse(svgText);
      const group = new THREE.Group();

      data.paths.forEach((path: { userData?: { style?: { fill?: string } } }) => {
        const shapes = SVGLoader.createShapes(path as never);

        shapes.forEach((shape: THREE.Shape) => {
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: EXTRUDE_DEPTH,
            bevelEnabled: false,
            curveSegments: 18,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = false;
          group.add(mesh);
        });
      });

      group.scale.y = -1;

      const box = new THREE.Box3().setFromObject(group);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      group.position.sub(center);

      const fit = 3.55 / Math.max(size.x, size.y);
      group.scale.multiplyScalar(fit);
      group.rotation.x = -0.18;
      group.rotation.y = 0.34;
      group.position.y = 0.1;

      root.add(group);
      logoGroup = group;
      rootRef.current?.setAttribute("data-ready", "true");
      resize();
      animate();
    };

    resize();
    window.addEventListener("resize", resize);

    buildLogo().catch(() => {
      // Leave the canvas empty if the SVG fails to load.
    });

    return () => {
      disposed = true;
      rootRef.current?.removeAttribute("data-ready");
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
      controls.dispose();
      material.dispose();
      shadowPlane.geometry.dispose();
      (shadowPlane.material as THREE.Material).dispose();
      root.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={rootRef} className="homepage-hero__logo3d" aria-hidden="true">
      <canvas ref={canvasRef} className="homepage-hero__logo3d-canvas" />
    </div>
  );
}
