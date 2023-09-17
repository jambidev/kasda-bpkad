$(document).ready(function () {
  setTimeout(function(){ swalLoading('close'); },50);
  window.onbeforeunload = function (e){ swalLoading('show'); }
});

function swalLoading(aksi='show') {
  if (aksi=='close') {
    swal.close();
    if ( $.isFunction($.fn.stopNotif) ) { startNotif(); }
  }else {
    if ($('.swal2-backdrop-show').length) { return true; }
    if ( $.isFunction($.fn.stopNotif) ) { stopNotif(); }
    return swal.fire({
          html: '<b style="color:#f1f1f1">Mohon tunggu . . .</b>',
          showConfirmButton: false, allowOutsideClick: false, allowEscapeKey:false,
          background: 'transparent', didOpen: () => { swal.showLoading() }
        });
  }
}

function swalResponse(res_alert='', res_msg='', showBtn=false, dTimeOut=3000) {
  if (res_msg=='Session Expired!') {
    if ( $.isFunction($.fn.stopNotif) ) { stopNotif(); }
    swal.fire({
            icon: res_alert, title: res_msg, html: 'Silahkan login kembali',
            showConfirmButton: false, allowOutsideClick: false,
            allowEscapeKey:false, timer: dTimeOut,
          });
    setTimeout(function(){
      window.location.reload();
    }, 2500);
  }else {
    if ( $.isFunction($.fn.stopNotif) ) { startNotif(); }
    if (res_alert=='success') {
      if (showBtn) {
        return swal.fire( "Success!", res_msg, res_alert );
      }else {
        return swal.fire({
                icon: res_alert, title: "Success!", html: res_msg,
                showConfirmButton: false, allowOutsideClick: false,
                allowEscapeKey:false, timer: dTimeOut,
              });
      }
    }else {
      if (showBtn) {
        return swal.fire({
          icon: res_alert, title: "Oops!", html: res_msg,
          showConfirmButton: false, allowOutsideClick: false,
          allowEscapeKey:false, timer: dTimeOut,
        });
      }else {
        return swal.fire( "Oops!", res_msg, res_alert );
      }
    }
  }
}

function handleAjaxError(xhr, textStatus, error) {
    if (xhr.responseText=='Permission Denied!!') {
      swalResponse('warning', xhr.responseText);
      setTimeout(function(){
        window.location.reload();
      }, 3000);
    }else
    if (textStatus === 'timeout') {
      swalResponse('error', 'Server terlalu lama mengirim data. Silahkan coba lagi!');
    }else {
      swalResponse('error', 'Terjadi kesalahan pada server. Silakan coba dalam beberapa menit lagi!');
    }
    console.log(xhr.responseText);
    console.log(error);
}

function inputBelanja() {
  var nilai = $("#belanjaa").val();
  nilaiRp = get_formatRupiah(nilai.toString(), 'Rp.');
  $("#belanjaa").val(nilaiRp);
  $("#rupiahh").val(nilaiRp);
}

function inputRupiahh() {
  formatRupiahId('rupiahh');
}

function inputJumlahBelanja() {
  formatRupiahId('jumlahBelanja');
}

// Format Rp by id
function formatRupiahId(tagId='')
{
  if (tagId!='' && $("#"+tagId).length) {
    var nilai = $("#"+tagId).val();
    nilaiRp = get_formatRupiah(nilai.toString(), 'Rp. ');
    $("#"+tagId).val(nilaiRp);
  }
}

