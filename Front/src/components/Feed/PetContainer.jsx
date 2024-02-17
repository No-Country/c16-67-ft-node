import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import { getPublications } from './getPublications';

export default function PetContainer({ tabActive }) {
  const [feedData, setFeedData] = useState([]);
  //console.log(tabActive);

  useEffect(() => {
    setFeedData([]);
    getPublications(tabActive)
      .then((data) => {
        setFeedData((feedDataPrev) => [...feedDataPrev, ...data]);
      })
      .catch((error) => {
        console.error('Error al obtener las publicaciones:', error);
      });
  }, [tabActive]);

  return (
    <main className="pb-20">
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
    </main>
  );
}
