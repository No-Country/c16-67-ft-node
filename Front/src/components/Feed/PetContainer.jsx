import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import { getPublications } from "./getPublications";

export default function PetContainer() {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    getPublications().then(data => {
      setFeedData(data);
    }).catch(error => {
      console.error("Error al obtener las publicaciones:", error);
    });
  }, []); 

  return (
    <main>
      {feedData.map((publication, index) => (
        <PetCard 
        key={index} 
        postImage={publication.image_url}
        description={publication.description}
        petId={publication.petId}
        postId={publication.postId}
        />
      ))}
    </main>
  );
}
