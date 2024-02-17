import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import { getPublications } from './getPublications';

export default function PetContainer() {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    getPublications()
      .then((data) => {
        setFeedData(data);
      })
      .catch((error) => {
        console.error('Error al obtener las publicaciones:', error);
      });
  }, []);

  return (
    <div className="pt-12 md:pt-4 md:max-h-[calc(100vh-112px)] xl:max-h-[calc(100vh-64px)] overflow-auto">
      {feedData.map((publication, index) => (
        <PetCard
          key={index}
          postImage={publication.image_url}
          description={publication.description}
          petId={publication.petId}
          postId={publication.postId}
          petName={publication['pets.name']}
          profileImage={publication['pets.image_url']}
        />
      ))}
    </div>
  );
}
