<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

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

            Log::info('Usuário criado com ID: ' . $novoUsuario->id);

            return response()->json(['message' => 'Usuário cadastrado com sucesso'], 201);
        } catch (\Exception $e) {
            Log::error('Erro ao cadastrar usuário: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao cadastrar usuário'], 500);
        }
    }
}
