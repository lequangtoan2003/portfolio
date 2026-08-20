"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function viewportToWorld(rect: DOMRect, camera: THREE.PerspectiveCamera, clientX: number, clientY: number, planeZ: number) {
  const x = clamp((clientX - rect.left) / rect.width, 0.04, 0.96);
  const y = clamp((clientY - rect.top) / rect.height, 0.08, 0.86);
  const ndc = new THREE.Vector3(x * 2 - 1, -(y * 2 - 1), 0.5);
  const worldPoint = ndc.unproject(camera);
  const direction = worldPoint.sub(camera.position).normalize();
  const distance = (planeZ - camera.position.z) / direction.z;

  return camera.position.clone().add(direction.multiplyScalar(distance));
}

function makeCube(width: number, height: number, depth: number, color: string) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0,
    roughness: 0.92,
    envMapIntensity: 0.28,
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

function makeCylinder(radius: number, height: number, color: string) {
  const geometry = new THREE.CylinderGeometry(radius, radius, height, 48, 1, false);
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0,
    roughness: 0.86,
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

function makeSphere(radius: number, color: string, roughness = 0.32) {
  const geometry = new THREE.SphereGeometry(radius, 48, 32);
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0,
    roughness,
    envMapIntensity: 0.18,
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

export function HeroLightScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sunElementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const sunElement = sunElementRef.current;

    if (!wrapper || !canvas) {
      return;
    }

    const syncFallbackSun = () => {
      if (!sunElement) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const x = rect.width < 720 ? "82%" : "62%";
      const y = rect.width < 720 ? "24%" : "30%";

      wrapper.style.setProperty("--sun-x", x);
      wrapper.style.setProperty("--sun-y", y);
      sunElement.style.setProperty("--sun-screen-x", x);
      sunElement.style.setProperty("--sun-screen-y", y);
      sunElement.dataset.ready = "true";
    };

    let fallbackDragging = false;
    let fallbackDragOffsetX = 0;
    let fallbackDragOffsetY = 0;

    const moveFallbackSun = (clientX: number, clientY: number) => {
      if (!sunElement) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const x = clamp(((clientX - rect.left) / rect.width) * 100, 4, 96);
      const y = clamp(((clientY - rect.top) / rect.height) * 100, 8, 86);

      sunElement.style.setProperty("--sun-screen-x", `${x.toFixed(2)}%`);
      sunElement.style.setProperty("--sun-screen-y", `${y.toFixed(2)}%`);
    };

    const handleFallbackPointerDown = (event: PointerEvent) => {
      if (!sunElement) {
        return;
      }

      const rect = sunElement.getBoundingClientRect();
      fallbackDragOffsetX = rect.left + rect.width / 2 - event.clientX;
      fallbackDragOffsetY = rect.top + rect.height / 2 - event.clientY;
      fallbackDragging = true;
      event.preventDefault();
      sunElement.setPointerCapture(event.pointerId);
      sunElement.classList.add("is-dragging");
    };

    const handleFallbackPointerMove = (event: PointerEvent) => {
      if (fallbackDragging) {
        moveFallbackSun(event.clientX + fallbackDragOffsetX, event.clientY + fallbackDragOffsetY);
      }
    };

    const handleFallbackPointerUp = () => {
      fallbackDragging = false;
      sunElement?.classList.remove("is-dragging");
    };

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf4f1ea, 0.052);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0.25, 0.2, 9.2);
    camera.lookAt(0.5, 0, 0);

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      syncFallbackSun();
      sunElement?.addEventListener("pointerdown", handleFallbackPointerDown);
      window.addEventListener("pointermove", handleFallbackPointerMove);
      window.addEventListener("pointerup", handleFallbackPointerUp);
      window.addEventListener("pointercancel", handleFallbackPointerUp);

      return () => {
        sunElement?.removeEventListener("pointerdown", handleFallbackPointerDown);
        window.removeEventListener("pointermove", handleFallbackPointerMove);
        window.removeEventListener("pointerup", handleFallbackPointerUp);
        window.removeEventListener("pointercancel", handleFallbackPointerUp);
      };
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;

    const ambientLight = new THREE.HemisphereLight(0xfff4df, 0xd0d8cf, 2.8);
    scene.add(ambientLight);

    const coolFill = new THREE.DirectionalLight(0xb7c8bd, 0.72);
    coolFill.position.set(-4.8, 3.4, 4.2);
    scene.add(coolFill);

    const sunLight = new THREE.PointLight(0xffb15f, 76, 11, 1.75);
    sunLight.position.set(2, 1.05, 2.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const sunGlow = new THREE.PointLight(0xffd49a, 18, 6, 2.4);
    sunLight.add(sunGlow);

    const group = new THREE.Group();
    group.position.set(1.3, -0.04, 0);
    scene.add(group);

    const mainCube = makeCube(2.2, 1.82, 1.75, "#8a8174");
    mainCube.position.set(0.4, -0.06, 0);
    mainCube.rotation.set(-0.34, 0.55, -0.12);
    group.add(mainCube);

    const rearCube = makeCube(1.42, 1.38, 1.3, "#cbbf9f");
    rearCube.position.set(-0.82, 1.14, -0.64);
    rearCube.rotation.set(-0.28, 0.44, 0.12);
    group.add(rearCube);

    const lowerCube = makeCube(1.42, 1.04, 1.52, "#756f66");
    lowerCube.position.set(1.68, -1.7, -0.64);
    lowerCube.rotation.set(-0.22, -0.46, 0.32);
    group.add(lowerCube);

    const cylinder = makeCylinder(0.46, 1.32, "#bd8565");
    cylinder.position.set(-0.86, -1.86, 0.12);
    cylinder.rotation.set(0.78, 0.18, -0.52);
    group.add(cylinder);

    const darkSphere = makeSphere(0.48, "#7f8478", 0.9);
    darkSphere.position.set(1.86, 0.42, 0.28);
    group.add(darkSphere);

    const smallSphere = makeSphere(0.3, "#a3ad9d", 0.82);
    smallSphere.position.set(-1.16, -0.62, 0.48);
    group.add(smallSphere);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8.2, 4.6),
      new THREE.ShadowMaterial({
        color: 0x09111d,
        opacity: 0.075,
      }),
    );
    shadowPlane.position.set(0.8, -2.56, -0.35);
    shadowPlane.rotation.x = -Math.PI / 2.6;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    let isDragging = false;
    let animationFrame = 0;
    let hasPlacedSun = false;
    let hasShownScene = false;
    let revealStartTime = 0;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    const revealDuration = 840;

    const syncSunElement = () => {
      const sunElement = sunElementRef.current;

      if (!sunElement) {
        return;
      }

      const projected = sunLight.position.clone().project(camera);
      const x = ((projected.x + 1) / 2) * 100;
      const y = ((1 - projected.y) / 2) * 100;
      const sunX = `${x.toFixed(2)}%`;
      const sunY = `${y.toFixed(2)}%`;

      wrapper.style.setProperty("--sun-x", sunX);
      wrapper.style.setProperty("--sun-y", sunY);
      sunElement.style.setProperty("--sun-screen-x", sunX);
      sunElement.style.setProperty("--sun-screen-y", sunY);
      sunElement.dataset.ready = "true";
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();

      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height, false);

      const compact = rect.width < 720;
      group.scale.setScalar(compact ? 0.62 : 0.88);
      group.position.set(compact ? 2.72 : 2.46, compact ? -0.32 : -0.04, compact ? -0.8 : 0);

      if (!hasPlacedSun) {
        sunLight.position.set(compact ? 2.72 : 0.88, compact ? 1.15 : 1.34, 2.5);
        hasPlacedSun = true;
      }

      syncSunElement();
    };

    const render = () => {
      syncSunElement();

      if (!revealStartTime) {
        revealStartTime = performance.now();
      }

      const revealProgress = clamp((performance.now() - revealStartTime) / revealDuration, 0, 1);
      const easedReveal = 1 - Math.pow(1 - revealProgress, 3);

      renderer.toneMappingExposure = 0.12 + 0.8 * easedReveal;
      renderer.render(scene, camera);

      if (!hasShownScene) {
        wrapper.dataset.sceneReady = "true";
        hasShownScene = true;
      }

      animationFrame = requestAnimationFrame(render);
    };

    const moveSun = (clientX: number, clientY: number) => {
      const rect = wrapper.getBoundingClientRect();
      const nextPosition = viewportToWorld(rect, camera, clientX, clientY, sunLight.position.z);

      sunLight.position.copy(nextPosition);
      syncSunElement();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLSpanElement | null;

      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      dragOffsetX = rect.left + rect.width / 2 - event.clientX;
      dragOffsetY = rect.top + rect.height / 2 - event.clientY;
      isDragging = true;
      event.preventDefault();
      target.setPointerCapture(event.pointerId);
      target.classList.add("is-dragging");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (isDragging) {
        moveSun(event.clientX + dragOffsetX, event.clientY + dragOffsetY);
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLSpanElement | null;

      if (!isDragging) {
        return;
      }

      isDragging = false;
      target?.classList.remove("is-dragging");
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    sunElement?.addEventListener("pointerdown", handlePointerDown);
    sunElement?.addEventListener("pointermove", handlePointerMove);
    sunElement?.addEventListener("pointerup", handlePointerUp);
    sunElement?.addEventListener("pointercancel", handlePointerUp);

    resize();
    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      sunElement?.removeEventListener("pointerdown", handlePointerDown);
      sunElement?.removeEventListener("pointermove", handlePointerMove);
      sunElement?.removeEventListener("pointerup", handlePointerUp);
      sunElement?.removeEventListener("pointercancel", handlePointerUp);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="hero-light-scene" ref={wrapperRef} data-scene-ready="false" aria-hidden="true">
      <canvas ref={canvasRef} />
      <span className="hero-scene-sun" ref={sunElementRef} data-ready="false" />
      <span className="hero-light-mask" />
    </div>
  );
}
