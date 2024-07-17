<?php

namespace App\Http\Controllers;

use App\Models\Kasir;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KasirController extends Controller
{
    public function checkUserTransaction()
    {
        $user = Auth::user();
        $today = Carbon::now()->format('Y-m-d');

        $hasTransaction = Kasir::where('idkasir', $user->id)
            ->whereDate('tgl', $today)
            ->exists();

        return response()->json(['hasTransaction' => $hasTransaction]);
    }

    public function setModalAwal(Request $request)
    {
        // Validasi request
        $request->validate([
            'awal' => 'required|numeric|min:0',
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:1',
        ]);

        $credentials = $request->only('username', 'password');

        if ($request->user()->username == $request['username']) {
            if (Auth::attempt($credentials)) {

                $kasir = Kasir::create([
                    'idkasir' => $request->user()->id,
                    'awal' => $request->awal,
                ]);
                $message = 'Data berhasil diinputkan';

                return response()->json(['data' => $kasir, 'message' => $message], 201);
            }
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
