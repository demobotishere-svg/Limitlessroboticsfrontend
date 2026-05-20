import { motion } from 'framer-motion';

export default function ExoskeletonSchematic() {
  return (
    <div className="relative w-full h-full min-h-[500px] sm:min-h-[580px] lg:min-h-[680px] flex flex-col justify-between p-4 select-none overflow-visible">
      
      {/* Background technical layout lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal grid lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-neutral-900/[0.03]" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-neutral-900/[0.03]" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-neutral-900/[0.03]" />
        
        {/* Vertical grid lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-neutral-900/[0.03]" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-neutral-900/[0.03]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-neutral-900/[0.03]" />
        
        {/* Diagonal blueprint lines */}
        <svg className="absolute inset-0 w-full h-full text-neutral-900/[0.02]" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>



      {/* Central SVG Schematic Canvas */}
      <div className="flex-1 w-full flex items-center justify-center relative my-4 overflow-visible">
        
        {/* Outer Circular HUD Reticle (Slow Rotate Clockwise) */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] text-neutral-900/[0.03] pointer-events-none"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1, 4" fill="none" />
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="40, 10" fill="none" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4, 4" fill="none" />
        </motion.svg>

        {/* Inner Circular HUD Reticle (Counter-Clockwise Rotate) */}
        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] text-neutral-900/[0.04] pointer-events-none"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="0.75" strokeDasharray="15, 30, 5, 10" fill="none" />
          <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3, 3" fill="none" />
          <line x1="100" y1="10" x2="100" y2="25" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="175" x2="100" y2="190" stroke="currentColor" strokeWidth="1" />
        </motion.svg>

        {/* Central Exoskeleton Mechanical Linkage SVG */}
        <svg
          className="w-full h-full max-h-[380px] sm:max-h-[480px] lg:max-h-[540px] text-neutral-800 overflow-visible"
          viewBox="0 0 200 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Spinal Interface */}
          <path d="M 85 15 L 115 15 L 120 32 L 80 32 Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
          <line x1="90" y1="20" x2="110" y2="20" stroke="currentColor" strokeWidth="0.75" />
          <line x1="90" y1="26" x2="110" y2="26" stroke="currentColor" strokeWidth="0.75" />

          {/* Segmented Spine vertebrae assembly */}
          <g>
            <path d="M 100 32 L 100 70" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3, 2" />
            <rect x="96" y="38" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1" fill="white" />
            <rect x="96" y="48" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1" fill="white" />
            <rect x="96" y="58" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1" fill="white" />
          </g>

          {/* Main Pelvic / Hip Actuator Hub */}
          <g>
            <circle cx="100" cy="78" r="16" stroke="currentColor" strokeWidth="1.5" fill="white" />
            <circle cx="100" cy="78" r="11" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3, 3" fill="none" />
            <circle cx="100" cy="78" r="4" fill="currentColor" />
            
            {/* Rotating joint degree feedback */}
            <motion.line 
              x1="100" y1="78" x2="114" y2="70" 
              stroke="currentColor" strokeWidth="1.5" 
              animate={{ rotate: [0, 20, -15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "100px 78px" }}
            />
          </g>

          {/* Upper Thigh Linkage */}
          <g>
            <line x1="93" y1="92" x2="71" y2="162" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="107" y1="92" x2="85" y2="162" stroke="currentColor" strokeWidth="1" strokeDasharray="5, 3" />
            
            {/* Hydraulic Actuator piston */}
            <rect x="110" y="105" width="6" height="35" rx="1" transform="rotate(-18 110 105)" stroke="currentColor" strokeWidth="1" fill="white" />
            <motion.line 
              x1="114" y1="138" x2="105" y2="158" 
              stroke="currentColor" strokeWidth="1.5"
              animate={{ y: [0, 6, -3, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          {/* Knee Rotary Joint Gear */}
          <g>
            <circle cx="78" cy="168" r="12" stroke="currentColor" strokeWidth="1.5" fill="white" />
            <circle cx="78" cy="168" r="8" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2, 2" fill="none" />
            <circle cx="78" cy="168" r="3" fill="currentColor" />
          </g>

          {/* Lower Shin Structural Frame */}
          <g>
            <line x1="78" y1="178" x2="88" y2="246" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* Front composite casing outline */}
            <path d="M 72 181 L 66 212 L 80 240" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3, 3" />
            {/* Shock damper cylinder */}
            <rect x="91" y="190" width="5" height="30" rx="0.5" transform="rotate(8 91 190)" stroke="currentColor" strokeWidth="1" fill="white" />
          </g>

          {/* Ankle Bracket & Foot Assembly */}
          <g>
            <circle cx="89" cy="249" r="6" stroke="currentColor" strokeWidth="1.25" fill="white" />
            <path d="M 82 254 L 116 254 L 122 263 L 76 263 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="white" />
            <line x1="84" y1="258" x2="114" y2="258" stroke="currentColor" strokeWidth="0.75" />
          </g>

          {/* Schematic Signal Links */}
          <g className="text-neutral-400">
            {/* Top link */}
            <path d="M 100 48 L 150 48 L 158 54" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2, 2" />
            <circle cx="158" cy="54" r="1.5" fill="currentColor" />
            
            {/* Mid link */}
            <path d="M 100 78 L 45 78 L 37 86" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2, 2" />
            <circle cx="37" cy="86" r="1.5" fill="currentColor" />
            
            {/* Knee Link */}
            <path d="M 78 168 L 35 168 L 27 176" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2, 2" />
            <circle cx="27" cy="176" r="1.5" fill="currentColor" />
          </g>
        </svg>

        {/* Hoverable hotspots overlay (placed precisely using percentage positions) */}
        {/* Hip actuator hotspot */}
        <div className="absolute top-[28%] left-[calc(50%-10px)] group/hot">
          <span className="absolute -inset-2.5 rounded-full bg-neutral-900/5 scale-75 group-hover/hot:scale-100 opacity-0 group-hover/hot:opacity-100 transition-all duration-300" />
          <div className="relative w-4 h-4 rounded-full border border-neutral-400 bg-white flex items-center justify-center cursor-pointer shadow-sm">
            <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
          </div>
          {/* Tooltip */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 ml-2.5 px-3 py-1.5 rounded-lg bg-black text-white text-[9px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover/hot:opacity-100 pointer-events-none transition-all duration-250 shadow-lg">
            HIP_ACTUATOR_01: NOMINAL [320 RPM]
          </div>
        </div>

        {/* Knee Joint Hotspot */}
        <div className="absolute top-[59%] left-[calc(50%-33px)] group/hot">
          <span className="absolute -inset-2.5 rounded-full bg-neutral-900/5 scale-75 group-hover/hot:scale-100 opacity-0 group-hover/hot:opacity-100 transition-all duration-300" />
          <div className="relative w-4 h-4 rounded-full border border-neutral-400 bg-white flex items-center justify-center cursor-pointer shadow-sm">
            <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
          </div>
          {/* Tooltip */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 mr-2.5 px-3 py-1.5 rounded-lg bg-black text-white text-[9px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover/hot:opacity-100 pointer-events-none transition-all duration-250 shadow-lg">
            KNEE_ENCODER_02: 60Hz SYNC [99.8%]
          </div>
        </div>

        {/* Ankle Joint Hotspot */}
        <div className="absolute top-[86%] left-[calc(50%-22px)] group/hot">
          <span className="absolute -inset-2.5 rounded-full bg-neutral-900/5 scale-75 group-hover/hot:scale-100 opacity-0 group-hover/hot:opacity-100 transition-all duration-300" />
          <div className="relative w-4 h-4 rounded-full border border-neutral-400 bg-white flex items-center justify-center cursor-pointer shadow-sm">
            <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
          </div>
          {/* Tooltip */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 ml-2.5 px-3 py-1.5 rounded-lg bg-black text-white text-[9px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover/hot:opacity-100 pointer-events-none transition-all duration-250 shadow-lg">
            ANKLE_DAMPER_03: HYDRAULIC PRESSURE OK
          </div>
        </div>
      </div>


    </div>
  );
}
