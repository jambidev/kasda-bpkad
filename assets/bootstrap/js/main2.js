    //Script rupiah Untuk Tiap Form Input
    var belanjaa = document.getElementById("belanjaa");
    belanjaa.addEventListener("keyup", function (e) {
        // tambahkan 'Rp.' pada saat form di ketik
        // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
        belanjaa.value = formatRupiah(this.value, "Rp. ");
    });

    /* Fungsi formatRupiah */
    function formatRupiah(angka, prefix) {
        var number_string = angka.replace(/[^,\d]/g, "").toString(),
            split = number_string.split(","),
            sisa = split[0].length % 3,
            belanjaa = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            separator = sisa ? "." : "";
            belanjaa += separator + ribuan.join(".");
        }

        belanjaa = split[1] != undefined ? belanjaa + "," + split[1] : belanjaa;
        return prefix == undefined ? belanjaa : belanjaa ? "Rp. " + belanjaa : "";
}

//jumlah belanja
    //Script rupiah Untuk Tiap Form Input
    var jumlahBelanja = document.getElementById("jumlahBelanja");
    jumlahBelanja.addEventListener("keyup", function (e) {
        // tambahkan 'Rp.' pada saat form di ketik
        // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
        jumlahBelanja.value = formatRupiah(this.value, "Rp. ");
    });

    /* Fungsi formatRupiah */
    function formatRupiah(angka, prefix) {
        var number_string = angka.replace(/[^,\d]/g, "").toString(),
            split = number_string.split(","),
            sisa = split[0].length % 3,
            jumlahBelanja = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            separator = sisa ? "." : "";
            jumlahBelanja += separator + ribuan.join(".");
        }

        jumlahBelanja = split[1] != undefined ? jumlahBelanja + "," + split[1] : jumlahBelanja;
        return prefix == undefined ? jumlahBelanja : jumlahBelanja ? "Rp. " + jumlahBelanja : "";
    }
