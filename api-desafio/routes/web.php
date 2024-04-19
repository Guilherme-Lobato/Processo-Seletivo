<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProdutosController;

Route::post('/cadastrar-usuario', [UsuariosController::class, 'salvarUsuario']);

Route::get('/login', [AuthController::class, 'login']);

Route::post('/salvar-produtos', [ProdutosController::class, 'salvarProdutos']);

