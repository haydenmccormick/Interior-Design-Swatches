import React, { useState } from 'react';
import { UnlockOutlined, LockOutlined } from '@ant-design/icons';

export function IsometricSwatches({ swatchTiles, toggleLock }) {
  return (
    <div className="swatch-container">
      {Object.entries(swatchTiles).map(([key, tile]) => {
        const Preview = tile.type === "image" ? (
          <img
            className="hex-swatch-tile-preview"
            src={tile.texture}
            alt={tile.name}
            onClick={() => toggleLock(key)}         // ← call parent handler
          />
        ) : (
          <div
            className="hex-swatch-tile-preview"
            style={{ backgroundColor: tile.texture }}
            onClick={() => toggleLock(key)}         // ← call parent handler
          />
        );

        return (
          <div key={key} className="hex-row">
            <div className="hex-border">
              <div className="hexagon">
                {Preview}

                <div className={`hex-swatch-lock ${tile.locked ? "" : "invisible"}`}>
                  <LockOutlined />
                </div>
              </div>
            </div>
            <h4 className="label">{tile.name}</h4>
          </div>
        );
      })}
    </div>
  );
}
export function DefaultSwatches({ swatchTiles, toggleLock }) {

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
              <div className="swatch-lock" onClick={() => toggleLock(key)}>
                {swatchTiles[key].locked ?
                  <LockOutlined />
                   :
                  <UnlockOutlined />
                }
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}