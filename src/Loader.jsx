import React, { useEffect, useState } from "react";

export const Loader = () => {
  return (
    <>
      <div className="container">
        <div className="loader"></div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .loader {
          width: 50px;
          padding: 8px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #25b09b;
          --_m: conic-gradient(#0000 10%, #000),
            linear-gradient(#000 0 0) content-box;
          -webkit-mask: var(--_m);
          mask: var(--_m);
          -webkit-mask-composite: source-out;
          mask-composite: subtract;
          animation: l3 1s infinite linear;
        }
        @keyframes l3 {
          to {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </>
  );
};
