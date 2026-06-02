interface TireImageProps {
  brand?: string
  type?: string
  className?: string
  size?: number
}

const TREAD_PATTERNS: Record<string, string> = {
  ALL_SEASON: `
    <g fill="#222">
      <rect x="108" y="60" width="14" height="38" rx="3"/>
      <rect x="128" y="60" width="14" height="38" rx="3"/>
      <rect x="148" y="60" width="14" height="38" rx="3"/>
      <rect x="98" y="104" width="10" height="28" rx="2"/>
      <rect x="113" y="104" width="10" height="28" rx="2"/>
      <rect x="128" y="104" width="10" height="28" rx="2"/>
      <rect x="143" y="104" width="10" height="28" rx="2"/>
      <rect x="158" y="104" width="10" height="28" rx="2"/>
      <rect x="108" y="138" width="14" height="38" rx="3"/>
      <rect x="128" y="138" width="14" height="38" rx="3"/>
      <rect x="148" y="138" width="14" height="38" rx="3"/>
    </g>`,
  PERFORMANCE: `
    <g fill="#222">
      <rect x="105" y="58" width="8" height="44" rx="2" transform="rotate(-8 109 80)"/>
      <rect x="120" y="56" width="8" height="44" rx="2" transform="rotate(-8 124 78)"/>
      <rect x="135" y="56" width="8" height="44" rx="2" transform="rotate(-8 139 78)"/>
      <rect x="150" y="58" width="8" height="44" rx="2" transform="rotate(-8 154 80)"/>
      <rect x="165" y="60" width="8" height="40" rx="2" transform="rotate(-8 169 80)"/>
      <rect x="100" y="106" width="8" height="44" rx="2" transform="rotate(8 104 128)"/>
      <rect x="115" y="106" width="8" height="44" rx="2" transform="rotate(8 119 128)"/>
      <rect x="130" y="106" width="8" height="44" rx="2" transform="rotate(8 134 128)"/>
      <rect x="145" y="106" width="8" height="44" rx="2" transform="rotate(8 149 128)"/>
      <rect x="160" y="106" width="8" height="44" rx="2" transform="rotate(8 164 128)"/>
    </g>`,
  WINTER: `
    <g fill="#222">
      <rect x="106" y="60" width="12" height="36" rx="2"/>
      <rect x="123" y="60" width="12" height="36" rx="2"/>
      <rect x="140" y="60" width="12" height="36" rx="2"/>
      <rect x="157" y="60" width="12" height="36" rx="2"/>
      <rect x="100" y="102" width="12" height="36" rx="2"/>
      <rect x="117" y="102" width="12" height="36" rx="2"/>
      <rect x="134" y="102" width="12" height="36" rx="2"/>
      <rect x="151" y="102" width="12" height="36" rx="2"/>
      <rect x="168" y="102" width="12" height="36" rx="2"/>
      <rect x="106" y="140" width="12" height="36" rx="2"/>
      <rect x="123" y="140" width="12" height="36" rx="2"/>
      <rect x="140" y="140" width="12" height="36" rx="2"/>
      <rect x="157" y="140" width="12" height="36" rx="2"/>
      <line x1="106" y1="72" x2="118" y2="72" stroke="#555" stroke-width="2"/>
      <line x1="112" y1="66" x2="112" y2="90" stroke="#555" stroke-width="2"/>
      <line x1="123" y1="78" x2="135" y2="78" stroke="#555" stroke-width="2"/>
      <line x1="129" y1="66" x2="129" y2="90" stroke="#555" stroke-width="2"/>
    </g>`,
  TRUCK_SUV: `
    <g fill="#222">
      <rect x="102" y="56" width="18" height="42" rx="3"/>
      <rect x="126" y="56" width="18" height="42" rx="3"/>
      <rect x="150" y="56" width="18" height="42" rx="3"/>
      <rect x="102" y="104" width="18" height="42" rx="3"/>
      <rect x="126" y="104" width="18" height="42" rx="3"/>
      <rect x="150" y="104" width="18" height="42" rx="3"/>
      <rect x="102" y="152" width="18" height="28" rx="3"/>
      <rect x="126" y="152" width="18" height="28" rx="3"/>
      <rect x="150" y="152" width="18" height="28" rx="3"/>
    </g>`,
  ALL_TERRAIN: `
    <g fill="#222">
      <rect x="100" y="54" width="20" height="46" rx="3"/>
      <rect x="126" y="54" width="20" height="46" rx="3"/>
      <rect x="152" y="54" width="20" height="46" rx="3"/>
      <rect x="100" y="106" width="20" height="46" rx="3"/>
      <rect x="126" y="106" width="20" height="46" rx="3"/>
      <rect x="152" y="106" width="20" height="46" rx="3"/>
      <rect x="100" y="158" width="20" height="28" rx="3"/>
      <rect x="126" y="158" width="20" height="28" rx="3"/>
      <rect x="152" y="158" width="20" height="28" rx="3"/>
      <rect x="88" y="80" width="10" height="30" rx="2" transform="rotate(-20 93 95)"/>
      <rect x="174" y="80" width="10" height="30" rx="2" transform="rotate(20 179 95)"/>
    </g>`,
  SUMMER: `
    <g fill="#222">
      <rect x="107" y="58" width="10" height="42" rx="2" transform="rotate(-5 112 79)"/>
      <rect x="122" y="56" width="10" height="42" rx="2" transform="rotate(-5 127 77)"/>
      <rect x="137" y="56" width="10" height="42" rx="2" transform="rotate(-5 142 77)"/>
      <rect x="152" y="58" width="10" height="42" rx="2" transform="rotate(-5 157 79)"/>
      <rect x="104" y="104" width="10" height="42" rx="2" transform="rotate(5 109 125)"/>
      <rect x="119" y="104" width="10" height="42" rx="2" transform="rotate(5 124 125)"/>
      <rect x="134" y="104" width="10" height="42" rx="2" transform="rotate(5 139 125)"/>
      <rect x="149" y="104" width="10" height="42" rx="2" transform="rotate(5 154 125)"/>
      <rect x="164" y="104" width="10" height="42" rx="2" transform="rotate(5 169 125)"/>
    </g>`,
}

