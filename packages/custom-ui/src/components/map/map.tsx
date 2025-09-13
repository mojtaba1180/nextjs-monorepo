
"use client";
import React from "react";

interface MapProps {
	mapKey?: string;
	center?: { latitude: number; longitude: number };
	zoom?: number;
	style?: React.CSSProperties;
	className?: string;
	poi?: boolean;
	onLocationSelect?: (latitude: number, longitude: number) => void;
	/** Called with the address string when a new address is fetched */
	onAddressSelect?: (address: string, latitude: number, longitude: number) => void;
	/** The address value from parent, to sync with input */
	address?: string;
	/** Show confirm location button */
	showConfirmButton?: boolean;
}

// Import MapLibre component directly
import MapLibre from './map-libre';

const Map: React.FC<MapProps> = ({
	mapKey, // Ignored - kept for backward compatibility
	center = { latitude: 37.2809, longitude: 49.5924 }, // مرکز رشت
	zoom = 13,
	style = { width: "100%", height: 300 },
	className,
	poi, // Ignored - kept for backward compatibility
	onLocationSelect,
	onAddressSelect,
	address,
	showConfirmButton,
	...rest
}) => {
	return (
		<MapLibre
			center={center}
			zoom={zoom}
			style={style}
			className={className}
			onLocationSelect={onLocationSelect}
			onAddressSelect={onAddressSelect}
			address={address}
			showConfirmButton={showConfirmButton}
			{...rest}
		/>
	);
};

export default Map;
