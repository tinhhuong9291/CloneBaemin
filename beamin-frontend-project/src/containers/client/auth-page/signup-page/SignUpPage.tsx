import SignUpForm from '@/components/Form/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex h-screen justify-center bg-gray-100 px-4 text-gray-900">
      <div className="m-0 mt-2 flex max-h-[90vh] max-w-screen-xl flex-1 justify-center bg-white shadow sm:m-10 sm:rounded-lg">
        <div className="p-5 sm:p-11 lg:w-1/2 xl:w-5/12">
          <div className="mt-12 flex flex-col items-center">
            <h2 className="order-1 text-2xl font-extrabold xl:text-3xl">
              Sign Up
            </h2>
            <div className="order-3 mt-6 w-full flex-1">
              <div className="flex flex-col items-center"></div>

              {/* Sign Up Form */}
              <SignUpForm />
              {/*  */}
            </div>
          </div>
        </div>
        <div className="hidden flex-1 bg-indigo-100 text-center lg:flex">
          <div
            className="m-12 w-full bg-contain bg-center bg-no-repeat xl:m-16"
            style={{
              background:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
