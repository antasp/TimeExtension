HTMLElement.prototype.addClass = function (newClass) {
    let currentClass = this.getAttribute('class') || '';
    this.setAttribute('class', newClass + ' ' + currentClass);
};

Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
};

Date.prototype.weekend = function () {
    return !(this.getDay() % 6);
}

Number.prototype.hoursToHHMM = function () {

    var num = this;
    var rhours = Math.floor(num);
    var minutes = (num - rhours) * 60;
    var rminutes = Math.round(minutes);
    return [rhours, (rminutes > 9 ? '' : '0') + rminutes].join(":");
}

String.prototype.HHMMToHours = function () {

    temp = this.split(':');

    return Number(temp[0]) + (Number(temp[1] / 60));
}

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
