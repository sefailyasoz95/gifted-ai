interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        {/* Gift box */}
        <rect
          x="8"
          y="20"
          width="24"
          height="16"
          rx="2"
          className="stroke-current"
          strokeWidth="2"
        />
        {/* Gift box lid */}
        <path
          d="M6 18h28M20 18v18"
          className="stroke-current"
          strokeWidth="2"
        />
        <rect
          x="12"
          y="16"
          width="16"
          height="4"
          rx="1"
          className="stroke-current"
          strokeWidth="2"
        />
        
        {/* Robot head emerging from box */}
        <rect
          x="13"
          y="8"
          width="14"
          height="12"
          rx="2"
          className="stroke-current fill-background"
          strokeWidth="2"
        />
        
        {/* Robot antenna */}
        <path
          d="M20 8v-3M18 5h4"
          className="stroke-current"
          strokeWidth="1.5"
        />
        
        {/* Robot eyes */}
        <circle
          cx="16.5"
          cy="13.5"
          r="1.5"
          className="fill-current"
        />
        <circle
          cx="23.5"
          cy="13.5"
          r="1.5"
          className="fill-current"
        />
        
        {/* Robot smile */}
        <path
          d="M17 16.5c1.5 1 4.5 1 6 0"
          className="stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Digital circuits on robot face */}
        <path
          d="M14 11h2M24 11h2"
          className="stroke-current"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
