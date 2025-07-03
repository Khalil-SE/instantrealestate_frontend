import React from 'react';

const GradientBackgroundSideBar = ({ children }) => {
//   const gradients = Array.from({ length: 3 }).map((_, i) => {
//     const size = Math.floor(Math.random() * 100 + 500); // size 100-200px
//     const top = Math.random() * 70;
//     const left = Math.random() * 70;
//     const colors = [
//         'rgba(17, 0, 255, 0.06)',
//         'rgba(255, 0, 128, 0.06)',
//         'rgba(0, 128, 255, 0.06)',
//         'rgba(172, 6, 255, 0.06)'
//     ];
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     return (
//       <div
//         key={i}
//         style={{
//           position: 'absolute',
//           top: `${top}%`,
//           left: `${left}%`,
//           width: `${size}px`,
//           height: `${size}px`,
//           background: `radial-gradient(circle, ${color}, transparent 70%)`,
//           pointerEvents: 'none',
//           zIndex: 0,
//         }}
//       />
//     );
//   });

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100vh', width: '100%' }}>
      {/* {gradients} */}
      
      <div
        style={{
          position: 'absolute',
          top: `10%`,
          left: `-100%`,
          width: `516px`,
          height: `516px`,
          background: `radial-gradient(circle, rgba(0, 128, 255, 0.16), transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: `30%`,
          left: `-50%`,
          width: `516px`,
          height: `516px`,
          background: `radial-gradient(circle, rgba(255, 0, 128, 0.16), transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: `64%`,
          left: `20%`,
          width: `516px`,
          height: `516px`,
          background: `radial-gradient(circle, rgba(172, 6, 255, 0.16), transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default GradientBackgroundSideBar;
