<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKasirTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kasir', function (Blueprint $table) {
            $table->id();
            $table->char('status', 1)->default('0');
            $table->string('idkasir', 15);
            $table->date('tgl')->default(now());
            $table->dateTime('masuk')->nullable();
            $table->dateTime('keluar')->nullable();
            $table->double('awal', 12, 2)->default(0.00);
            $table->double('transaksi', 12, 2)->default(0.00);
            $table->double('setoran', 12, 2)->default(0.00);
            $table->double('selisih', 12, 2)->default(0.00);
            $table->double('tunai', 12, 2)->default(0.00);
            $table->double('nontunai', 12, 2)->default(0.00);
            $table->double('donasi', 12, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kasir');
    }
}
