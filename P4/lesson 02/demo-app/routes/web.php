<?php

use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;

Route::any('/', [MainController::class, 'home']);
