import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  warning(msg: string) {
    return Swal.fire({
      icon: 'warning',
      html: msg,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-primary'
      },
    });
  }

  danger(msg: string) {
    return Swal.fire({
      icon: 'error',
      text: msg,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'حسنا',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
    });
  }

  notification(msg: string) {
    return Swal.fire({
      icon: 'warning',
      text: msg,
      showCloseButton: false,
      showCancelButton: true,
      showConfirmButton: false,
      focusCancel: false,
      cancelButtonText: 'حسنا',
      timer: 7000
    });
  }

  success(msg: string) {
    return Swal.fire({
      icon: 'success',
      html: msg,
      showCloseButton: false,
      showCancelButton: true,
      showConfirmButton: false,
      focusCancel: true,
      reverseButtons: true,
      customClass: {
        cancelButton: 'btn btn-success'
      },
      cancelButtonText: 'حسنا',
      timer: 4000
    });
  }
}
