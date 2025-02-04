"use client";

import { useEffect, useMemo, useState } from "react";
import { Gift, Heart, PartyPopper, Sparkles, Star, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useDeviceSize } from "@/hooks/use-device-size";

const ICON_COMPONENTS = [Gift, Heart, PartyPopper, Sparkles, Star, Crown];
const COLORS = ["#FF69B4", "#FF1493", "#FFB6C1", "#FF85A2", "#FF4D94", "#FF91AF"];

// Generate more random floating icons
const FLOATING_ICONS = Array.from({ length: 24 }, (_, i) => ({
	id: i + 1,
	icon: ICON_COMPONENTS[Math.floor(Math.random() * ICON_COMPONENTS.length)],
	color: COLORS[Math.floor(Math.random() * COLORS.length)],
	size: Math.floor(Math.random() * (48 - 32) + 32), // Random size between 32 and 48
	rotation: `${Math.floor(Math.random() * 40 - 20)}deg`, // Random rotation between -20 and 20 degrees
	delay: `${(i * 0.2)}s`,
	// Add random initial positions
	initialX: Math.random() * 100,
	initialY: Math.random() * 100,
}));

// Function to get a grid-like position with some randomness
function getRandomPosition(index: number, total: number, width: number, height: number) {
	// Create a grid-like structure
	const gridCols = Math.ceil(Math.sqrt(total));
	const gridRows = Math.ceil(total / gridCols);
	
	const cellWidth = width / gridCols;
	const cellHeight = height / gridRows;
	
	const col = index % gridCols;
	const row = Math.floor(index / gridCols);
	
	// Add randomness within the cell
	const randomX = (Math.random() * 0.5 + 0.25) * cellWidth; // 25%-75% of cell width
	const randomY = (Math.random() * 0.5 + 0.25) * cellHeight; // 25%-75% of cell height
	
	const x = col * cellWidth + randomX;
	const y = row * cellHeight + randomY;
	
	return { x, y };
}

const fadeInVariants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
		y: 20,
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
	},
};

// Add floating animation variants
const floatingVariants = {
	animate: (i: number) => ({
		x: [0, Math.sin(i) * 30, 0],
		y: [0, Math.cos(i) * 30, 0],
		transition: {
			duration: 6 + Math.random() * 2, // Random duration between 6-8s
			repeat: Infinity,
			repeatType: "reverse" as const,
			ease: "easeInOut",
		},
	}),
};

export function FloatingPosts() {
	const { deviceType } = useDeviceSize();
	const [isClient, setIsClient] = useState(false);
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		setIsClient(true);
		const updateSize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const visibleIcons = useMemo(() => {
		const count = windowSize.width < 640 ? 8 : windowSize.width < 1024 ? 16 : 24;
		return FLOATING_ICONS.slice(0, count);
	}, [windowSize.width]);

	if (!isClient) return null;

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{visibleIcons.map((item, index) => {
				const position = getRandomPosition(
					index,
					visibleIcons.length,
					windowSize.width,
					windowSize.height
				);
				const Icon = item.icon;

				return (
					<motion.div
						key={item.id}
						className="absolute"
						style={{
							left: position.x,
							top: position.y,
							rotate: item.rotation,
						}}
						initial="hidden"
						animate={["visible", "animate"]}
						variants={{
							...fadeInVariants,
							animate: floatingVariants.animate(index),
						}}
						custom={index}
					>
						<div className="relative bg-background/60 backdrop-blur-xl rounded-xl p-4 shadow-lg">
							<Icon 
								size={item.size} 
								color={item.color}
								strokeWidth={1.5} 
							/>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
