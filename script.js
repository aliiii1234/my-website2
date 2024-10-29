document.addEventListener("DOMContentLoaded", function() {
  $('#sessionDate').persianDatepicker({
    format: 'YYYY/MM/DD',
    initialValue: false,
  });
  loadSessionDataFromLocalStorage(); // بارگذاری داده‌ها از Local Storage هنگام لود شدن صفحه
});

// آبجکت برای ذخیره داده‌های هر جلسه
const sessionData = {};
const exercisesList = []; // برای ذخیره لیست حرکات

function addRow() {
  const tableBody = document.getElementById("exerciseTableBody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" placeholder="حرکت"></td>
    <td><input type="number" placeholder="تعداد" class="small-input"></td>
    <td><input type="number" placeholder="ست" class="small-input"></td>
    <td><input type="number" placeholder="وزنه" class="weight-input"></td>
    <td><input type="text" placeholder="استراحت" class="rest-input" oninput="autoResize(this)"></td>
    <td><button type="button" onclick="removeRow(this)">❌</button></td>
  `;
  tableBody.appendChild(newRow);
}

function addExercise() {
  const dropdown = document.getElementById('exerciseDropdown');
  const selectedExercise = dropdown.value;
  if (selectedExercise) {
    exercisesList.push(selectedExercise); // ذخیره حرکت در لیست حرکات
    const tableBody = document.getElementById("exerciseTableBody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="text" value="${selectedExercise}"></td>
      <td><input type="number" placeholder="تعداد" class="small-input"></td>
      <td><input type="number" placeholder="ست" class="small-input"></td>
      <td><input type="number" placeholder="وزنه" class="weight-input"></td>
      <td><input type="text" placeholder="استراحت" class="rest-input" oninput="autoResize(this)"></td>
      <td><button type="button" onclick="removeRow(this)">❌</button></td>
    `;
    tableBody.appendChild(newRow);
    dropdown.selectedIndex = 0;
  }
}

function removeRow(button) {
  const row = button.parentNode.parentNode;
  row.remove();
}

function autoResize(input) {
  input.style.width = "30px";
  if (input.value.length > 5) {
    input.style.width = input.scrollWidth + "px";
  }
}

function saveExerciseData() {
  const sessionSelect = document.getElementById('sessionSelect').value;
  const studentName = document.getElementById('studentName').value;
  const sessionDate = document.getElementById('sessionDate').value;
  const exercises = [];
  const rows = document.querySelectorAll("#exerciseTableBody tr");

  rows.forEach((row) => {
    const exercise = row.children[0].querySelector("input").value;
    const count = row.children[1].querySelector("input").value;
    const set = row.children[2].querySelector("input").value;
    const weight = row.children[3].querySelector("input").value;
    const rest = row.children[4].querySelector("input").value;

    if (exercise || count || set || weight || rest) {
      exercises.push({
        exercise,
        count,
        set,
        weight,
        rest
      });
    }
  });

  sessionData[sessionSelect] = {
    studentName,
    sessionDate,
    exercises
  };

  // ذخیره داده‌ها در Local Storage
  localStorage.setItem('sessionData', JSON.stringify(sessionData));
  alert("برنامه تمرینی برای " + sessionSelect + " ذخیره شد!");
}

