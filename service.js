// Giá xe cơ bản (VND)
const carPrices = {
  "GLC 300 4MATIC": 3129000000,
  "E 200 Exclusive": 2390000000,
  "C 300 AMG": 2390000000
};

// Tỉ lệ phí trước bạ theo tỉnh
const beforeTaxRate = {
  "HN": 0.12,
  "HCM": 0.10,
  "other": 0.10
};

// Phí cố định khác
const fixedFees = {
  bienSo: 20000000,        // biển số
  baoHiem: 10000000,       // bảo hiểm TNDS
  dangKiem: 500000         // đăng kiểm, phí đường bộ gộp
};

function formatCurrency(value) {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function calculateFee() {
  const model = document.getElementById("car-model").value;
  const province = document.getElementById("province").value;
  const resultDiv = document.getElementById("fee-result");

  if (!model || !province) {
    resultDiv.textContent = "Vui lòng chọn đầy đủ dòng xe và tỉnh thành.";
    return;
  }

  const basePrice = carPrices[model];
  const taxRate = beforeTaxRate[province];

  const truocBa = basePrice * taxRate;
  const total = basePrice + truocBa + fixedFees.bienSo + fixedFees.baoHiem + fixedFees.dangKiem;

  resultDiv.innerHTML = `
    Giá xe: ${formatCurrency(basePrice)}<br>
    Lệ phí trước bạ: ${formatCurrency(truocBa)}<br>
    Phí biển số: ${formatCurrency(fixedFees.bienSo)}<br>
    Bảo hiểm TNDS: ${formatCurrency(fixedFees.baoHiem)}<br>
    Phí đăng kiểm + đường bộ: ${formatCurrency(fixedFees.dangKiem)}<br>
    <hr>
    <strong>Tổng chi phí lăn bánh: ${formatCurrency(total)}</strong>
  `;
}

const quizData = [
  {
    question: "Bạn mua xe để làm gì?",
    options: ["Đi làm hàng ngày", "Chở gia đình", "Chạy dịch vụ", "Thể thao & cá nhân"],
  },
  {
    question: "Ngân sách của bạn là?",
    options: ["Dưới 1.5 tỷ", "1.5–2.5 tỷ", "Trên 2.5 tỷ"],
  },
  {
    question: "Bạn thích kiểu xe nào?",
    options: ["Sedan", "SUV", "Coupe", "Không rõ"],
  }
];

let quizStep = 0;
let answers = [];

function startQuiz() {
  quizStep = 0;
  answers = [];
  showQuizQuestion();
}

function showQuizQuestion() {
  const q = quizData[quizStep];
  const box = document.getElementById("quiz-box");
  box.innerHTML = `<h3>${q.question}</h3>`;
  q.options.forEach(option => {
    box.innerHTML += `<button class="quiz-btn" onclick="selectAnswer('${option}')">${option}</button>`;
  });
}

function selectAnswer(answer) {
  answers.push(answer);
  quizStep++;
  if (quizStep < quizData.length) {
    showQuizQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const box = document.getElementById("quiz-box");
  let suggestion = "GLC 300 4MATIC";

  if (answers.includes("Dưới 1.5 tỷ")) suggestion = "C 200 Avantgarde Plus";
  else if (answers.includes("1.5–2.5 tỷ") && answers.includes("SUV")) suggestion = "GLC 200 4MATIC";
  else if (answers.includes("Trên 2.5 tỷ")) suggestion = "E 300 AMG";
  else if (answers.includes("Chạy dịch vụ")) suggestion = "E 180";

  box.innerHTML = `
    <h3>Xe phù hợp với bạn là:</h3>
    <p><strong>${suggestion}</strong></p>
    <button class="btn-primary" onclick="startQuiz()">Làm lại</button>
  `;
}

const carSpecs = {
  "GLC 300": {
    name: "GLC 300 4MATIC",
    price: 3129000000,
    type: "SUV",
    engine: "2.0L Turbo",
    fuel: "Xăng",
    hp: "258 mã lực"
  },
  "E 200": {
    name: "E 200 Exclusive",
    price: 2390000000,
    type: "Sedan",
    engine: "2.0L",
    fuel: "Xăng",
    hp: "197 mã lực"
  },
  "C 300": {
    name: "C 300 AMG",
    price: 2390000000,
    type: "Sedan",
    engine: "2.0L Turbo",
    fuel: "Xăng",
    hp: "258 mã lực"
  }
};

function compareCars() {
  const a = document.getElementById("compareA").value;
  const b = document.getElementById("compareB").value;
  const result = document.getElementById("compare-result");

  if (!a || !b) {
    result.innerHTML = "<p>Vui lòng chọn đủ 2 dòng xe.</p>";
    return;
  }

  if (a === b) {
    result.innerHTML = "<p>Hãy chọn 2 xe khác nhau để so sánh.</p>";
    return;
  }

  const carA = carSpecs[a];
  const carB = carSpecs[b];

  result.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Thông số</th>
          <th>${carA.name}</th>
          <th>${carB.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Giá</td><td>${formatCurrency(carA.price)}</td><td>${formatCurrency(carB.price)}</td></tr>
        <tr><td>Dòng xe</td><td>${carA.type}</td><td>${carB.type}</td></tr>
        <tr><td>Động cơ</td><td>${carA.engine}</td><td>${carB.engine}</td></tr>
        <tr><td>Nhiên liệu</td><td>${carA.fuel}</td><td>${carB.fuel}</td></tr>
        <tr><td>Công suất</td><td>${carA.hp}</td><td>${carB.hp}</td></tr>
      </tbody>
    </table>
  `;
}


function submitTestDrive() {
  const inputs = document.querySelectorAll("#compare-section ~ .section input, #compare-section ~ .section select");
  const [name, phone, model, date] = [...inputs].slice(0, 4).map(i => i.value);

  if (!name || !phone || !model || !date) {
    alert("Vui lòng nhập đầy đủ thông tin để đặt lịch lái thử.");
    return;
  }

  alert(`Đặt lịch lái thử thành công!\nXe: ${model}\nTên: ${name}\nNgày: ${date}`);
}

function submitMaintenance() {
  const inputs = document.querySelectorAll("#compare-section ~ .section.dark input");
  const [name, phone, plate, date] = [...inputs].map(i => i.value);

  if (!name || !phone || !plate || !date) {
    alert("Vui lòng nhập đầy đủ thông tin để đặt lịch bảo dưỡng.");
    return;
  }

  alert(`Đặt lịch bảo dưỡng thành công!\nBiển số: ${plate}\nTên: ${name}\nNgày: ${date}`);
}

