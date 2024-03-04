/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useNavigateContext } from '../context/navigationContext';
import { getPublicationsSaved } from '../service/publications/publicationsService';
import PublicataionSavedContainer from '../components/saved/PublicataionSavedContainer';
import backIcon from '../assets/images/back.svg';
import { NavLink } from 'react-router-dom';

export default function Saved() {
  const { setActive } = useNavigateContext();

  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = () => {
    setActive('saved');
    getPublicationsSaved()
      .then((response) => {
        console.log(response[0]);
        setPublications(response.filter((publication) => publication.status === true));
      })
      .catch((e) => console.error(e));
  };

  return (
    <main>
      <div className="px-4 2xl:px-0 md:mx-auto max-w-[768px]">
        <div className="flex  items-center gap-x-2">
          <NavLink to={'/menu'}>
            <img src={backIcon} className="w-6 h-6 cursor-pointer md:hidden" alt="Back icon" />
          </NavLink>
          <h1 className="pt-4 md:pt-12 text-headline-sm mb-4">Saved posts</h1>
        </div>
        {publications.length > 0 ? (
          <PublicataionSavedContainer
            publications={publications}
            fetchPublications={fetchPublications}
          />
        ) : (
          <>
            <h2 className="text-center w-full mt-16 text-title-md">
              You don't have any saved posts
            </h2>
          </>
        )}
      </div>
    </main>
  );
}
