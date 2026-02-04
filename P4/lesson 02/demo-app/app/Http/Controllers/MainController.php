<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function home(Request $req)
    {
        $page = e($req->input('page', 'home'));

        try {
            return view($page);
        } catch (Exception $e) {
            return view('home');
        }
    }
}
