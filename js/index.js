var employeeList = [];

var createEmployee = function () {
  // debugger;

  var isFormValid = validate();

  if (!isFormValid) return;
  // 1.DOM lấy ra value từ input
  var tknv = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCB = document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var giolam = document.getElementById("gioLam").value;

  // 2. new Employee()
  var newEmployee = new Employee(
    name,
    tknv,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    giolam
  );

  // 3. push vào employeeList
  employeeList.push(newEmployee);

  // 4. in table
  renderEmployees();

  // 5. luư vào localstorage
  saveData();
};
var deleteEmployee = function (id) {
  var index = findById(id);
  if (index === -1) {
    alert("Nhân viên không tồn tại!");
    return;
  }
  employeeList.splice(index, 1);
  renderEmployees();
  saveData();
};

// update 1: lấy thông tin Employee đưa lên form
var getEmployee = function (id) {
  var index = findById(id);

  if (index === -1) {
    alert("Nhân viên không tồn tại!");
    return;
  }

  var foundEmployee = employeeList[index];

  document.getElementById("tknv").value = foundEmployee.tknv;
  document.getElementById("name").value = foundEmployee.name;
  document.getElementById("email").value = foundEmployee.email;
  document.getElementById("password").value = foundEmployee.password;
  document.getElementById("datepicker").value = foundEmployee.datepicker;
  document.getElementById("luongCB").value = foundEmployee.luongCB;
  document.getElementById("chucvu").value = foundEmployee.chucvu;
  document.getElementById("gioLam").value = foundEmployee.giolam;

  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "inline-block";

  //   document.getElementById("txtMaSV").disabled = true;
};

// update 2: lưu thay đổi

var updateEmployee = function () {
  var isFormValid = validate();
  if (!isFormValid) return;

  var tknv = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCB = document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var giolam = document.getElementById("gioLam").value;

  var index = findById(tknv);

  if (index === -1) {
    alert("Nhân viên không tồn tại!");
    return;
  }

  var foundEmployee = employeeList[index];

  foundEmployee.name = name;
  foundEmployee.email = email;
  foundEmployee.password = password;
  foundEmployee.datepicker = datepicker;
  foundEmployee.luongCB = luongCB;
  foundEmployee.chucvu = chucvu;
  foundEmployee.giolam = giolam;

  renderEmployees();
  saveData();
};

var checkType = function () {
  var type = document.getElementById("chucvu").value;

  if (type === "Sếp") return "sep";

  if (type === "Trưởng phòng") return "truongphong";

  if (type === "Nhân viên") return "nhanvien";

  return null;
};
var calcSalary = function (luongCoban, type) {
  if (type === "Sếp") {
    return luongCoban * 3;
  }
  if (type === "Trưởng phòng") {
    return luongCoban * 2;
  }
  if (type === "Nhân viên") {
    return luongCoban * 1;
  }
  return 0;
};

