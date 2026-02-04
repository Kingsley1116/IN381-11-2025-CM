{{-- resources/views/app.blade.php --}}
<!DOCTYPE html>
<html>

<head>
    @vite(['resources/css/style.css'])
    <title>Demo - @yield('title')</title>
</head>

<body>
    <nav>
        <ul>
            <li><a href="{{ url('') }}">Home</a></li>
            <li><a href="{{ url('') }}?page=About">About</a></li>
            <li><a href="{{ url('') }}?page=News">News</a></li>
            <li><a href="{{ url('') }}?page=Contact">Contact</a></li>
        </ul>
    </nav>

    <div class="container">
        @yield('content')
    </div>

    @yield('scripts')
</body>

</html>