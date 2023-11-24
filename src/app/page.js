'use client'

import { useEffect, useRef } from 'react'
import styles from './page.module.css'
import * as THREE from 'three'

const Home = () => {
  const rendererElement = useRef(null)

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene()

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Create a renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Append the renderer to the DOM
    rendererElement.current.appendChild(renderer.domElement)

    // Create a cube
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0xfff111 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Animation logic
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the cube
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      // Render the scene
      renderer.render(scene, camera)
    }

    // Start the animation loop
    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Attach resize event listener
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array to run the effect only once on mount

  return (
    <main className={styles.main}>
      <h1>hello</h1>
      <div ref={rendererElement}></div>
    </main>
  )
}

export default Home
