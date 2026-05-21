import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map centering
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);
  return null;
};

const MapPicker = ({ lat, lng, onChange }) => {
  const [position, setPosition] = useState(lat && lng ? [lat, lng] : [-5.9392, -77.3114]); // Default Nueva Cajamarca
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent main form from submitting
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      // Use free Nominatim API from OpenStreetMap
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ', Nueva Cajamarca, Peru')}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const newLat = parseFloat(data[0].lat);
        const newLng = parseFloat(data[0].lon);
        setPosition([newLat, newLng]);
        onChange(newLat, newLng);
      } else {
        alert('No se encontró la dirección. Intenta con una referencia más clara.');
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    } finally {
      setSearching(false);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onChange(e.latlng.lat, e.latlng.lng);
      },
    });

    return position === null ? null : (
      <Marker position={position}></Marker>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative group">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              handleSearch(e);
            }
          }}
          placeholder="Buscar calle, barrio o lugar en Nueva Cajamarca..."
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-24 text-sm font-bold focus:bg-white focus:border-primary-500 transition-all outline-none"
        />
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary-600 transition-colors" />
        <button 
          type="button"
          onClick={handleSearch}
          disabled={searching}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1.5 rounded-xl text-xs font-black hover:bg-primary-700 transition-all shadow-md shadow-primary-200 disabled:opacity-50"
        >
          {searching ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Map Container */}
      <div className="h-72 w-full rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-inner relative z-10">
        <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={position} />
          <LocationMarker />
        </MapContainer>
      </div>
      <p className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-widest flex items-center">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
        También puedes hacer clic en el mapa para ubicar el inmueble
      </p>
    </div>
  );
};

export default MapPicker;
