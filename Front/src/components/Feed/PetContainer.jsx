import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import { getPublications } from './getPublications';
import styles from './PetContainer.module.css';

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
    <div
      className={`pt-12 md:pt-4 md:max-h-[calc(100vh-112px)] xl:max-h-[calc(100vh-64px)] overflow-auto ${styles.scrollbarCustom}`}
    >
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
