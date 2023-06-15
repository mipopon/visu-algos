import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { BoardGenerator } from "../../../src/board/board-generator";
import * as THREE from "three";
import { AppProps } from "./types";
import {
  DESTINATION_SYMBOL,
  EMPTY_SYMBOL,
  VISITED_SYMBOL,
  WALL_SYMBOL,
} from "../../../src/constants";

const App: Component<{ root: HTMLElement }> = ({ root }: AppProps) => {
  const boardGenerator = new BoardGenerator();
  const board = boardGenerator.setDestination(boardGenerator.generate());

  console.log({ y: board.length, x: board[0].length }, board);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  root.appendChild(renderer.domElement);

  // Define the dimensions and distance
  const n = 4;

  const distance = 1.5;

  const geometry = new THREE.BoxGeometry(1, 1, 0);
  const mapSymbolToColor: Record<string, number> = {
    [EMPTY_SYMBOL]: 0x77dd77,
    [WALL_SYMBOL]: 0xff6961,
    [VISITED_SYMBOL]: 0x0e86d4,
    [DESTINATION_SYMBOL]: 0xffffff,
  };

  // Iterate over the dimensions to create and position the cubes
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const symbol = board[i][j];

      const material = new THREE.MeshBasicMaterial({
        color: mapSymbolToColor[symbol],
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (j - board[0].length / 2) * distance,
        (i - board.length / 2) * distance,
        0
      );
      scene.add(cube);
    }
  }

  // const baseCube = new THREE.Mesh(geometry, material);
  // scene.add(baseCube);
  camera.position.z = 20;

  renderer.render(scene, camera);

  // function animate() {
  //   requestAnimationFrame(animate);

  //   baseCube.rotation.x += 0.01;
  //   baseCube.rotation.y += 0.01;

  //   renderer.render(scene, camera);
  // }

  // animate();

  return <></>;
};

export default App;
