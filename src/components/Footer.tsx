const Footer = () => {
  return (
    <footer className="border-t-foreground/10 fixed bottom-0 left-0 flex w-full justify-center border-t bg-inherit p-4 text-center text-xs">
      <p>
        Created by
        <a
          href="https://github.com/filwas"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          fwas
        </a>
        &
        <a
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
