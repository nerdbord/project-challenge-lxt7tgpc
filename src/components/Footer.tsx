const Footer = () => {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Created by{" "}
        <a
          href="https://github.com/filwas"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          fwas
        </a> &         <a
          href="https://github.com/Wiecek-K"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Ajmag
        </a>
      </p>
    </footer>
  );
};

export default Footer;
