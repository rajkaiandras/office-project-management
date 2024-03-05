import { Logo } from '../UIElements/Logo';

export const MainFooter = () => {
  return (
    <footer className="col-span-12 row-start-3 row-end-4 w-full max-w-7xl h-[160px] p-4 mx-auto flex flex-col gap-y-4 justify-center items-center">
      <Logo center={true} />

      <small>
        developed by{' '}
        <a
          className="text-blue-500"
          href="https://www.linkedin.com/in/andrasrajkai"
          target="_blank"
          rel="noreferrer"
        >
          András Rajkai
        </a>
      </small>
    </footer>
  );
};
