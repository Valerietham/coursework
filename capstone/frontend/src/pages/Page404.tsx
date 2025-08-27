import HeaderPostLogin from '../components/HeaderPostLogin';
import Error from '../assets/Error.gif';


export default function Page404() {
  return (
    <>
      <HeaderPostLogin title="Furever" />
      <main className="grid place-items-center bg-white px-6 py-8 sm:py-16 lg:px-8">
  <div className="text-center">
    <img src={Error} alt="Error Loading Cats" className="w-32 h-auto mx-auto sm:w-40 md:w-48" />
    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
      Page not found
    </h1>
    <p className="mt-4 text-base font-medium text-pretty text-gray-500 sm:text-lg md:text-xl">
      Sorry, we couldn't find the page you're looking for.
    </p>
    <div className="mt-6 flex items-center justify-center gap-x-6 sm:mt-8">
      <a
        href="/discover"
        className="rounded-md bg-orange-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
      >
        Go back home
      </a>
    </div>
  </div>
</main>
    </>
  );
}