// Format Rp by Name
function formatRupiah(val='', rp='')
{
  if (val!='') {
    tag = $('[name="'+val+'"]');
    if (tag.length!=0) {
      get = get_formatRupiah(tag.val(), rp);
      tag.val(get);
    }
  }
}
//Fungsi formatRupiah
function get_formatRupiah(angka=0, prefix=''){
  var number_string = angka.replace(/[^,\d]/g, '').toString(),
  split   = number_string.split(','),
  sisa    = split[0].length % 3,
  rupiah  = split[0].substr(0, sisa),
  ribuan  = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if(ribuan){
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : (rupiah ? prefix + rupiah : '');
}

function hanyaAngka(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

function form_disabled(namenya='',ket='',stt='')
{
  if (stt=='all') {
    $("#"+namenya+" *").prop("disabled", ket);
  }else {
    $('[name="'+namenya+'"]').attr('disabled', ket);
  }
}

$(function () {
  $('#myButton').floatingWhatsApp({
    phone: '+62895639389649',
    popupMessage: 'Selamat Datang Kakak, Apa Ada yang bisa Saya Bantu?',
    message: "Saya Ingin Bertanya",
    showPopup: true,
    showOnIE: false,
    headerTitle: 'BPKAD KOTA JAMBI',
    headerColor: 'blue',
    backgroundColor: '',
    buttonImage: '<img src="assets/img/logo-wa-whatsapp.png" />'
  });
});

var kodeAkunBelanja=[];
var kodeAkun=[];
var jenisPajak=[];
$(document).ready(function () {
  var tblKode = 'https://docs.google.com/spreadsheets/d/1PDMwop2Xjajjwytn2sJe3hJEOv8TmkO4_GZxrBOziN8/edit#gid=0';
  var tblSKPD = 'https://docs.google.com/spreadsheets/d/1PDMwop2Xjajjwytn2sJe3hJEOv8TmkO4_GZxrBOziN8/edit#gid=1816350231';
  // Load an entire worksheet.
  $('#listKode').sheetrock({
    url: tblKode,
    query: "select B,C,D",
    /* options */
    callback: function (error, options, response) {
      // console.log(error, options, response);
      optKodeAkunBelanja = $('#kode_akun_belanja');
      optKodeAkunBelanja.html('<option value="">Pilih KODE AKUN BELANJA</option>');
      $.each(response.rows, function(index, loaddata) {
        if (index!=0) {
          datanya = loaddata.cellsArray;
          // console.log(datanya);
          if (jQuery.inArray(datanya[0], kodeAkunBelanja) === -1) {
            optKodeAkunBelanja.append(`<option value="${datanya[0]}">${datanya[0]}</option>`);
            kodeAkunBelanja.push(datanya[0]);
          }
          if (jQuery.inArray(datanya[1], kodeAkun) === -1) {
            kodeAkun.push([datanya[0], datanya[1]]);
          }
          if (jQuery.inArray(datanya[2], jenisPajak) === -1) {
            jenisPajak.push([datanya[0], datanya[1], datanya[2]]);
          }
        }
      });
    }
  });
  $('#listSKPD').sheetrock({
    url: tblSKPD,
    query: "select B,C,D,E,F",
    /* options */
    callback: function (error, options, response) {
      // console.log(error, options, response);
      optKetSKPD = $('#ket');
      optKetSKPD.html('<option value="">Pilih NAMA SKPD</option>');
      optPrintSKPD = $('#p_skpd');
      optPrintSKPD.html('<option value="">SEMUA SKPD</option>');
      $.each(response.rows, function(index, loaddata) {
        if (index!=0) {
          datanya = loaddata.cellsArray;
          optKetSKPD.append(`<option value="${datanya[0]}" data-npwp_bendahara="${datanya[1]}" data-npwp_skpd="${datanya[2]}" data-nama_bendahara="${datanya[3]}" data-nip_bendahara="${datanya[4]}">${datanya[0]}</option>`);
          optPrintSKPD.append(`<option value="${datanya[0]}" data-npwp_bendahara="${datanya[1]}" data-npwp_skpd="${datanya[2]}" data-nama_bendahara="${datanya[3]}" data-nip_bendahara="${datanya[4]}">${datanya[0]}</option>`);
        }
      });
    }
  });
});

function showKodeAkun() {
  optKodeAkun = $('#kode_akun');
  optKodeAkun.html('<option value="">Pilih KODE AKUN</option>');
  kode_akun_belanja = $('#kode_akun_belanja :selected').val();
  $.each(kodeAkun, function(index, loaddata) {
    if (loaddata[0]==kode_akun_belanja) {
      optKodeAkun.append(`<option value="${loaddata[1]}">${loaddata[1]}</option>`);
    }
  });
  $('#jenis_pajak').html('');
}

function showJenisPajak() {
  optJenisPajak = $('#jenis_pajak');
  optJenisPajak.html('<option value="">Pilih JENIS PAJAK</option>');
  kode_akun_belanja = $('#kode_akun_belanja :selected').val();
  kode_akun = $('#kode_akun :selected').val();
  $.each(jenisPajak, function(index, loaddata) {
    if (loaddata[0]==kode_akun_belanja && loaddata[1]==kode_akun) {
      optJenisPajak.append(`<option value="${loaddata[2]}">${loaddata[2]}</option>`);
    }
  });
}

function showNPWP() {
  ket = $('#ket :selected');
  $('#npwp_bendahara').val(ket.data('npwp_bendahara'));
  $('#nama_bendahara').val(ket.data('nama_bendahara'));
  $('#nip_bendahara').val(ket.data('nip_bendahara'));
  $('#npwp_skpd').val(ket.data('npwp_skpd'));
}

function onSubmit()
{
  form = 'form-submit';
  var fd = new FormData();
  $('#'+form+' *').each(function(key, field) {
    var field_name = field.name;
    var field_type = field.type;
    if ($('[name="'+field_name+'"]').length!=0) {
      if ($('[name="'+field_name+'"] required').val() == '') {
        form_disabled(form, false, 'all');
        return false;
      }
      if ($('select[name="'+field_name+'"]').length!=0) {
        sel =  $('[name="'+field_name+'"] :selected').val();
        fd.append(field_name, sel);
      }else {
        if ($('[name="'+field_name+'"]').attr('inputmode')==='numeric') {
          val = $('[name="'+field_name+'"]').val().replace(/[^0-9]/g, '');
        }else {
          val = $('[name="'+field_name+'"]').val();
        }
        fd.append(field_name, val);
      }
    }
  });

  Swal.fire({
    title: 'Apakah Anda yakin ?',
    html: 'Pastikan data yang diisi sudah benar & sesuai',
    icon: 'info',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonText: `Yakin`,
    cancelButtonText: `Cek Lagi`,
  }).then((result) => {
    if (result.isConfirmed) {
      form_disabled(form, true, 'all');
      url = 'https://script.google.com/macros/s/AKfycbyW8tmcabiju9OWVTWNthbAzV16Sf26a5VsBljQodL973u3WPPvHc7jRwBU3bLiAiXf_Q/exec';
      swalLoading();
      $.ajax({
        type: "POST",
        url : url,
        data: fd,
        dataType: "json",
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
        beforeSend: function(){ },
        success: function( data ) {
          if (data.result=='success') {
            swalResponse('success', 'Data berhasil dikirim');
            setTimeout(function(){
              window.location.reload();
            }, 2500);
          }else {
            if (data.message) {
              get_pesan = data.message;
            }else {
              get_pesan = 'Failed! There was an error, please try again!';
            }
            swalResponse('warning', get_pesan);
            form_disabled(form, false, 'all');
          }
        },
        error: function(){
          swalResponse('error', 'Error! There was an error, please try again!');
          form_disabled(form, false, 'all');
        }
      });
    }
  })
}
