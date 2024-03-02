import logo from '../../../assets/images/isologo.svg';

export default function Footer() {
  return (
    <footer className="w-full h-72 bg-whiteSmoke rounded-2xl p-6 pb-12 flex flex-col justify-between border shadow-md mb-2">
      <div className="flex flex-col w-full items-center  gap-y-4">
        <img className="w-32" src={logo} alt="logo" />
        <p className="text-title-md opacity-50">By petdevs</p>
      </div>
      <div className="flex flex-col">
        <p className="text-title-md mb-4">CONTACT US</p>
        <a
          className="text-primary-600 mb-6 font-bold"
          href="mailto:petgramdevelopers@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          petgramdevelopers@gmail.com
        </a>
        <a
          className="text-primary-600 font-bold"
          href="https://github.com/No-Country/c16-67-ft-node"
          target="_blank"
          rel="noreferrer"
        >
          Our github repository
        </a>
      </div>
    </footer>
  );
}
