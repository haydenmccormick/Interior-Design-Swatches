// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import './SwatchTiles.css';
import IsometricKitchen from './components/IsometricKitchen';
import { IsometricSwatches, DefaultSwatches } from './components/Swatches'
import { Typography, Layout } from "antd";
import { Button } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  const [isometricMode, setisometricMode] = useState(false)
  const [kitchenVersion, setKitchenVersion] = useState(0);
  const [swatchTiles, setSwatchTiles] = useState({
    floor: { name: "Floor", type: "image", texture: null },
    counter: { name: "Counter", type: "image", texture: null },
    backsplash: { name: "Backsplash", type: "image", texture: null },
    lower_cabinet: { name: "Lower Cabinets", type: "color", texture: null },
    upper_cabinet: { name: "Upper Cabinets", type: "color", texture: null },
    wall: { name: "Wall", type: "color", texture: null },
  });
  const [candidates, setCandidates] = useState({ 
    counter: [
      "/interior-design-swatches/textures/counter/counter1.png", 
      "/interior-design-swatches/textures/counter/counter2.png", 
      "/interior-design-swatches/textures/counter/counter3.png"
    ],
    floor: [
      "/interior-design-swatches/textures/floor/floor1.png",
      "/interior-design-swatches/textures/floor/floor2.png",
      "/interior-design-swatches/textures/floor/floor3.png",
      "/interior-design-swatches/textures/floor/floor4.png",
    ],
    backsplash: [
      "/interior-design-swatches/textures/backsplash/backsplash1.jpg",
      "/interior-design-swatches/textures/backsplash/backsplash2.jpg",
      "/interior-design-swatches/textures/backsplash/backsplash3.png",
    ],
    lower_cabinet: [
      "#2E2E2E", // Charcoal
      "#6B4F4F", // Warm Mocha
      "#3F5D5B", // Deep Teal
      "#D1BFA7", // Sand Beige
      "#FFFFFF", // Classic White
    ],
    upper_cabinet: [
      "#F5F5F5", // Soft White
      "#E0DED7", // Light Taupe
      "#B8C1C6", // Misty Gray
      "#D3B88C", // Warm Sand
      "#FFFFFF", // Bright White
    ],
    wall: [
      "#FAF3E0", // Cream
      "#F0EDE5", // Off White
      "#D9D9D9", // Light Gray
      "#C2B280", // Warm Tan
      "#E6EBE0", // Sage Tint
    ]
  });
  
  useEffect(() => {
    shuffleSwatches();
  }, []);

  function shuffleSwatches() {
    let newSwatchTiles = { ...swatchTiles };
    Object.keys(newSwatchTiles).forEach((tile) => {
      const currentIndex = candidates[tile].findIndex(
        (texture) => texture === newSwatchTiles[tile].texture
      );
      let randomIndex = Math.floor(Math.random() * candidates[tile].length);
      // Ensure the new texture is different from the current one
      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * candidates[tile].length);
      }
      newSwatchTiles[tile].texture = candidates[tile][randomIndex];
    });
    setSwatchTiles(newSwatchTiles);
    setKitchenVersion(v => v + 1);
  }

  return (
    <div className="App">
      <Layout>
        <Header style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '10%' }} id="header">
          <h1>Shuffle Designer</h1>
          <Button onClick={() => setisometricMode(!isometricMode)}>Switch mode</Button>
        </Header>
        <Content>
          {isometricMode ? (
            <div className="swatch-tiles">
              <IsometricKitchen  swatchTiles={swatchTiles} key={kitchenVersion}/>
              <IsometricSwatches swatchTiles={swatchTiles} />
            </div>
          ) : (
            <div className="swatch-tiles">
              <DefaultSwatches swatchTiles={swatchTiles} shuffleFunc={shuffleSwatches} />
            </div>

          )}
          <Footer id="footer" style={{height: '10%'}}>
          <Button type="primary" onClick={shuffleSwatches} style={{ width: '100%' }}>
            Shuffle
          </Button>
        </Footer>

        </Content>
      </Layout>
    </div>
  );
}

export default App;
