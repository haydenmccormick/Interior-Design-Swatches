// src/IsometricKitchen.js

import React, { useEffect, useRef } from 'react';
import {
  IsometricCanvas,
  IsometricRectangle,
  IsometricGroup,
  PlaneView,
  IsometricPath
} from '@elchininet/isometric';

function IsometricKitchen( { swatchTiles } ) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef || !containerRef.current) return;

    const canvas = new IsometricCanvas({
      container: containerRef.current,
      backgroundColor: '#CCC',
      scale: 50,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    const commonTextureProps = {
        height: 1,
        width: 1,
        pixelated: true
    };

    const floorTextureProps = {
        texture: {
          url: swatchTiles.floor.texture,
          ...commonTextureProps,
        }
    }

    const counterTextureProps = {
        texture: {
          url: swatchTiles.counter.texture,
          ...commonTextureProps,
        }
    }

    const backsplashTextureProps = {
        texture: {
          url: swatchTiles.backsplash.texture,
          ...commonTextureProps,
        }
    }

    const lowerCabinetTextureProps = {
      fillColor: swatchTiles.lower_cabinet.texture,
      ...commonTextureProps,
    }

    const upperCabinetTextureProps = {
      fillColor: swatchTiles.upper_cabinet.texture,
      ...commonTextureProps,
    }

    const wallTextureProps = {
      fillColor: swatchTiles.wall.texture,
    }

    // --- Room planes ---
    const planeProps = { height: 6, width: 6, fillOpacity: 0.25 };
    const planeTop = new IsometricRectangle(
      { 
        ...planeProps, 
        ...floorTextureProps,
        planeView: PlaneView.TOP, 
        fillOpacity: 1,
      }
    );
    const planeRight = new IsometricRectangle(
      { 
        ...planeProps, 
        ...wallTextureProps,
        planeView: PlaneView.FRONT,
      }
    );
    const planeLeft = new IsometricRectangle(
      { 
        ...planeProps, 
        ...wallTextureProps,
        planeView: PlaneView.SIDE,
      }
    );

    const lowerCabinetProps = { right: 4.5, left: 2.5, forward: 1, height: 1, backsplashHeight: 1.5 };
    const topCabinetOffset = lowerCabinetProps.height + lowerCabinetProps.backsplashHeight;

    // --- Bottom Cabinet ---
    const bottomT = new IsometricPath({...counterTextureProps})
      .mt(lowerCabinetProps.forward, 0, lowerCabinetProps.height)
      .lt(lowerCabinetProps.right, 0, lowerCabinetProps.height)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, lowerCabinetProps.height)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.forward, lowerCabinetProps.height)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.left, lowerCabinetProps.height)
      .lt(0, lowerCabinetProps.left, lowerCabinetProps.height)
      .lt(0, 0, lowerCabinetProps.height);

    const bottomR = new IsometricPath({...lowerCabinetTextureProps})
      .mt(lowerCabinetProps.right, 0, lowerCabinetProps.height)
      .lt(lowerCabinetProps.right, 0, 0)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, 0)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, lowerCabinetProps.height);

    const bottomL = new IsometricPath({...lowerCabinetTextureProps})
      .mt(lowerCabinetProps.forward, lowerCabinetProps.forward, lowerCabinetProps.height)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, lowerCabinetProps.height)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, 0)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.forward, 0);

    const bottomL2 = new IsometricPath({...lowerCabinetTextureProps})
      .mt(0, lowerCabinetProps.left, lowerCabinetProps.height)
      .lt(0, lowerCabinetProps.left, 0)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.left, 0)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.left, lowerCabinetProps.height);

    const bottomR2 = new IsometricPath({...lowerCabinetTextureProps})
      .mt(lowerCabinetProps.forward, lowerCabinetProps.left, lowerCabinetProps.height)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.left, 0)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.forward, 0)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.forward, lowerCabinetProps.height);

    const backsplash = new IsometricPath({...backsplashTextureProps})
      .mt(0, 0, lowerCabinetProps.height)
      .lt(0, 0, lowerCabinetProps.height + lowerCabinetProps.backsplashHeight)
      .lt(lowerCabinetProps.right, 0, lowerCabinetProps.height + lowerCabinetProps.backsplashHeight)
      .lt(lowerCabinetProps.right, 0, lowerCabinetProps.height)
      .lt(0, 0, lowerCabinetProps.height)
      .lt(0, lowerCabinetProps.left, lowerCabinetProps.height)
      .lt(0, lowerCabinetProps.left, lowerCabinetProps.height + lowerCabinetProps.backsplashHeight)
      .lt(0, 0, lowerCabinetProps.height + lowerCabinetProps.backsplashHeight);

    const bottomPiece = new IsometricGroup();
    bottomPiece.addChildren(bottomT, bottomR, bottomL, bottomR2, bottomL2);

    // --- Sink ---
    const sinkWidth = 1.0;
    const sinkDepth = 0.5;
    const sinkHeight = lowerCabinetProps.height - 0.1;
    const sinkCenterR = lowerCabinetProps.right / 2;
    const sinkCenterF = lowerCabinetProps.forward / 2;

    const sinkBasinT = new IsometricPath()
      .mt(sinkCenterR - sinkWidth / 2, sinkCenterF - sinkDepth / 2, sinkHeight)
      .lt(sinkCenterR + sinkWidth / 2, sinkCenterF - sinkDepth / 2, sinkHeight)
      .lt(sinkCenterR + sinkWidth / 2, sinkCenterF + sinkDepth / 2, sinkHeight)
      .lt(sinkCenterR - sinkWidth / 2, sinkCenterF + sinkDepth / 2, sinkHeight);

    const sinkBasinR = new IsometricPath()
      .mt(sinkCenterR - sinkWidth / 2, sinkCenterF - sinkDepth / 2, sinkHeight)
      .lt(sinkCenterR - sinkWidth / 2, sinkCenterF - sinkDepth / 2, sinkHeight - sinkDepth);

    bottomPiece.addChildren(sinkBasinT, sinkBasinR, backsplash);

    // --- Top Cabinet ---
    const topT = new IsometricPath({...upperCabinetTextureProps})
      .mt(lowerCabinetProps.forward, 0, topCabinetOffset + lowerCabinetProps.height)
      .lt(lowerCabinetProps.right, 0, topCabinetOffset + lowerCabinetProps.height)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, topCabinetOffset + lowerCabinetProps.height)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.forward, topCabinetOffset + lowerCabinetProps.height)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.left, topCabinetOffset + lowerCabinetProps.height)
      .lt(0, lowerCabinetProps.left, topCabinetOffset + lowerCabinetProps.height)
      .lt(0, 0, topCabinetOffset + lowerCabinetProps.height);

    const topR = new IsometricPath({...upperCabinetTextureProps})
      .mt(lowerCabinetProps.right, 0, lowerCabinetProps.height + topCabinetOffset)
      .lt(lowerCabinetProps.right, 0, topCabinetOffset)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, topCabinetOffset)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, lowerCabinetProps.height + topCabinetOffset);

    const topL = new IsometricPath({...upperCabinetTextureProps})
      .mt(lowerCabinetProps.forward, lowerCabinetProps.forward, lowerCabinetProps.height + topCabinetOffset)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, lowerCabinetProps.height + topCabinetOffset)
      .lt(lowerCabinetProps.right, lowerCabinetProps.forward, topCabinetOffset)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.forward, topCabinetOffset);

    const topL2 = new IsometricPath({...upperCabinetTextureProps})
      .mt(0, lowerCabinetProps.left, lowerCabinetProps.height + topCabinetOffset)
      .lt(0, lowerCabinetProps.left, topCabinetOffset)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.left, topCabinetOffset)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.left, lowerCabinetProps.height + topCabinetOffset);

    const topR2 = new IsometricPath({...upperCabinetTextureProps})
      .mt(lowerCabinetProps.forward, lowerCabinetProps.left, lowerCabinetProps.height + topCabinetOffset)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.left, topCabinetOffset)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.forward, topCabinetOffset)
      .lt(lowerCabinetProps.forward, lowerCabinetProps.forward, lowerCabinetProps.height + topCabinetOffset);

    const topPiece = new IsometricGroup();
    topPiece.addChildren(topT, topR, topL, topL2, topR2);

    // --- Add to canvas ---
    canvas.addChildren(planeTop, planeRight, planeLeft);
    canvas.addChild(bottomPiece);
    canvas.addChild(topPiece);

  }, []);

  return (
    <div
      ref={containerRef}
      style={{ flex: 1, position: 'relative', height: '100%' }}
    />
  );
  
}

export default IsometricKitchen;