export default function TireImage({ brand, type = 'ALL_SEASON', className = '', size = 240 }: TireImageProps) {
  const tread = TREAD_PATTERNS[type] ?? TREAD_PATTERNS.ALL_SEASON

  return (
    <svg
      viewBox="0 0 280 280"
      width={size}
      height={size}
      className={className}
      aria-label={`${brand ?? 'Tire'} product image`}
    >
      {/* Subtle drop shadow */}
      <defs>
        <radialGradient id="shadowGrad" cx="50%" cy="95%" r="30%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="rimGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e8e8e8"/>
          <stop offset="60%" stopColor="#b0b0b0"/>
          <stop offset="100%" stopColor="#787878"/>
        </radialGradient>
        <radialGradient id="tireGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#3a3a3a"/>
          <stop offset="55%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
        <radialGradient id="highlightGrad" cx="35%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </radialGradient>
        <clipPath id="tireClip">
          <path d="M140,18 A122,122 0 1,1 139.9,18 Z M140,94 A46,46 0 1,0 140.1,94 Z"/>
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="140" cy="268" rx="88" ry="8" fill="url(#shadowGrad)"/>

      {/* Outer tire body */}
      <circle cx="140" cy="140" r="122" fill="url(#tireGrad)"/>

      {/* Tread grooves ring */}
      <circle cx="140" cy="140" r="122" fill="none" stroke="#111" strokeWidth="2"/>
      <circle cx="140" cy="140" r="104" fill="#1c1c1c"/>
      <circle cx="140" cy="140" r="100" fill="#111"/>

      {/* Tread blocks clipped to tread area */}
      <g clipPath="url(#tireClip)" transform="translate(0,0)">
        {/* Top tread */}
        <g transform="translate(140,140) rotate(0) translate(-140,-140)"
           dangerouslySetInnerHTML={{ __html: tread }} />
        <g transform="translate(140,140) rotate(45) translate(-140,-140)"
           dangerouslySetInnerHTML={{ __html: tread }} />
        <g transform="translate(140,140) rotate(90) translate(-140,-140)"
           dangerouslySetInnerHTML={{ __html: tread }} />
        <g transform="translate(140,140) rotate(135) translate(-140,-140)"
           dangerouslySetInnerHTML={{ __html: tread }} />
        <g transform="translate(140,140) rotate(180) translate(-140,-140)"
           dangerouslySetInnerHTML={{ __html: tread }} />
        <g transform="translate(140,140) rotate(225) translate(-140,-140)"
           dangerouslySetInnerHTML={{ __html: tread }} />
        <g transform="translate(140,140) rotate(270) translate(-140,-140)"
           dangerouslySetInnerHTML={{ __html: tread }} />
        <g transform="translate(140,140) rotate(315) translate(-140,-140)"
           dangerouslySetInnerHTML={{ __html: tread }} />
      </g>

      {/* Tire shoulder / sidewall ring */}
      <circle cx="140" cy="140" r="100" fill="none" stroke="#2a2a2a" strokeWidth="3"/>
      <circle cx="140" cy="140" r="97" fill="#161616"/>

      {/* Rim outer edge */}
      <circle cx="140" cy="140" r="80" fill="#a0a0a0"/>
      <circle cx="140" cy="140" r="78" fill="url(#rimGrad)"/>

      {/* Rim spokes (5-spoke design) */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 140 + 28 * Math.cos(rad)
        const y1 = 140 + 28 * Math.sin(rad)
        const x2 = 140 + 72 * Math.cos(rad)
        const y2 = 140 + 72 * Math.sin(rad)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#888" strokeWidth="11" strokeLinecap="round"/>
        )
      })}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 140 + 28 * Math.cos(rad)
        const y1 = 140 + 28 * Math.sin(rad)
        const x2 = 140 + 72 * Math.cos(rad)
        const y2 = 140 + 72 * Math.sin(rad)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#c8c8c8" strokeWidth="7" strokeLinecap="round"/>
        )
      })}

      {/* Center hub */}
      <circle cx="140" cy="140" r="30" fill="#b0b0b0"/>
      <circle cx="140" cy="140" r="27" fill="#d0d0d0"/>
      <circle cx="140" cy="140" r="14" fill="#a0a0a0"/>
      <circle cx="140" cy="140" r="10" fill="#888"/>
      <circle cx="140" cy="140" r="5" fill="#666"/>

      {/* Rim highlight */}
      <circle cx="140" cy="140" r="78" fill="url(#highlightGrad)"/>

      {/* Tire outer highlight (gives roundness) */}
      <ellipse cx="105" cy="96" rx="28" ry="14" fill="#ffffff" fillOpacity="0.04" transform="rotate(-35 105 96)"/>
    </svg>
  )
}
