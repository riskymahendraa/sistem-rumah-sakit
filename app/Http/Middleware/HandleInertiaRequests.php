<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
        'flash' => [
            'success' => fn () => $request->session()->get('success'),
        ],
        'errors' => function () use ($request) {
            return $request->session()->get('errors')
                ? $request->session()->get('errors')->getBag('default')->toArray()
                : (object) [];
        },
    ]);
    }
}
