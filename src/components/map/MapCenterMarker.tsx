import React from 'react';

const containerStyle: React.CSSProperties = {
    width: '60px',
    height: '36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const textBoxStyle: React.CSSProperties = {
    width: '100%',
    padding: '4px 0',
    backgroundColor: '#27272a',
    borderRadius: '3px',
    color: '#e5e5e5',
    fontSize: '14px',
    fontWeight: 900,
    fontFamily: 'Pretendard, sans-serif',
    textAlign: 'center',
    lineHeight: 1,
};

const triangleStyle: React.CSSProperties = {
    width: 0,
    height: 0,
    borderTop: '8px solid #27272a',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
};

export const MapCenterMarker = () => (
  <div style={containerStyle}>
      <div style={textBoxStyle}>
          시작
      </div>
      <div style={triangleStyle} />
  </div>
);
