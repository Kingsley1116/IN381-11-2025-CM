{{-- resources/views/Contact.blade.php --}}
@extends('app')

@section('title', request()->input('page'))

@section('content')
@if(request()->isMethod('POST'))
@isset(request()->name, request()->email, request()->message)
<h1>YOUR INFO:</h1>
<h3>Name: {{ request()->input('name') }}</h3>
<h3>Email: {{ request()->input('email') }}</h3>
<h3>Message: {{ request()->input('message') }}</h3>
@endisset
@else
<form action="{{ url('?page=Contact') }}" method="POST">
    @csrf
    <span>Name: </span><input type="text" name="name" value="{{ old('name') }}" required />
    <br />
    <span>Email: </span><input type="email" name="email" value="{{ old('email') }}" required />
    <br />
    <span>Message: </span><input type="text" name="message" value="{{ old('message') }}" required />
    <br />
    <input type="submit" value="Submit">
</form>
@endif
@endsection

@section('scripts')
@endsection