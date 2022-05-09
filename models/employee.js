function Employee(
  name,
  tknv,
  email,
  password,
  datepicker,
  luongCB,
  chucvu,
  giolam
) {
  this.tknv = tknv;
  this.name = name;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.luongCB = luongCB;
  this.chucvu = chucvu;
  this.giolam = giolam;

  this.calcGPA = function () {
    return (this.luongCB + this.chucvu + this.giolam) / 3;
  };
}
