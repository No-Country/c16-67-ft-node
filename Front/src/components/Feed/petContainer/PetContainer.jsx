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
  const { modalTextState, openModal } = useModalContext();
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
      {modalTextState.isOpen && <Modal />}
      <div
        className={`pt-12 md:pt-4 md:max-h-[calc(100vh-112px)] xl:max-h-[calc(100vh-64px)] overflow-x-hidden ${!isAutocompleteActive ? 'overflow-y-auto' : 'overflow-hidden'} ${styles.scrollbarCustom}`}
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
            type={publication.type}
            petName={publication['pets.name']}
            profileImage={publication['pets.image_url']}
            reactionsCount={publication.reactionsCount}
            address={publication.address}
            saved={saved.find((savedPublication) => savedPublication.postId === publication.postId)}
            fetchSaved={fetchSaved}
            tabActive={tabActive}
          />
        ))}
      </div>
    </>
  );
}
