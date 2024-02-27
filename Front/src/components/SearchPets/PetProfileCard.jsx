export const PetProfileCard = ({ name, image, altText = 'pet image' }) => {
  return (
    <section>
      <span>{name}</span>
      <img src={image} alt={altText} />
    </section>
  );
};
