import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DateService {

  LOCALE_TR = {
    closeText: 'kapat',
    prevText: 'geri',
    nextText: 'ileri',
    currentText: 'bugün',
    monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    dayNamesShort: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
    dayNamesMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
    weekHeader: 'Hf',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: '',
    timeOnlyTitle: 'Zaman Seçiniz',
    timeText: 'Zaman',
    hourText: 'Saat',
    minuteText: 'Dakika',
    secondText: 'Saniye',
    ampm: false,
    month: 'Ay',
    week: 'Hafta',
    day: 'Gün',
    allDayText: 'Tüm Gün'
  };

  constructor() {
  }

  formatRouteDate(routeId: number, routeList: Array<any>, type: string) {
    let date = '';

    if (routeList) {
      for (let route of routeList) {
        if (route.routeId === routeId) {
          let temp: any;
          if (type === 'start')
            temp = new Date(route.startDate)
          else if (type === 'end')
            temp = new Date(route.endDate)

          date = this.dateFormatForHTML(temp)

        }

      }
    }

    return date;
  }

  secondsToDayHourMinute(seconds: any) {
    var days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    var hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    var mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    var total = days + ' gün ' + hrs + ' saat ' + mnts + ' dakika';

    if (days == 0)
      total = hrs + ' saat ' + mnts + ' dakika';
    if (days == 0 && hrs == 0)
      total = mnts + ' dakika';

    return total;
  }

  calculateEndDate(startDate: any, seconds: any) {
    let start = startDate.getUTCFullYear() + '-' + (startDate.getUTCMonth() + 1) + '-' + startDate.getUTCDate() + ' ' + startDate.getHours() + ':' +
      startDate.getUTCMinutes() + ':' + startDate.getUTCSeconds();
    var temp2 = new Date(start);
    var temp = new Date(temp2.getTime() + (1000 * seconds))
    var endDate = temp.getUTCDate() + '-' + (temp.getUTCMonth() + 1) + '-' + temp.getFullYear()
      + ' Saat: ' + temp.getHours() + ':' + temp.getUTCMinutes() + ':' + temp.getUTCSeconds()

    start = temp2.getUTCDate() + '-' + (temp2.getUTCMonth() + 1) + '-' + temp2.getFullYear()
      + ' Saat: ' + temp2.getHours() + ':' + temp2.getUTCMinutes() + ':' + temp2.getUTCSeconds()
    console.log(start)
    console.log(endDate)
    return temp;
  }

  dateFormat(date: any) {
    let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +
      date.getMinutes() + ':' + date.getSeconds();
    return formattedDate;
  }

  dateFormatForHTML(date: any) {
    let formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' +
      date.getMinutes();
    return formattedDate;
  }
}
