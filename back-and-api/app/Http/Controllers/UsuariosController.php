<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsuariosController extends Controller
{
    public function salvarUsuario(Request $request)
    {
        $usuario = $request->only('nome', 'email', 'senha');

        try {
            $novoUsuario = User::create([
                'name' => $usuario['nome'],
                'email' => $usuario['email'],
                'password' => $usuario['senha'],
            ]);
            return response()->json(['message' => 'Usuário cadastrado com sucesso'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao cadastrar usuário'], 500);
        }
    }
}
