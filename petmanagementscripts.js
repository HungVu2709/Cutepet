"use strict";
// su kien upload anh
var upload = document.querySelector("#mypicture");
var preview = document.querySelector(".preview");
var error = document.querySelector(".error");

upload.addEventListener("change", function (e) {
  // console.log("Change success");
  // console.log("changez", upload.files[0]);
  // console.log("change", upload.files);
  console.log(URL.createObjectURL(upload.files[0]));
  console.log(upload.files[0].name);
  console.log(upload.files[0]);
  var file = upload.files[0];
  if (!file) {
    error.innerHTML = "Just file";
    return;
  }
  // dinh dang file duoc upload
  if (!file.name.endsWith(".png")) {
    error.innerHTML = "Please upload file png";
    return;
  } else {
    error.innerHTML = "So cuteee";
  }
  // size anh duoc upload
  if (file.size / (1024 * 1024) > 5) {
    error.innerHTML = " This image is larger than 5MB";
    return;
  } else {
    error.innerHTML = "";
  }

  var img = document.createElement("img");
  img.src = URL.createObjectURL(upload.files[0]);
  preview.appendChild(img);
});

///////////////////
// su kien click submit //
var submitBtn = document.getElementById("submit-btn");
var idInput = document.getElementById("input-id");
var nameInput = document.getElementById("input-name");
var ageInput = document.getElementById("input-age");
var typeInput = document.getElementById("input-type");
var weightInput = document.getElementById("input-weight");
var lengthInput = document.getElementById("input-length");
var colorInput = document.getElementById("input-color-1");
var breedInput = document.getElementById("input-breed");
var vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
// nut submit //
var petArr = [];
submitBtn.addEventListener("click", function () {
  // luu du lieu vao object //
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewornmed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  // them thu cung vao ds
  var validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTable(petArr);
  }
  // hien thi danh sach
});
function renderTable(petArr) {
  var table = `
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Type</th>
      <th scope="col">Weight</th>
      <th scope="col">Length</th>
      <th scope="col">Breed</th>
      <th scope="col">Color</th>
      <th scope="col">Vaccinated</th>
      <th scope="col">Dewormed</th>
      <th scope="col">Sterilized</th>
      <th scope="col">Date Added</th>
      <th scope="col">Action</th>
    </tr>`;
  for (let i = 0; i < petArr.length; i++) {
    table += `<tr>
      <th scope="row">${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight}</td>
      <td>${petArr[i].length}</td>
      <td>${petArr[i].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
      </td>
      <td><i class="bi ${
        petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        petArr[i].dewornmed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td>${petArr[i].date}</td>
      <td>
        <button onclick="deletePet('${
          petArr[i].id
        }')" type="button" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;
  }
  document.getElementById("render").innerHTML = table;
}
// xoa cac du lieu vua nhap tren form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = " Select type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

const deletePet = (petId) => {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id == petId) {
        petArr.splice(i, 1);
        renderTable(petArr);
      }
    }
  } else {
  }
};

const validateData = (data) => {
  if (idInput.value.trim().length === 0) {
    alert("ID must be field");
    return false;
  }
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == idInput.value) {
      alert("ID Must be unique");
      return false;
    }
  }
  if (
    parseInt(ageInput.value.trim()) > 15 ||
    parseInt(ageInput.value.trim()) < 1
  ) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  if (weightInput.value.trim() > 15 || weightInput.value.trim() < 1) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  if (lengthInput.value.trim() > 100 || lengthInput.value.trim() < 1) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  if (typeInput.value == "Select Type" || typeInput == "") {
    alert("Please select Type!");
    return false;
  }

  if (breedInput.value == "Select Breed" || breedInput.value == "") {
    alert("Please select Breed!");
    return false;
  }

  return true;
};
