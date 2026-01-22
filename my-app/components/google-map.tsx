"use client"

import { useState } from "react"
import { MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GoogleMapProps {
  latitude: number
  longitude: number
  zoom?: number
  title?: string
  className?: string
  address?: string
}

export function GoogleMap({
  latitude,
  longitude,
  zoom = 15,
  title = "Summerhouse Location",
  className = "",
  address,
}: GoogleMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Create the proper Google Maps embed URL for custom coordinates
  // Using the "view" mode which works with lat/lng coordinates
  //const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${zoom}!5e0!3m2!1sen!2sdk!4v1640995200000!5m2!1sen!2sdk`
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`


  // Alternative: OpenStreetMap embed (no API key required)
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`

  // Google Maps link for "Get Directions"
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`

  // Google Maps link to open in new tab
  const viewInMapsUrl = `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`

  return (
    <div className={`relative w-full bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Loading map...</p>
          </div>
        </div>
      )}

      {/* Try Google Maps first, fallback to OpenStreetMap if needed */}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // If Google Maps fails, you could switch to OSM here
          console.log("Google Maps failed to load")
        }}
        className="w-full h-full"
      />

      {/* Overlay with action buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white text-gray-900 shadow-md" asChild>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="w-4 h-4 mr-2" />
            Get Directions
          </a>
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white text-gray-900 shadow-md" asChild>
          <a href={viewInMapsUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            View in Maps
          </a>
        </Button>
      </div>
    </div>
  )
}
