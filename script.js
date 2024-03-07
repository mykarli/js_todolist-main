
let tasks = []

// Yeni bir öğe ekleme fonksiyonu
function newElement() {
    // Yeni bir öğe için bir li elementi oluştur
    let li = document.createElement("li");
    // Giriş kutusundaki değeri al
    let input = document.getElementById("task").value;
    // Giriş kutusunun boş olup olmadığını kontrol et
    if (input === "") {
      // Boşsa, hata bildirimi göster
      $(".error").toast("show");
    } else {
      // Değilse, li elementine giriş değerini ekle
      li.textContent = input;
      // Li elementine bir span elementi ekle
      let span = document.createElement("span");
      // Span elementine "close" sınıfı ve "x" metni ver
      span.className = "close";
      span.textContent = "x";
      // Li elementine span elementini ekle
      li.appendChild(span);
      // Listeye li elementini ekle
      list.appendChild(li);
      // Başarı bildirimi göster
      $(".success").toast("show");
      // Giriş kutusunu temizle
      document.getElementById("task").value = "";
      // Yapılacaklar listesine yeni öğeyi ekle
      tasks.push(input);
      // Yapılacaklar listesini stringe dönüştür
      let tasksString = JSON.stringify(tasks);
      // Yapılacaklar listesini localStorage'a kaydet
      localStorage.setItem("tasks", tasksString);
    }
  }
  
  // Listeye tıklandığında, tıklanan öğeyi seç 
  list.addEventListener("click", function(task) {
    if (task.target.tagName === "LI") {
      task.target.classList.toggle("checked");
    }
  });

  // Listeye tıklandığında, tıklanan öğeyi sil 
list.onclick = function(event) {
    // Tıklanan öğeyi seç
    let target = event.target;
    // Tıklanan öğenin bir span elementi olup olmadığını kontrol et
    if (target.tagName === "SPAN") {
      // Span elementinin üst öğesini, yani li elementini seç
      let li = target.parentNode;
      // Li elementinin seçilmiş olup olmadığını kontrol et
      if (li.classList.contains("checked")) {
        // Seçilmişse, listedeki li elementinin indeksini bul
        let index = Array.from(list.children).indexOf(li);
        // Listedeki li elementini sil
        list.removeChild(li);
        // Yapılacaklar listesinden silinen öğeyi çıkar
        tasks.splice(index, 1);
        // Yapılacaklar listesini stringe dönüştür
        let tasksString = JSON.stringify(tasks);
        // Yapılacaklar listesini localStorage'a kaydet
        localStorage.setItem("tasks", tasksString);
      } else {
        // Seçilmemişse, span elementinin tıklama olayını engelle
        event.preventDefault();
      }
    }
  };
  
  
// Sayfa yüklendiğinde, localStorage'dan verileri al
window.onload = function() {            
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      tasks.forEach(function(task) {
        let li = document.createElement("li");
        li.textContent = task;
        let span = document.createElement("span");
        span.className = "close";
        span.textContent = "x";
        li.appendChild(span);
        list.appendChild(li);
      });
    }
  };

