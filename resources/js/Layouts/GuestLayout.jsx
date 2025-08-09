export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex gap-x-20 items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div
                className="hidden md:block w-[450px] h-[450px] bg-no-repeat bg-center bg-contain"
                style={{
                    backgroundImage: "url('/images/ilustrasiLogin.svg')",
                }}
            ></div>
            <div className="mx-auto md:mx-0 md:w-[450px] w-1/2">
                <h1 className="text-lg text-gray-400 text-center mb-6">
                    Enter your Username and Password
                </h1>
                <div className="item-center justify-center mx-auto mt-6 w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
