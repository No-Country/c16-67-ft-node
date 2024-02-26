import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import styles from './PetContainer.module.css';
import CreatePublicationCard from '../createPublication/CreatePublicationCard';
import { useModalContext } from '../../../context/modalContext';
import Modal from '../../ui/modal/Modal';
import {
  getPublicationsSaved,
  getPublications
} from '../../../service/publications/publicationsService';

export default function PetContainer({ tabActive }) {
  const { modalState, openModal } = useModalContext();
  const [feedData, setFeedData] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isAutocompleteActive, setIsAutocompleteActive] = useState(false);

  const getDataFeed = () => {
    getPublications(tabActive);
  };

  useEffect(() => {
    getPublications(tabActive)
      .then((data) => {
        setFeedData(data);
      })
      .catch(() => {
        openModal({
          description: 'An error has occurred',
          chooseModal: false,
          error: true
        });
      });
  }, [tabActive]);

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = () => {
    getPublicationsSaved()
      .then((data) => {
        setSaved(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {modalState.isOpen && <Modal />}
      <div
        className={`pt-12 md:pt-4 md:max-h-[calc(100vh-112px)] xl:max-h-[calc(100vh-64px)] ${!isAutocompleteActive ? 'overflow-auto' : 'overflow-hidden'} ${styles.scrollbarCustom}`}
      >
        <CreatePublicationCard
          getDataFeed={getDataFeed}
          setIsAutocompleteActive={setIsAutocompleteActive}
        />
        {feedData.map((publication, index) => (
          <PetCard
            key={index}
            postImage={publication.image_url}
            description={publication.description}
            petId={publication.petId}
            postId={publication.postId}
            petName={publication['pets.name']}
            profileImage={publication['pets.image_url']}
            address={publication.address}
            saved={saved.find((savedPublication) => savedPublication.postId === publication.postId)}
            fetchSaved={fetchSaved}
          />
        ))}
      </div>
    </>
  );
}
