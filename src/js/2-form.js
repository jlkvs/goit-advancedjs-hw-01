const STORAGE_KEY = "feedback-form-state";

const formData = {
  email: "",
  message: "",
};

const form = document.querySelector(".feedback-form");

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      if (parsedData.email) formData.email = parsedData.email.trim();
      if (parsedData.message) formData.message = parsedData.message.trim();

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error("Помилка при парсингу даних із localStorage:", error);
    }
  }
}

form.addEventListener("input", event => {
  const target = event.target;
  if (target.name === "email" || target.name === "message") {
    formData[target.name] = target.value.trim();
    saveToLocalStorage();
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = "";
  formData.message = "";

  form.reset();
});

loadFromLocalStorage();