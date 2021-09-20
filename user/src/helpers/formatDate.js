export default function convertDate(fullDate) {
  var tahun = new Date(fullDate).getFullYear();
  var bulan = new Date(fullDate).getMonth();
  var hari = new Date(fullDate).getDay();
  var tanggal = new Date(fullDate).getDate();

  switch (hari) {
    case 0:
      hari = "Minggu";
      break;
    case 1:
      hari = "Senin";
      break;
    case 2:
      hari = "Selasa";
      break;
    case 3:
      hari = "Rabu";
      break;
    case 4:
      hari = "Kamis";
      break;
    case 5:
      hari = "Jum'at";
      break;
    case 6:
      hari = "Sabtu";
      break;
  }

  switch (bulan) {
    case 0:
      bulan = "Januari";
      break;
    case 1:
      bulan = "Februari";
      break;
    case 2:
      bulan = "Maret";
      break;
    case 3:
      bulan = "April";
      break;
    case 4:
      bulan = "Mei";
      break;
    case 5:
      bulan = "Juni";
      break;
    case 6:
      bulan = "Juli";
      break;
    case 7:
      bulan = "Agustus";
      break;
    case 8:
      bulan = "September";
      break;
    case 9:
      bulan = "Oktober";
      break;
    case 10:
      bulan = "November";
      break;
    case 11:
      bulan = "Desember";
      break;
  }
  return `${hari}, ${tanggal} ${bulan} ${tahun}`;

  //   let bulanIndo = [
  //     "",
  //     "Januari",
  //     "Februari",
  //     "Maret",
  //     "April",
  //     "Mei",
  //     "Juni",
  //     "Juli",
  //     "Agustus",
  //     "September",
  //     "Oktober",
  //     "November",
  //     "Desember",
  //   ];
  //   let tanggal = string.split(" ")[0];
  //   let bulan = bulanIndo.indexOf(string.split(" ")[1]);
  //   if (parseInt(bulan) < 10) {
  //     bulan = "0" + bulan;
  //   }
  //   tahun = string.split(" ")[2];
  //   return tahun + "-" + bulan + "-" + tanggal;
}
