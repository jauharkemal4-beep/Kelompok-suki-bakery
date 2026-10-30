const tombol = document.querySelectorAll(".kategori button");
const produk = document.querySelectorAll(".listproduk");

function pilihKategori(nama) {
    tombol.forEach(function (btn) {
        btn.classList.toggle("aktif", btn.dataset.filter === nama);
    });

    produk.forEach(function (p) {
        p.classList.toggle("sembunyi", p.dataset.kategori !== nama);
    });
}

function kategoriDariAlamat() {
    const params = new URLSearchParams(window.location.search);
    const dariLink = params.get("kategori");
    const ada = Array.from(tombol).some(function (btn) {
        return btn.dataset.filter === dariLink;
    });
    return ada ? dariLink : "roti";
}

// Klik tombol: ubah tampilan, lalu ubah alamat
tombol.forEach(function (btn) {
    btn.addEventListener("click", function () {
        const nama = btn.dataset.filter;
        pilihKategori(nama);
        history.pushState(null, "", "?kategori=" + nama);
    });
});

// Tombol Back/Forward browser: sesuaikan tampilan dengan alamat
window.addEventListener("popstate", function () {
    pilihKategori(kategoriDariAlamat());
});

// Kondisi awal saat halaman dibuka
pilihKategori(kategoriDariAlamat());