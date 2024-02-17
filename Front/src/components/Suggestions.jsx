import logo from '../../public/assets/images/isologo.svg';
const perfil =
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Item = () => {
  return (
    <div className="flex py-4 gap-x-2">
      <img src={perfil} alt="image of another pet" className="w-12 h-12 rounded-full" />
      <div>
        <p>{"Pet's name"}</p>
        <p>{"@pet's name"}</p>
      </div>
    </div>
  );
};

export default function Suggestions() {
  return (
    <div className="hidden xl:block xl:p-4 xl:flex-grow xl:basis-0">
      <img src={logo} className="w-full h-12" alt="logo" />
      <div className="flex mt-6 gap-x-1 justify-between">
        <p>Suggestions for you</p>
        <p className="font-bold">See all</p>
      </div>
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
}
