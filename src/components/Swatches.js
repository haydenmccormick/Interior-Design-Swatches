import React, { useState } from 'react';

export function IsometricSwatches({ swatchTiles }) {

  return (
    <div className="swatch-container">
    {Object.keys(swatchTiles).map((key) => (
        <div key={key} className="hex-row">
        <div className="hex-border">
            <div className="hexagon">
            {swatchTiles[key].type == "image" ? 
                <img className="swatch-tile-preview" src={swatchTiles[key].texture} alt={swatchTiles[key].name} />:
                <div className="swatch-tile-preview" style={{ backgroundColor: swatchTiles[key].texture }}></div>
              }
            </div>
        </div>
        <h4 className="label">{swatchTiles[key].name}</h4>
        </div>
    ))}
    </div>
  );
}

export function DefaultSwatches({ swatchTiles, shuffleFunc }) {

  return (
    <div className="default-container">
      <div className="default-swatch-container">
        {Object.keys(swatchTiles).map((key) => (
            <div key={key} className="swatch-tile">
              {swatchTiles[key].type == "image" ? 
                <img className="swatch-tile-preview" src={swatchTiles[key].texture} alt={swatchTiles[key].name} />:
                <div className="swatch-tile-preview" style={{ backgroundColor: swatchTiles[key].texture }}></div>
              }
              <h4 className="label">{swatchTiles[key].name}</h4>
            </div>
        ))}
      </div>
    </div>
  );
}