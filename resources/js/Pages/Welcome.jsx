import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function Welcome() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div>
            <Head title="Home" />
            {user ? (
                <h1>Welcome back, {user.name}</h1>
            ) : (
                <h1>Welcome, Guest!</h1>
            )}
            <div>hello</div>
        </div>
    );
}
