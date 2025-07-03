import React, { useEffect, useState } from "react";
import './RocketAnimation.css'; // Ensure CSS is applied correctly
import { PiRocketBold } from "react-icons/pi";

const RocketAnimation = ({ isAnimating }) => {
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation when isAnimating is true
  useEffect(() => {
    if (isAnimating) {
      setAnimationTriggered(true);
      setTimeout(() => {
        setAnimationTriggered(false); // Reset animation after it completes
      }, 4000); // Duration of animation
    }
  }, [isAnimating]);

  return (
    <div className={`rocket-animation-container ${animationTriggered ? 'active' : ''}`}>
      {/* Background Gradient */}
      <div className="gradient-background"></div>

      {/* Rocket and Flames */}
      <div className="rocket-wrapper">
        <PiRocketBold className="rocket-icon" size={120} />
        {/* <div className="flame"></div> */}
      </div>

      {/* Celebration Confetti */}
      {animationTriggered && (
        <div className="confetti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`confetti confetti-${i % 5}`}
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
                animationDuration: `${Math.random() * 3 + 1}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Message */}
      <div className="message">
        <h2>Automation Launched</h2>
        <p>Please check your email for details & post copy</p>
      </div>
    </div>
  );
};

export default RocketAnimation;



// import React, { useEffect, useState } from "react";
// import './RocketAnimation.css'; // Ensure CSS is applied correctly
// import { PiRocketBold } from "react-icons/pi";

// const RocketAnimation = ({ isAnimating }) => {
//   const [animationTriggered, setAnimationTriggered] = useState(false);

//   // Trigger animation when isAnimating is true
//   useEffect(() => {
//     if (isAnimating) {
//       setAnimationTriggered(true);
//       setTimeout(() => {
//         setAnimationTriggered(false); // Reset animation after it completes
//       }, 4000); // Duration of animation
//     }
//   }, [isAnimating]);

//   return (
//     <div className={`rocket-animation-container ${animationTriggered ? 'active' : ''}`}>
//       {/* Background Gradient */}
//       <div className="gradient-background"></div>

//       {/* Rocket and Flames */}
//       <div className="rocket-wrapper">
//         <PiRocketBold className="rocket-icon" size={120} />
//         <div className="flame"></div>
//       </div>

//       {/* Celebration Confetti */}
//       {animationTriggered && (
//         <div className="confetti-container">
//           {Array.from({ length: 50 }).map((_, i) => (
//             <div
//               key={i}
//               className={`confetti confetti-${i % 5}`}
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
//                 animationDuration: `${Math.random() * 3 + 1}s`,
//                 animationDelay: `${Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* Message */}
//       <div className="message">
//         <h2>Automation Launched</h2>
//         <p>Please check your email for details & post copy</p>
//       </div>
//     </div>
//   );
// };

// export default RocketAnimation;


// // RocketAnimation.js
// import React, { useEffect, useState } from "react";
// // import { Rocket } from "lucide-react";
// import './RocketAnimation.css'; // Make sure the styles are properly applied
// import { PiRocketBold } from "react-icons/pi";

// const RocketAnimation = ({ isAnimating }) => {
//   const [animationTriggered, setAnimationTriggered] = useState(false);

//   // Trigger animation when isAnimating is true
//   useEffect(() => {
//     if (isAnimating) {
//       setAnimationTriggered(true);
//       setTimeout(() => {
//         setAnimationTriggered(false); // Reset animation after it completes
//       }, 4000); // Duration of animation
//     }
//   }, [isAnimating]);

//   return (
//     <div className={`rocket-animation-container ${animationTriggered ? 'active' : ''}`}>
//       {/* Background Gradient */}
//       <div className="gradient-background"></div>

//       {/* Rocket and Flames */}
//       <div className="rocket-wrapper">
//         <PiRocketBold className="rocket-icon" size={120} />
//         <div className="flame"></div>
//       </div>

//       {/* Celebration Confetti */}
//       {animationTriggered && (
//         <div className="confetti-container">
//           {Array.from({ length: 50 }).map((_, i) => (
//             <div
//               key={i}
//               className={`confetti confetti-${i % 5}`}
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
//                 animationDuration: `${Math.random() * 3 + 1}s`,
//                 animationDelay: `${Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* Message */}
//       <div className="message">
//         <h2>Automation Launched</h2>
//         <p>Please check your email for details & post copy</p>
//       </div>
//     </div>
//   );
// };

// export default RocketAnimation;

// // RocketAnimation.js

// import { BsRocket } from "react-icons/bs";
// // RocketAnimation.js
// import React, { useEffect, useState } from "react";
// // import { Rocket } from "lucide-react";
// import './RocketAnimation.css'; // Make sure the styles are properly applied

// const RocketAnimation = ({ isAnimating }) => {
//   const [animationTriggered, setAnimationTriggered] = useState(false);

//   // Trigger animation when isAnimating is true
//   useEffect(() => {
//     if (isAnimating) {
//       setAnimationTriggered(true);
//       setTimeout(() => {
//         setAnimationTriggered(false); // Reset animation after it completes
//       }, 4000); // Duration of animation
//     }
//   }, [isAnimating]);

//   return (
//     <div className={`rocket-animation-container ${animationTriggered ? 'active' : ''}`}>
//       {/* Background Gradient */}
//       <div className="gradient-background"></div>

//       {/* Rocket and Flames */}
//       <div className="rocket-wrapper">
//         <BsRocket className="rocket-icon" size={120} />
//         {/* <div className="flame"></div> */}
//       </div>

//       {/* Celebration Confetti */}
//       {animationTriggered && (
//         <div className="confetti-container">
//           {Array.from({ length: 50 }).map((_, i) => (
//             <div
//               key={i}
//               className={`confetti confetti-${i % 5}`}
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDuration: `${Math.random() * 3 + 1}s`,
//                 animationDelay: `${Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* Message */}
//       <div className="message">
//         <h2>Automation Launched</h2>
//         <p>Please check your email for details & post copy</p>
//       </div>
//     </div>
//   );
// };

// export default RocketAnimation;

