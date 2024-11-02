export const convertToRupiah = function (value) {
    if (!value) return "Rp0"; // Menangani kasus nilai null atau undefined
    const rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Menghapus koma dan dua digit desimal
        maximumFractionDigits: 0,
    }).format(value);
    return rupiah;
}
