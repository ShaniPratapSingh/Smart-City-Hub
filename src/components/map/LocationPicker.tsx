import { useState, useEffect } from 'react';
import { MapPin, Locate, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface LocationPickerProps {
  onLocationChange: (lat: number, lng: number, address?: string) => void;
  initialLat?: number;
  initialLng?: number;
}

const LocationPicker = ({ onLocationChange, initialLat = 28.6139, initialLng = 77.2090 }: LocationPickerProps) => {
  const { toast } = useToast();
  const [latitude, setLatitude] = useState<string>(initialLat.toString());
  const [longitude, setLongitude] = useState<string>(initialLng.toString());
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const lat = parseFloat(latitude) || initialLat;
    const lng = parseFloat(longitude) || initialLng;
    onLocationChange(lat, lng, address);
  }, [latitude, longitude, address]);

  const getCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(6));
          setLongitude(pos.coords.longitude.toFixed(6));
          setIsLocating(false);
          toast({
            title: 'Location Retrieved',
            description: 'Your current location has been set.',
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          toast({
            title: 'Location Error',
            description: 'Could not retrieve your location. Please enter manually.',
            variant: 'destructive',
          });
        }
      );
    } else {
      setIsLocating(false);
      toast({
        title: 'Not Supported',
        description: 'Geolocation is not supported by your browser.',
        variant: 'destructive',
      });
    }
  };

  const openInMaps = () => {
    const lat = parseFloat(latitude) || initialLat;
    const lng = parseFloat(longitude) || initialLng;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-base font-semibold">
          <MapPin className="h-5 w-5 text-primary" />
          Location Details
        </Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openInMaps}
          >
            <Map className="h-4 w-4 mr-2" />
            View Map
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={getCurrentLocation}
            disabled={isLocating}
          >
            <Locate className="h-4 w-4 mr-2" />
            {isLocating ? 'Locating...' : 'Use Current'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude *</Label>
          <Input
            id="latitude"
            type="number"
            step="0.000001"
            placeholder="e.g., 28.6139"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude *</Label>
          <Input
            id="longitude"
            type="number"
            step="0.000001"
            placeholder="e.g., 77.2090"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address / Landmark (Optional)</Label>
        <Input
          id="address"
          placeholder="Enter detailed address or nearby landmark"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Click "Use Current" to auto-fill your location or enter coordinates manually
        </p>
      </div>
    </Card>
  );
};

export default LocationPicker;
