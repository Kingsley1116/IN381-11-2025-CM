{{-- resources/views/news.blade.php --}}
@extends('app')

@section('title', @section('title', request()->input('page')))

@section('content')
<h2>News Page Content</h2>
<p>This is the main content of the news page.</p>
@endsection

@section('scripts')
@endsection