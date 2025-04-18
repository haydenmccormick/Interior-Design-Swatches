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
        {Object.entries(swatchTiles).map(([key, tile]) => (
          <div key={key} className="swatch-tile">
            {tile.type === "image" ? (
              <img
                className="swatch-tile-preview"
                src={tile.texture}
                alt={tile.name}
              />
            ) : (
              <div
                className="swatch-tile-preview"
                style={{ backgroundColor: tile.texture }}
              />
            )}

            <h4 className="label">{tile.name}</h4>

            {/* className now adds `locked` when tile.locked === true */}
            <div
              className={`swatch-lock${tile.locked ? " locked" : ""}`}
              onClick={() => toggleLock(key)}
            >
              {tile.locked ? <LockOutlined /> : <UnlockOutlined />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
