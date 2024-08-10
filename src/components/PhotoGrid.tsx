import React, { useEffect, useState } from "react";
import axios from "axios";

const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [displayPhotos, setDisplayPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: { count: 27 }, // Fetch 27 photos in every request
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );
      setPhotos(
        response.data.map(
          (photo: { urls: { small: string } }) => photo.urls.small
        )
      );
    } catch (error) {
      setError("Error fetching photos");
      console.error("Error fetching photos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Display 9 out of 27 photos by random
  useEffect(() => {
    const getRandomPhotos = () => {
      if (photos.length === 0) return [];
      const shuffled = [...photos].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    const interval = setInterval(() => {
      setDisplayPhotos(getRandomPhotos());
    }, 10000); // Update photos every 10 seconds

    setDisplayPhotos(getRandomPhotos());

    return () => clearInterval(interval);
  }, [photos]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="photo-grid">
      {displayPhotos.map((photo, index) => (
        <img key={index} src={photo} alt={`photo-${index}`} />
      ))}
    </div>
  );
};

export default PhotoGrid;
