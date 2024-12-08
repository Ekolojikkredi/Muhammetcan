// Atık türlerine göre puanlar
const wastePoints = {
    "Kağıt": 10, // 1 kg kağıt = 10 puan
    "Plastik": 5, // 1 kg plastik = 5 puan
    "Metal": 8,   // 1 kg metal = 8 puan
    "Cam": 6,     // 1 kg cam = 6 puan
    "Yağ": 20,    // 1 kg yağ = 20 puan
    "Tekstil": 15, // 1 kg tekstil = 15 puan
    "Elektronik Atık": 30, // 1 kg elektronik atık = 30 puan
    "Pil": 50      // 1 kg pil = 50 puan
};

// Global değişkenler
let students = [];  // Öğrencilerin bilgilerini tutacak dizi
let schools = [];   // Okulların bilgilerini tutacak dizi
let totalWaste = 0; // Toplam atık miktarını tutacak sayaç

// Sayfa geçişlerini yöneten fonksiyon
function showPage(page) {
    let pageContent = document.getElementById('page-content'); // Sayfa içeriği
    switch (page) {
        case 'kayit':
            pageContent.innerHTML = getRegistrationPage();
            break;
        case 'veri-goruntuleme':
            pageContent.innerHTML = getDataViewPage();
            break;
        case 'veri-giris':
            pageContent.innerHTML = getDataEntryPage();
            break;
        case 'ekolojik-kredi':
            pageContent.innerHTML = getEcologicalCreditInfo();
            break;
        case 'hazirlayanlar':
            pageContent.innerHTML = getTeamInfo();
            break;
        case 'geri-donusum':
            pageContent.innerHTML = getRecyclingInfo();
            break;
        case 'bize-ulasin':
            pageContent.innerHTML = getContactInfo();
            break;
        default:
            pageContent.innerHTML = '';
    }
}

// Kayıt sayfasını döndüren fonksiyon
function getRegistrationPage() {
    return `
        <h2>Kayıt Ol</h2>
        <button onclick="showSchoolRegistration()">Okul Kaydı</button>
        <button onclick="showStudentRegistration()">Öğrenci Kaydı</button>
    `;
}

// Okul kaydı sayfasını açan fonksiyon
function showSchoolRegistration() {
    let schoolForm = `
        <h3>Okul Kaydı</h3>
        <form id="school-registration-form">
            <label for="schoolName">Okul Adı: </label><input type="text" id="schoolName" required><br>
            <label for="province">İl: </label><input type="text" id="province" required><br>
            <label for="district">İlçe: </label><input type="text" id="district" required><br>
            <label for="schoolPassword">Şifre: </label><input type="password" id="schoolPassword" required><br>
            <button type="button" onclick="registerSchool()">Kaydet</button>
        </form>
    `;
    document.getElementById('page-content').innerHTML = schoolForm;
}

// Okul kaydını işleyen fonksiyon
function registerSchool() {
    const schoolName = document.getElementById('schoolName').value;
    const province = document.getElementById('province').value;
    const district = document.getElementById('district').value;
    const schoolPassword = document.getElementById('schoolPassword').value;
    const newSchool = { schoolName, province, district, schoolPassword };
    schools.push(newSchool); // Okul kaydını okullar dizisine ekler
    alert('Okul kaydedildi!');
    showPage('kayit'); // Kayıt sayfasına geri döner
}

// Öğrenci kaydı sayfasını açan fonksiyon
function showStudentRegistration() {
    let studentForm = `
        <h3>Öğrenci Kaydı</h3>
        <form id="student-registration-form">
            <label for="studentName">Öğrenci Adı: </label><input type="text" id="studentName" required><br>
            <label for="studentSurname">Öğrenci Soyadı: </label><input type="text" id="studentSurname" required><br>
            <label for="studentNumber">Okul Numarası: </label><input type="text" id="studentNumber" required><br>
            <label for="studentEmail">E-posta: </label><input type="email" id="studentEmail" required><br>
            <label for="studentPhone">Telefon: </label><input type="tel" id="studentPhone" required><br>
            <label for="studentClass">Sınıf: </label><input type="text" id="studentClass" required><br>
            <button type="button" onclick="registerStudent()">Kaydet</button>
        </form>
    `;
    document.getElementById('page-content').innerHTML = studentForm;
}

// Öğrenci kaydını işleyen fonksiyon
function registerStudent() {
    const studentName = document.getElementById('studentName').value;
    const studentSurname = document.getElementById('studentSurname').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentPhone = document.getElementById('studentPhone').value;
    const studentClass = document.getElementById('studentClass').value;

    // Öğrenci kaydını okullar dizisine bağlı okul doğrulamasıyla yapıyoruz
    const schoolName = prompt("Okul adı ve şifrenizi girin.");
    const schoolPassword = prompt("Okul şifresini girin.");
    const school = schools.find(s => s.schoolName === schoolName && s.schoolPassword === schoolPassword);

    if (school) {
        const newStudent = { 
            studentName, 
            studentSurname, 
            studentNumber, 
            studentEmail, 
            studentPhone, 
            studentClass, 
            totalPoints: 0 
        };
        students.push(newStudent); // Öğrenci kaydını öğrenciler dizisine ekler
        alert('Öğrenci kaydedildi!');
        showPage('kayit'); // Kayıt sayfasına geri döner
    } else {
        alert("Okul adı veya şifre hatalı.");
    }
}

