import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex-col flex font-mono md:font-mono h-[96vh] justify-center">
      <div className=" bg-center bg-no-repeat bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)]">
        <h1 className="text-center m-0 p-0 text-[80px]">404</h1>
        <div className="flex flex-col mt-72 w-full items-center">
          <h3 className="text-center text-xl md:text-3xl font-bold">
            Look like you're lost
          </h3>

          <p className="text-center text-sm md:text-xl font-normal text-gray-600">
            the page you are looking for not avaible!
          </p>

          <Link
            to="/"
            className="flex justify-center rounded-md bg-primary mt-5 px-5 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
