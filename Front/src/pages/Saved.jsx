import React, { useEffect, useState } from 'react';
import { useNavigateContext } from '../context/navigationContext';
import { getPublicationsSaved } from '../service/publications/publicationsService';
import PublicataionSavedContainer from '../components/saved/PublicataionSavedContainer';

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
      <div className="mx-4 md:mx-auto max-w-[768px]">
        <h1 className="pt-12 text-headline-sm mb-4">Saved posts</h1>
        <PublicataionSavedContainer
          publications={publications}
          fetchPublications={fetchPublications}
        />
      </div>
    </main>
  );
}