// Veri girişi sayfasını gösteren fonksiyon
function getDataEntryPage() {
    return `
        <h3>Atık Girişi</h3>
        <form id="waste-entry-form">
            <label for="wasteType">Atık Türü:</label>
            <select id="wasteType" required>
                <option value="Kağıt">Kağıt</option>
                <option value="Plastik">Plastik</option>
                <option value="Metal">Metal</option>
                <option value="Cam">Cam</option>
                <option value="Yağ">Yağ</option>
                <option value="Tekstil">Tekstil</option>
                <option value="Elektronik Atık">Elektronik Atık</option>
                <option value="Pil">Pil</option>
            </select><br>
            <label for="wasteWeight">Atık Miktarı (kg):</label><input type="number" id="wasteWeight" required><br>
            <button type="button" onclick="submitWasteData()">Gönder</button>
        </form>
    `;
}

// Atık veri girişini işleyen fonksiyon
function submitWasteData() {
    const wasteType = document.getElementById('wasteType').value;
    const wasteWeight = document.getElementById('wasteWeight').value;
    const wastePointsPerKg = wastePoints[wasteType];
    
    // Öğrencinin toplam puanını hesaplar
    const pointsEarned = wasteWeight * wastePointsPerKg;
    totalWaste += parseFloat(wasteWeight); // Toplam atık miktarını artırır

    alert(`Atık türü: ${wasteType}, Miktar: ${wasteWeight} kg, Kazanılan Puan: ${pointsEarned}`);
// Öğrencinin puanlarını günceller
    const studentEmail = prompt("E-posta adresinizi girin:");
    const student = students.find(s => s.studentEmail === studentEmail);
    
    if (student) {
        student.totalPoints += pointsEarned; // Öğrencinin toplam puanını günceller
        alert(`Başarıyla kaydedildi! Şu ana kadar kazandığınız toplam puan: ${student.totalPoints}`);
        showPage('kayit'); // Kayıt sayfasına geri döner
    } else {
        alert("E-posta adresiyle öğrenci bulunamadı.");
    }
}

// Veri görüntüleme sayfasını döndüren fonksiyon
function getDataViewPage() {
    return `
        <h3>Veri Görüntüleme</h3>
        <form id="data-view-form">
            <label for="studentEmail">E-posta: </label><input type="email" id="studentEmail" required><br>
            <label for="studentNumber">Öğrenci Numarası: </label><input type="text" id="studentNumber" required><br>
            <button type="button" onclick="viewData()">Verileri Görüntüle</button>
        </form>
    `;
}

// Verileri görüntülemek için fonksiyon
function viewData() {
    const studentEmail = document.getElementById('studentEmail').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const student = students.find(s => s.studentEmail === studentEmail && s.studentNumber === studentNumber);

    if (student) {
        alert(`Öğrenci Adı: ${student.studentName} ${student.studentSurname}\n
               Öğrenci Numarası: ${student.studentNumber}\n
               Toplam Puan: ${student.totalPoints}`);
    } else {
        alert("Öğrenci bulunamadı.");
    }
}

// Ekolojik kredi ve geri dönüşüm hakkında bilgi veren fonksiyon
function getEcologicalCreditInfo() {
    return `
        <h3>Ekolojik Kredi Nedir?</h3>
        <p>Ekolojik kredi, çevre dostu uygulamaları teşvik etmek amacıyla kazandığınız puanları ifade eder. Atıkların geri dönüştürülmesiyle çevreye olan katkınız ödüllendirilir.</p>
    `;
}

// Hazırlayanlar hakkında bilgi veren fonksiyon
function getTeamInfo() {
    return `
        <h3>Hazırlayanlar</h3>
        <p>Danışman Öğretmen: Osman Onuk</p>
        <p>Öğrenciler: Muhammedcan Arslanparçası, Bilal Yiğit Tezcan, Yağız Efe Yılmaz</p>
    `;
}

// Geri dönüşüm hakkında bilgi veren fonksiyon
function getRecyclingInfo() {
    return `
        <h3>Geri Dönüşüm Nedir?</h3>
        <p>Geri dönüşüm, atıkların yeniden işlenerek tekrar kullanılması işlemidir. Bu sayede doğal kaynaklar korunur ve çevre kirliği önlenir.</p>
    `;
}

// Bize ulaşın sayfasını döndüren fonksiyon
function getContactInfo() {
    return `
        <h3>Bize Ulaşın</h3>
        <p>İletişim için e-posta adresimiz: info@ekolojik-kredi.com</p>
    `;
}

// Ana sayfa gösterimi
showPage('kayit'); // İlk sayfa kayit sayfası ile başlatılır
