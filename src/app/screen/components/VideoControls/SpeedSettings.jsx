import { CaptionsIcon } from "lucide-react";
import React, { useState } from "react";

const SpeedSettings = ({ showMenu, handleSpeed, speed }) => {
  
  return (
    <>
      {showMenu && (
        <div className="setting-options">
           

          <div className="s-header">
            {/* <button className="s-quality">Quality</button> */}
            <div className="s-speed">
              <span style={{ color: "white" }}>Speed</span>
            </div>
          </div>
          
          <div className="s-content grid text-left">
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((val) => (
              <div
                key={val}
                onClick={() => handleSpeed(val)}
                style={{
                  fontWeight: speed === val ? "bold" : "normal",
                  background:
                    speed === val ? "rgba(255,255,255,0.1)" : "transparent",
                  color: "white",
                  border: " 2px red",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                {val}x
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SpeedSettings;
