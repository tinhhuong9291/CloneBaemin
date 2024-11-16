import Image from 'next/image';
import { GoogleLogo } from '@/components/Icons';
import LoginForm from '@/components/Form/LoginForm';

const SignInPage = () => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100 py-4 text-gray-900">
      <div className="m-0 mt-2 flex max-h-[90vh] max-w-screen-xl flex-1 justify-center bg-white shadow sm:m-10 sm:rounded-lg">
        <div className="p-5 sm:p-11 lg:w-1/2 xl:w-5/12">
          <div>
            <Image
              src="/svg/baemin-logo.svg"
              alt="logo"
              width={150}
              height={150}
              className="h-10"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h2 className="order-1 text-2xl font-extrabold xl:text-3xl">
              Sign In
            </h2>
            <div className="order-3 mt-6 w-full flex-1">
              <div className="flex flex-col items-center">
                <button className="focus:shadow-outline flex w-full max-w-xs cursor-not-allowed items-center justify-center rounded-lg bg-indigo-100 py-3 font-bold text-gray-800 opacity-55 shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none">
                  <div className="p cursor-not-allowed rounded-full bg-white">
                    <GoogleLogo />
                  </div>
                  <span className="ml-4 cursor-not-allowed">
                    Sign In with Google{' '}
                    {/* <span className="text-xs italic text-gray-500">
                      (updating...)
                    </span> */}
                  </span>
                </button>
              </div>

              <div className="my-7 border-b text-center">
                <div className="inline-block translate-y-1/2 transform bg-white px-2 text-sm font-medium leading-none tracking-wide text-gray-600">
                  Or sign in with e-mail
                </div>
              </div>

              {/* Login Form */}
              <LoginForm />
              {/*  */}
            </div>
          </div>
        </div>
        <div className="hidden flex-1 bg-indigo-100 text-center lg:flex">
          <div
            className="m-12 w-full bg-cover bg-center bg-no-repeat"
            style={{
              background:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
