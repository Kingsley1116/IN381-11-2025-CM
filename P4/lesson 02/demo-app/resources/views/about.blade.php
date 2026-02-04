{{-- resources/views/about.blade.php --}}
@extends('app')

@section('title', @section('title', request()->input('page')))

@section('content')
<h2>About Page Content</h2>
<p>This is the main content of the about page.</p>
@endsection

@section('scripts')
@endsection