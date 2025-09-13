"use client";
import { Button } from "@workspace/ui/components/button";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl/maplibre";

interface MapLibreProps {
	center?: { latitude: number; longitude: number };
	zoom?: number;
	style?: React.CSSProperties;
	className?: string;
	onLocationSelect?: (latitude: number, longitude: number) => void;
	onAddressSelect?: (address: string, latitude: number, longitude: number) => void;
	address?: string;
	showConfirmButton?: boolean;
}

const SERVICE_MAP_KEY = "service.0de3803e545a4093914929f33d3bb0c8";

const MapLibre: React.FC<MapLibreProps> = ({
	center = { latitude: 37.2809, longitude: 49.5924 }, // مرکز رشت
	zoom = 13,
	style = { width: "100%", height: 300 },
	className,
	onLocationSelect,
	onAddressSelect,
	address: addressProp,
	showConfirmButton = true,
}) => {
	const [viewState, setViewState] = useState({
		longitude: center.longitude,
		latitude: center.latitude,
		zoom: zoom,
	});
	const [markerPosition, setMarkerPosition] = useState({
		longitude: center.longitude,
		latitude: center.latitude,
	});
	const [address, setAddress] = useState<string>(addressProp || "");
	const [confirmedLocation, setConfirmedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
	const mapRef = useRef<any>(null);

	// Sync address state with prop
	useEffect(() => {
		if (typeof addressProp === 'string' && addressProp !== address) {
			setAddress(addressProp);
		}
	}, [addressProp, address]);

	// Update view state when center prop changes
	useEffect(() => {
		setViewState({
			longitude: center.longitude,
			latitude: center.latitude,
			zoom: zoom,
		});
		setMarkerPosition({
			longitude: center.longitude,
			latitude: center.latitude,
		});
	}, [center.latitude, center.longitude, zoom]);

	// Fetch address from Neshan API
	const fetchAddress = async (lat: number, lng: number) => {
		try {
			const res = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
				headers: {
					'Api-Key': SERVICE_MAP_KEY,
				},
			});
			if (!res.ok) throw new Error("خطا در دریافت آدرس");
			const data = await res.json();
			const fetchedAddress = data.formatted_address || "آدرس یافت نشد";
			setAddress(fetchedAddress);
			if (typeof onAddressSelect === 'function') {
				onAddressSelect(fetchedAddress, lat, lng);
			}
		} catch (e) {
			console.error('Error fetching address:', e);
			setAddress("آدرس یافت نشد");
			if (typeof onAddressSelect === 'function') {
				onAddressSelect("آدرس یافت نشد", lat, lng);
			}
		}
	};

	// Handle map movement
	const handleMove = useCallback((evt: any) => {
		setViewState(evt.viewState);
		// Update marker position to center of map
		const { longitude, latitude } = evt.viewState;
		setMarkerPosition({ longitude, latitude });
	}, []);

	// Confirm location
	const handleConfirmLocation = () => {
		const { latitude, longitude } = markerPosition;
		setConfirmedLocation({ latitude, longitude });
		if (onLocationSelect) {
			onLocationSelect(latitude, longitude);
		}
		if (typeof onAddressSelect === 'function') {
			onAddressSelect('در حال دریافت آدرس...', latitude, longitude);
		}
		fetchAddress(latitude, longitude);
	};

	return (
		<div style={{ position: 'relative', ...style }} className={className}>
			<Map
				ref={mapRef}
				{...viewState}
				onMove={handleMove}
				style={{ width: '100%', height: '100%'}}
				mapStyle={{
					"version": 8,
					"sources": {
						"osm": {
							"type": "raster",
							"tiles": ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
							"tileSize": 256,
							"attribution": "© OpenStreetMap contributors"
						}
					},
					"layers": [
						{
							"id": "osm",
							"type": "raster",
							"source": "osm"
						}
					]
				}}
				attributionControl={{ compact: false }}
			>

				<NavigationControl position="top-left" />
				<GeolocateControl position="top-left" />
				
				{/* Center marker */}
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -100%)',
						zIndex: 10,
						pointerEvents: 'none',
					}}
				>
					<svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 58">
						<g fill="none" fillRule="evenodd">
							<path fill="#2AB3C6" d="M17.24 56.242h-.021v-3.964c0-7.076-3.56-13.572-9.285-17.696A19.077 19.077 0 0 1 .05 17.674C.727 8.172 8.576.484 18.052.024 28.976-.51 38 8.225 38 19.077c0 6.524-3.26 12.28-8.236 15.717-5.696 3.936-8.983 10.537-8.983 17.48v3.967h-.022a1.76 1.76 0 0 1-3.518 0z" />
							<rect width={13} height={13} x={13} y={12} fill="#FFF" rx="6.5" />
						</g>
					</svg>
				</div>
			</Map>

			{/* Confirm button and address display */}
			{showConfirmButton && (
				<div style={{ 
					position: 'absolute', 
					left: 0, 
					right: 0, 
					bottom: 10, 
					display: 'flex', 
					flexDirection: 'column', 
					alignItems: 'center', 
					zIndex: 20 
				}}
                className="!max-w-sm mx-auto px-5 py-2 !bg-green-600"
                >
					<Button
						type="button"
                        variant={"default"}
						onClick={handleConfirmLocation}
                        size={"lg"}
                        className=""
							>
						تایید مکان
					</Button>
					{confirmedLocation && address && (
						<span className="text-gray-800 bg-gray-100 rounded-lg px-3 py-1.5 text-sm mt-1 shadow-md">
							آدرس: {address}
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default MapLibre; 