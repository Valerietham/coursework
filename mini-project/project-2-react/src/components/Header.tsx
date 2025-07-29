interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-stone-500 shadow-sm py-2 px-4 flex-shrink-0">
      <h1 className="text-xl text-white font-semibold text-left text-gray-800">
        {title}
      </h1>
    </header>
  );
};

export default Header;
