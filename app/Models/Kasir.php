<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kasir extends Model
{
    use HasFactory;

    protected $table = 'kasir';

    protected $fillable = [
        'status',
        'idkasir',
        'tgl',
        'masuk',
        'keluar',
        'awal',
        'transaksi',
        'setoran',
        'selisih',
        'tunai',
        'nontunai',
        'donasi'
    ];
}