function loadSessionData() {
  const sessionSelect = document.getElementById('sessionSelect').value;
  const data = sessionData[sessionSelect];

  if (data) {
    document.getElementById('studentName').value = data.studentName || '';
    document.getElementById('sessionDate').value = data.sessionDate || '';

    const tableBody = document.getElementById("exerciseTableBody");
    tableBody.innerHTML = '';

    data.exercises.forEach((exercise) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td><input type="text" value="${exercise.exercise}"></td>
        <td><input type="number" value="${exercise.count}" class="small-input"></td>
        <td><input type="number" value="${exercise.set}" class="small-input"></td>
        <td><input type="number" value="${exercise.weight}" class="weight-input"></td>
        <td><input type="text" value="${exercise.rest}" class="rest-input" oninput="autoResize(this)"></td>
        <td><button type="button" onclick="removeRow(this)">❌</button></td>
      `;
      tableBody.appendChild(newRow);
    });

    alert("اطلاعات جلسه " + sessionSelect + " بارگذاری شد.");
  } else {
    alert("اطلاعاتی برای این جلسه ذخیره نشده است.");
  }
}

// بارگذاری اطلاعات از Local Storage هنگام لود شدن صفحه
function loadSessionDataFromLocalStorage() {
  const savedData = localStorage.getItem('sessionData');
  if (savedData) {
    Object.assign(sessionData, JSON.parse(savedData));
  }
}

function saveAllData() {
  const sessionSelect = document.getElementById('sessionSelect').value;
  const studentName = document.getElementById('studentName').value;
  const sessionDate = document.getElementById('sessionDate').value;
  const exercises = [];
  const rows = document.querySelectorAll("#exerciseTableBody tr");

  rows.forEach((row) => {
    const exercise = row.children[0].querySelector("input").value;
    const count = row.children[1].querySelector("input").value;
    const set = row.children[2].querySelector("input").value;
    const weight = row.children[3].querySelector("input").value;
    const rest = row.children[4].querySelector("input").value;

    if (exercise || count || set || weight || rest) {
      exercises.push({
        exercise,
        count,
        set,
        weight,
        rest
      });
    }
  });

  sessionData[sessionSelect] = {
    studentName,
    sessionDate,
    exercises
  };

  localStorage.setItem('sessionData', JSON.stringify(sessionData));
  alert("تمام داده‌ها ذخیره شد!");
}

function loadAllData() {
  const savedData = localStorage.getItem('sessionData');
  if (savedData) {
    Object.assign(sessionData, JSON.parse(savedData));
    const sessionSelect = document.getElementById('sessionSelect').value;
    const data = sessionData[sessionSelect];

    if (data) {
      document.getElementById('studentName').value = data.studentName || '';
      document.getElementById('sessionDate').value = data.sessionDate || '';

      const tableBody = document.getElementById("exerciseTableBody");
      tableBody.innerHTML = '';

      data.exercises.forEach((exercise) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td><input type="text" value="${exercise.exercise}"></td>
          <td><input type="number" value="${exercise.count}" class="small-input"></td>
          <td><input type="number" value="${exercise.set}" class="small-input"></td>
          <td><input type="number" value="${exercise.weight}" class="weight-input"></td>
          <td><input type="text" value="${exercise.rest}" class="rest-input" oninput="autoResize(this)"></td>
          <td><button type="button" onclick="removeRow(this)">❌</button></td>
        `;
        tableBody.appendChild(newRow);
      });

      alert("تمام اطلاعات جلسه " + sessionSelect + " بارگذاری شد.");
    } else {
      alert("اطلاعاتی برای این جلسه ذخیره نشده است.");
    }
  }
}

function downloadPDF() {
  const element = document.getElementById('student-program');
  
  const options = {
    margin: 0, // حذف حاشیه
    filename: 'exercise-program.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } // تنظیم فرمت به A4
  };

  html2pdf()
    .from(element)
    .set(options)
    .save();
}

// تابع افزودن حرکت جدید به کشو
function addNewExercise() {
  const newExerciseInput = document.getElementById('newExercise');
  const newExerciseValue = newExerciseInput.value.trim();
  
  if (newExerciseValue) {
    const dropdown = document.getElementById('exerciseDropdown');
    
    // ایجاد یک گزینه جدید برای کشو
    const newOption = document.createElement('option');
    newOption.value = newExerciseValue;
    newOption.textContent = newExerciseValue;

    // اضافه کردن گزینه جدید به کشو
    dropdown.appendChild(newOption);
    
    // اضافه کردن حرکت جدید به لیست حرکات
    exercisesList.push(newExerciseValue);
    
    // ذخیره حرکات جدید در Local Storage
    saveAllData();
    
    // خالی کردن ورودی بعد از افزودن
    newExerciseInput.value = '';
    alert('حرکت جدید با موفقیت اضافه شد!');
  } else {
    alert('لطفا نام حرکت را وارد کنید.');
  }
}

// تابع حذف حرکت از کشو
function removeExercise() {
  const dropdown = document.getElementById('exerciseDropdown');
  const selectedOption = dropdown.value;
  
  if (selectedOption) {
    dropdown.remove(dropdown.selectedIndex);
    exercisesList.splice(exercisesList.indexOf(selectedOption), 1); // حذف حرکت از لیست حرکات
    saveAllData(); // به‌روزرسانی Local Storage
    alert(`حرکت "${selectedOption}" با موفقیت حذف شد.`);
  } else {
    alert('لطفا یک حرکت برای حذف انتخاب کنید.');
  }
}