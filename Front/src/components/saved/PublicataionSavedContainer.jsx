import PublicationItemSaved from './PublicationItemSaved';

export default function PublicataionSavedContainer({ publications, fetchPublications }) {
  return (
    <div className="grid grid-cols-2 mt-4 md:mt-12 gap-4 mb-[120px] justify-center xl:grid-cols-3">
      {publications.map((publication) => (
        <PublicationItemSaved
          key={publication.saveId}
          item={publication}
          fetchPublications={fetchPublications}
        />
      ))}
    </div>
  );
}
