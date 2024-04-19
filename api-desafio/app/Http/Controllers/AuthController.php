<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('name', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json(['message' => 'Login bem-sucedido', 'user' => Auth::user()]);
        }

        return response()->json(['error' => 'Nome de usuário ou senha inválidos'], 401);
    }
}
