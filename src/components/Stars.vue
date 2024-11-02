<template>
    <div class="canvas-container">
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import * as THREE from 'three';
  
  export default {
    setup() {
      const canvas = ref(null);
  
      onMounted(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1;
  
        const renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
  
        // Creating Points with BufferGeometry and PointsMaterial
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(5000 * 3); // 5000 points, each with x, y, z
        for (let i = 0; i < positions.length; i++) {
          positions[i] = (Math.random() - 0.5) * 2.4; // Random positions in a sphere
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
        const material = new THREE.PointsMaterial({
          color: 0xadd8e6,
          size: 0.002,
          sizeAttenuation: true,
          transparent: true,
          depthWrite: false,
        });
  
        const points = new THREE.Points(geometry, material);
        points.rotation.set(0, 0, Math.PI / 4);
        scene.add(points);
  
        const animate = () => {
          requestAnimationFrame(animate);
  
          // Rotate points over time
          points.rotation.x -= 0.001;
          points.rotation.y -= 0.0015;
  
          renderer.render(scene, camera);
        };
  
        animate();
  
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      });
  
      return {
        canvas,
      };
    },
  };
  </script>
  
  <style scoped>
  .canvas-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1; /* Make sure it's behind other content */
    overflow: hidden;
  }
  
  canvas {
    display: block;
  }
  </style>
  