var xepLoai = function (gioLam) {
  if (gioLam >= 192) {
    return "Xuất sắc";
  } else if (gioLam >= 176) {
    return "Giỏi";
  } else if (gioLam >= 160) {
    return "Khá";
  } else {
    return "Trung bình";
  }
};
var renderEmployees = function (data) {
  data = data || employeeList;
  var dataHTML = "";
  for (var i = 0; i < data.length; i++) {
    dataHTML += `<tr>
        <td>${data[i].tknv}</td>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].datepicker}</td>
        <td>${data[i].chucvu}</td>
        <td>${calcSalary(data[i].luongCB, data[i].chucvu)}</td>
        <td>${xepLoai(data[i].giolam)}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteEmployee('${
            data[i].tknv
          }')" >Xoá</button>
          <button class="btn btn-info" data-toggle="modal"
          data-target="#myModal" onclick="getEmployee('${
            data[i].tknv
          }')">Cập nhật</button>
        </td>
      </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = dataHTML;
};
var handleCloseForm = function () {
  document.getElementById("myForm").reset();
  document.getElementById("btnThemNV").style.display = "inline-block";
  document.getElementById("btnCapNhat").style.display = "none";
};

var handleCreateForm = function () {
  // localStorage.clear();
  document.getElementById("myForm").reset();
};

var findById = function (id) {
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].tknv === id) {
      return i;
    }
  }
  return -1;
};

var saveData = function () {
  var employeeListJSON = JSON.stringify(employeeList);
  localStorage.setItem("list", employeeListJSON);
};

var getData = function () {
  var employeeListJSON = localStorage.getItem("list");
  if (employeeListJSON) {
    employeeList = mapData(JSON.parse(employeeListJSON));
    renderEmployees();
  }
};

var mapData = function (dataFromLocal) {
  var data = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var currentEmployee = dataFromLocal[i];
    var mappedEmployee = new Employee(
      currentEmployee.name,
      currentEmployee.tknv,
      currentEmployee.email,
      currentEmployee.password,
      currentEmployee.datepicker,
      currentEmployee.luongCB,
      currentEmployee.chucvu,
      currentEmployee.giolam
    );

    data.push(mappedEmployee);
  }

  return data;
};

getData();

var findEmployee = function () {
  var keyword = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();

  var results = [];

  for (var i = 0; i < employeeList.length; i++) {
    var _employee = xepLoai(employeeList[i].giolam).toLowerCase();

    if (employeeList[i].chucvu === keyword || _employee.includes(keyword)) {
      results.push(employeeList[i]);
    }
  }

  renderEmployees(results);
};

var validate = function () {
  var tknv = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCB = document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var gioLam = document.getElementById("gioLam").value;

  var textPattern = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/g;
  var numberPattern = /^[0-9]+$/g;
  var passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/g;
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

  var isValid = true;
  // debugger;

  isValid &=
    require(tknv, "tbTKNV") &&
    length(tknv, "tbTKNV", 4, 6) &&
    pattern(tknv, "tbTKNV", numberPattern);
  isValid &=
    require(name, "tbTen") &&
    pattern(name, "tbTen", textPattern, "* Vui lòng nhập tên không dấu");
  isValid &=
    require(email, "tbEmail") && pattern(email, "tbEmail", emailPattern);
  isValid &=
    length(password, "tbMatKhau", 6, 10) &&
    pattern(password, "tbMatKhau", passwordPattern);
  isValid &= require(datepicker, "tbNgay");
  isValid &=
    require(luongCB, "tbLuongCB") &&
    range(luongCB, "tbLuongCB", 1000000, 20000000);
  isValid &= require(gioLam, "tbGiolam") && range(gioLam, "tbGiolam", 80, 200);
  isValid &= option(chucvu, "tbChucVu", "* Vui lòng chọn chức vụ");

  return isValid;
};

// Required
var require = function (val, spanId, message) {
  if (!val) {
    document.getElementById(spanId).style.display = "block";
    document.getElementById(spanId).innerHTML =
      message || "* Trường này bắt buộc nhập";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

// Length
var length = function (val, spanId, min, max) {
  if (val.length < min || val.length > max) {
    document.getElementById(spanId).style.display = "block";

    document.getElementById(
      spanId
    ).innerHTML = `* Độ dài phải từ ${min} tới ${max} kí tự.`;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

// Range
var range = function (val, spanId, min, max) {
  if (val < min || val > max) {
    document.getElementById(spanId).style.display = "block";

    document.getElementById(
      spanId
    ).innerHTML = `* Giá trị phải từ ${min} tới ${max}.`;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

// Pattern
var pattern = function (val, spanId, regex, message) {
  var valid = regex.test(val);

  if (!valid) {
    document.getElementById(spanId).style.display = "block";

    document.getElementById(spanId).innerHTML =
      message || "* Không đúng định dạng";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};
// Option
var option = function (val, spanId, message) {
  if (val === "0") {
    document.getElementById(spanId).style.display = "block";
    document.getElementById(spanId).innerHTML =
      message || "* Vui lòng chọn giá trị";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};
