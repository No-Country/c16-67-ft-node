import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 z-50 bg-white border-t-2 border-slate-200 w-full h-20">
      <ul className="flex relative h-full">
        <li className="flex-grow flex-basis-0 flex h-full items-center justify-center">
          <NavLink to={"/"}>
            <span>Feed</span>
          </NavLink>
          </li>
        <li className="flex-grow flex-basis-0 flex h-full items-center justify-center">Search</li>
        <li className="absolute right-1/2 translate-x-1/2 top-[-28px] p-2 bg-white rounded-full border-t-2 border-slate-200">
          <NavLink to={"/publication-create"}>
            <span className="material-symbols-outlined text-4xl">add</span>
          </NavLink>
        </li>
        <li className="flex-grow flex-basis-0 flex h-full items-center justify-center">Profile</li>
        <li className="flex-grow flex-basis-0 flex h-full items-center justify-center">More</li>
      </ul>
    </nav>
  );
}
