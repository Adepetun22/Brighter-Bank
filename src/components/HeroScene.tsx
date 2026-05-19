import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || window.innerHeight;

    // --- Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.set(0, 3, 12);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // --- Post Processing ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.0, 0.4, 0.2);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // --- Mouse Parallax ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouse.targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = (touch.clientY / window.innerHeight - 0.5) * 2;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // --- Background Gradient Sky ---
    const skyGeo = new THREE.SphereGeometry(80, 32, 32);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        uTopColor: { value: new THREE.Color(0xf5a623) },
        uBottomColor: { value: new THREE.Color(0x0a1628) },
        uMidColor: { value: new THREE.Color(0x1a3a5c) },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;
        uniform vec3 uMidColor;
        varying vec3 vWorldPos;
        void main() {
          float h = normalize(vWorldPos).y;
          float t = h * 0.5 + 0.5;
          vec3 col = mix(uBottomColor, uMidColor, smoothstep(0.0, 0.45, t));
          col = mix(col, uTopColor, smoothstep(0.45, 1.0, t));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    scene.add(new THREE.Mesh(skyGeo, skyMat));

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0x8899bb, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffd280, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    const pointLight1 = new THREE.PointLight(0xf5a623, 2, 30);
    pointLight1.position.set(0, 4, 0);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x4488ff, 0.8, 25);
    pointLight2.position.set(-3, 1, 3);
    scene.add(pointLight2);

    // --- Ground Particle Grid ---
    const gridCount = 2000;
    const gridGeo = new THREE.BufferGeometry();
    const gridPositions = new Float32Array(gridCount * 3);
    const gridColors = new Float32Array(gridCount * 3);
    const gridPhases = new Float32Array(gridCount);
    for (let i = 0; i < gridCount; i++) {
      gridPositions[i * 3] = (Math.random() - 0.5) * 30;
      gridPositions[i * 3 + 1] = -0.5 + Math.random() * 0.3;
      gridPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;
      const c = new THREE.Color().lerpColors(new THREE.Color(0x4488ff), new THREE.Color(0xf5a623), Math.random());
      gridColors[i * 3] = c.r; gridColors[i * 3 + 1] = c.g; gridColors[i * 3 + 2] = c.b;
      gridPhases[i] = Math.random() * Math.PI * 2;
    }
    gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
    gridGeo.setAttribute('color', new THREE.BufferAttribute(gridColors, 3));
    gridGeo.setAttribute('phase', new THREE.BufferAttribute(gridPhases, 1));
    const gridMat = new THREE.ShaderMaterial({
      transparent: true, vertexColors: true,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float phase;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vColor = color;
          float pulse = sin(uTime * 1.5 + phase) * 0.5 + 0.5;
          vAlpha = 0.3 + pulse * 0.7;
          vec3 pos = position;
          pos.y += sin(uTime * 0.8 + phase) * 0.15;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (2.5 + pulse * 2.0) * (300.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });
    scene.add(new THREE.Points(gridGeo, gridMat));

    // --- Glass Building ---
    const buildingGroup = new THREE.Group();
    buildingGroup.position.set(0, 0, 0);
    scene.add(buildingGroup);

    const colGeo = new THREE.CylinderGeometry(1.0, 1.2, 7, 8, 1, true);
    const colMat = new THREE.MeshPhysicalMaterial({
      color: 0x88bbff, transparent: true, opacity: 0.18,
      roughness: 0.05, metalness: 0.1, side: THREE.DoubleSide,
      clearcoat: 1.0, clearcoatRoughness: 0.05,
    });
    const column = new THREE.Mesh(colGeo, colMat);
    column.position.y = 3.5;
    buildingGroup.add(column);

    const edgeGeo = new THREE.EdgesGeometry(new THREE.CylinderGeometry(1.02, 1.22, 7, 8));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x99ccff, transparent: true, opacity: 0.35 });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    edges.position.y = 3.5;
    buildingGroup.add(edges);

    for (let i = 0; i < 5; i++) {
      const ringGeo = new THREE.TorusGeometry(1.05 + (1.22 - 1.0) * (1 - i / 5) * 0.5, 0.008, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xaaddff, transparent: true, opacity: 0.3 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1 + i * 1.4;
      buildingGroup.add(ring);
    }

    const capGeo = new THREE.ConeGeometry(0.95, 1.2, 8);
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0xaaddff, transparent: true, opacity: 0.2,
      roughness: 0.05, metalness: 0.2, clearcoat: 1.0,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 7.6;
    buildingGroup.add(cap);

    // --- Sun Core ---
    const sunMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv; vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0,0,1))), 2.0);
          float pulse = 0.85 + 0.15 * sin(uTime * 2.0);
          vec3 core = mix(vec3(1.0, 0.85, 0.3), vec3(1.0, 0.65, 0.1), fresnel);
          float glow = pulse * (1.0 - fresnel * 0.3);
          gl_FragColor = vec4(core * glow * 1.8, 1.0);
        }
      `,
    });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), sunMat);
    buildingGroup.add(sun);

    // Sun glow sprite
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 256; glowCanvas.height = 256;
    const glowCtx = glowCanvas.getContext('2d') as CanvasRenderingContext2D;
    const grad = glowCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255,200,80,1)');
    grad.addColorStop(0.2, 'rgba(255,170,50,0.6)');
    grad.addColorStop(0.5, 'rgba(255,140,30,0.15)');
    grad.addColorStop(1, 'rgba(255,100,0,0)');
    glowCtx.fillStyle = grad;
    glowCtx.fillRect(0, 0, 256, 256);
    const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(glowCanvas),
      transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending,
    }));
    sunGlow.scale.set(4, 4, 1);
    buildingGroup.add(sunGlow);

    // --- Sun Rays ---
    const rayCount = 6;
    const rays: { mesh: THREE.Mesh; baseAngle: number }[] = [];
    for (let i = 0; i < rayCount; i++) {
      const pts: THREE.Vector3[] = [];
      const angle = (i / rayCount) * Math.PI * 0.6 - Math.PI * 0.3;
      for (let j = 0; j <= 30; j++) {
        const t = j / 30;
        pts.push(new THREE.Vector3(Math.sin(angle) * t * 4, t * 5, 0));
      }
      const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.015, 6, false);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().lerpColors(new THREE.Color(0xf5a623), new THREE.Color(0xffdd44), i / rayCount),
        transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
      });
      const ray = new THREE.Mesh(geo, mat);
      rays.push({ mesh: ray, baseAngle: angle });
      buildingGroup.add(ray);
    }

    // --- Chart Lines ---
    const chartLines: { line: THREE.Line; segs: number }[] = [];
    for (let c = 0; c < 4; c++) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        pts.push(new THREE.Vector3((t - 0.5) * 6, 1 + t * 4 + Math.sin(t * Math.PI * 2 + c) * 0.5, (c - 1.5) * 0.4));
      }
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color().lerpColors(new THREE.Color(0xf5a623), new THREE.Color(0x44aaff), c / 4),
        transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
      chartLines.push({ line, segs: 50 });
      buildingGroup.add(line);
    }

    // --- Orbiting Objects ---
    const orbitGroup = new THREE.Group();
    orbitGroup.position.set(0, 3.5, 0);
    scene.add(orbitGroup);

    function createCoin() {
      return new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.06, 24),
        new THREE.MeshStandardMaterial({ color: 0xf5c842, metalness: 0.9, roughness: 0.15, emissive: 0xf5a623, emissiveIntensity: 0.2 })
      );
    }
    function createShield() {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0.3);
      shape.quadraticCurveTo(0.25, 0.25, 0.25, 0.05);
      shape.quadraticCurveTo(0.25, -0.15, 0, -0.3);
      shape.quadraticCurveTo(-0.25, -0.15, -0.25, 0.05);
      shape.quadraticCurveTo(-0.25, 0.25, 0, 0.3);
      return new THREE.Mesh(
        new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01 }),
        new THREE.MeshStandardMaterial({ color: 0x66aaff, metalness: 0.7, roughness: 0.2, emissive: 0x2266aa, emissiveIntensity: 0.15 })
      );
    }
    function createBar() {
      const group = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const h = 0.15 + i * 0.12;
        const bar = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, h, 0.08),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().lerpColors(new THREE.Color(0xf5a623), new THREE.Color(0x44dd88), i / 3),
            metalness: 0.6, roughness: 0.3, emissive: 0xf5a623, emissiveIntensity: 0.1,
          })
        );
        bar.position.set((i - 1) * 0.12, h / 2, 0);
        group.add(bar);
      }
      return group;
    }

    const orbitObjects: { obj: THREE.Object3D; angle: number; radius: number; yOff: number; speed: number; bobSpeed: number }[] = [];
    const creators: (() => THREE.Object3D)[] = [createCoin, createShield, createBar, createCoin, createShield, createBar, createCoin, createBar];
    for (let i = 0; i < creators.length; i++) {
      const obj = creators[i]!();
      const angle = (i / creators.length) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.8;
      const yOff = (Math.random() - 0.5) * 3;
      orbitObjects.push({ obj, angle, radius, yOff, speed: 0.15 + Math.random() * 0.15, bobSpeed: 0.8 + Math.random() * 0.5 });
      orbitGroup.add(obj);
    }

    // --- Dawn Rings ---
    const dawnRings: { mesh: THREE.Mesh; phase: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.02, 16, 64),
        new THREE.MeshBasicMaterial({ color: 0xffcc66, transparent: true, opacity: 0, blending: THREE.AdditiveBlending })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 3.5;
      scene.add(ring);
      dawnRings.push({ mesh: ring, phase: i / 3 });
    }

    // --- Shield Grid ---
    const shieldGridMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec2 grid = fract(vUv * vec2(30.0, 18.0));
          float line = smoothstep(0.02, 0.0, abs(grid.x - 0.5) - 0.48) +
                       smoothstep(0.02, 0.0, abs(grid.y - 0.5) - 0.48);
          line = min(line, 1.0);
          float pulse = 0.5 + 0.5 * sin(uTime * 1.2 + vUv.x * 10.0 + vUv.y * 8.0);
          float fade = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
          fade *= smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
          gl_FragColor = vec4(0.4, 0.7, 1.0, line * pulse * fade * 0.06);
        }
      `,
      side: THREE.DoubleSide, depthWrite: false,
    });
    const shieldGrid = new THREE.Mesh(new THREE.PlaneGeometry(28, 16, 40, 25), shieldGridMat);
    shieldGrid.position.set(0, 4, 5);
    scene.add(shieldGrid);

    // --- Rising Particles ---
    const riseCount = 200;
    const riseGeo = new THREE.BufferGeometry();
    const risePos = new Float32Array(riseCount * 3);
    const riseSpeeds = new Float32Array(riseCount);
    for (let i = 0; i < riseCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.8;
      risePos[i * 3] = Math.cos(a) * r;
      risePos[i * 3 + 1] = Math.random() * 7;
      risePos[i * 3 + 2] = Math.sin(a) * r;
      riseSpeeds[i] = 0.3 + Math.random() * 0.7;
    }
    riseGeo.setAttribute('position', new THREE.BufferAttribute(risePos, 3));
    const riseParticles = new THREE.Points(riseGeo, new THREE.PointsMaterial({
      color: 0xffcc44, size: 0.06, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    buildingGroup.add(riseParticles);

    // --- Animation ---
    const startTime = performance.now();
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      camera.position.x = mouse.x * 1.2;
      camera.position.y = 3 + mouse.y * -0.8;
      camera.lookAt(0, 2.5, 0);

      const sunPulse = 0.85 + 0.15 * Math.sin(t * 2);
      (sunMat.uniforms['uTime'] as THREE.IUniform).value = t;
      sun.position.y = 2.5 + Math.sin(t * 0.3) * 0.8;
      sunGlow.position.copy(sun.position);
      sunGlow.scale.setScalar(3.5 + sunPulse * 1.5);
      (sunGlow.material as THREE.SpriteMaterial).opacity = 0.5 + sunPulse * 0.4;
      pointLight1.position.copy(sun.position);
      pointLight1.intensity = 1.5 + sunPulse;

      (gridMat.uniforms['uTime'] as THREE.IUniform).value = t;

      const rp = riseParticles.geometry.attributes['position'] as THREE.BufferAttribute;
      const rpArr = rp.array as Float32Array;
      for (let i = 0; i < riseCount; i++) {
        rpArr[i * 3 + 1] = (rpArr[i * 3 + 1] ?? 0) + (riseSpeeds[i] ?? 0) * 0.012;
        if ((rpArr[i * 3 + 1] ?? 0) > 7) rpArr[i * 3 + 1] = 0;
      }
      rp.needsUpdate = true;

      const morphFactor = Math.sin(t * 0.5) * 0.5 + 0.5;
      for (let r = 0; r < rays.length; r++) {
        (rays[r]!.mesh.material as THREE.MeshBasicMaterial).opacity = 0.3 + morphFactor * 0.4;
        const sc = 0.8 + Math.sin(t * 0.8 + r) * 0.2;
        rays[r]!.mesh.scale.set(sc, sc, sc);
        rays[r]!.mesh.position.y = sun.position.y - 2.5;
      }

      const chartPhase = Math.sin(t * 0.4) * 0.5 + 0.5;
      for (const cl of chartLines) {
        (cl.line.material as THREE.LineBasicMaterial).opacity = chartPhase * 0.4;
        const posAttr = cl.line.geometry.attributes['position'] as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;
        for (let i = 0; i <= cl.segs; i++) {
          const tt = i / cl.segs;
          positions[i * 3 + 1] = 1 + tt * 4 + Math.sin(tt * Math.PI * 2 + t * 0.5) * 0.6;
        }
        posAttr.needsUpdate = true;
      }

      for (const o of orbitObjects) {
        const a = o.angle + t * o.speed;
        o.obj.position.set(Math.cos(a) * o.radius, o.yOff + Math.sin(t * o.bobSpeed) * 0.3, Math.sin(a) * o.radius);
        o.obj.rotation.y = t * 0.5;
        (o.obj as THREE.Mesh).rotation.x = Math.sin(t * 0.3) * 0.2;
      }

      const cycleTime = (t % 8) / 8;
      for (const dr of dawnRings) {
        const p = (cycleTime + dr.phase) % 1;
        const scale = 0.5 + p * 8;
        dr.mesh.scale.set(scale, scale, scale);
        (dr.mesh.material as THREE.MeshBasicMaterial).opacity = Math.sin(p * Math.PI) * 0.35;
        dr.mesh.position.y = sun.position.y;
      }

      (shieldGridMat.uniforms['uTime'] as THREE.IUniform).value = t;
      buildingGroup.rotation.y = Math.sin(t * 0.15) * 0.08 + mouse.x * 0.05;

      composer.render();
    }

    animate();

    // --- Resize ---
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      composer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] tablet:h-[750px] desktop:h-[900px] overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10">
        <h1
          className="text-primary text-h1 mb-3"
          style={{ animation: 'fadeInUp 1.2s ease 0.5s both' }}
        >
          Building your brighter
          future, today
        </h1>
        <p
          className="text-secondary text-p1 max-w-[480px] mb-8"
          style={{ animation: 'fadeInUp 1.2s ease 0.8s both' }}
        >
          Experience banking that grows with you. Secure, smart, and designed
          for your modern lifestyle.
        </p>
        <button
          type="button"
          className="btn btn-primary pointer-events-auto px-9 py-4 text-b1"
          style={{ animation: 'fadeInUp 1.2s ease 1.1s both' }}
        >
          Open a Free Account
        </button>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
