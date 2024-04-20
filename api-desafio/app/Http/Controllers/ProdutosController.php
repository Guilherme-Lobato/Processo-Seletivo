<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Product;

class ProdutosController extends Controller
{
    public function salvarProdutos(Request $request)
    {
        $produtos = $request->input('produtos');

        foreach ($produtos as $produto) {
            $produtoCriado = Product::create([
                'title' => $produto['title'],
                'price' => $produto['price'],
                'description' => $produto['description'],
                'image' => $produto['image'],
                'category' => $produto['category'],
            ]);
        }

        return response()->json(['message' => 'Produtos importados com sucesso'], 200);
    }
}
