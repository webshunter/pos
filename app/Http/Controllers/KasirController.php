<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
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

        $hasModalAwal = Kasir::where('idkasir', $user->id)
            ->whereDate('tgl', $today)
            ->exists();
        
        if ($hasModalAwal) {
            $TutupKasir = Kasir::where('idkasir', $user->id)
                ->whereDate('tgl', $today)
                ->where('setoran', '>', 0)
                ->exists();

            $status = $TutupKasir ? '2' : '1';
        } else {
            $status = '0';
        }

        return response()->json(['hasTransaction' => $status]);
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
                    'tgl' => Carbon::now()->format('Y-m-d'),
                ]);
                $message = 'Data berhasil diinputkan';

                return response()->json(['data' => $kasir, 'message' => $message], 201);
            }
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function setTutupKasir(Request $request)
    {
        // Validasi request
        $request->validate([
            'setoran' => 'required|numeric|min:0',
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:1',
        ]);

        $credentials = $request->only('username', 'password');

        if ($request->user()->username == $request['username']) {
            if (Auth::attempt($credentials)) {

                $totalAmount = Invoice::where('user_id', $request->user()->id)
                    ->whereDate('created_at', Carbon::now()->format('Y-m-d'))
                    ->sum('total_amount');

                $tunai = Invoice::where('user_id', $request->user()->id)
                    ->whereDate('created_at', Carbon::now()->format('Y-m-d'))
                    ->sum('cash');

                $kasir = Kasir::where('idkasir', $request->user()->id)
                    ->where('tgl', Carbon::now()->format('Y-m-d'))
                    ->update([
                        'setoran' => $request->setoran,
                        'transaksi' => $totalAmount,
                        'selisih' => $request->setoran - $totalAmount,
                        'tunai' => $tunai,
                    ]);

                if (!$kasir) {
                    return response()->json(['error' => 'Record not found'], 404);
                }

                $message = 'Data berhasil diinputkan';

                return response()->json(['message' => $message], 201);
            }
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
