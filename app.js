const form = document.getElementById("loginForm")
const email = document.getElementById("email")
const password = document.getElementById("password")

const emailErr = document.getElementById("emailErr");
const passErr = document.getElementById("passErr");
const message = document.getElementById("message");

const togglePwd = document.getElementById("togglePwd");
const forgotLink = document.getElementById("forgotLink");

const googleBtn = document.getElementById("googleBtn");
const fbBtn = document.getElementById("fbBtn");
const twBtn = document.getElementById("twBtn");

function isValidEmail(val){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function setInvalid(input, errEl, msg){
    input.classList.add("is-invalid");
    errEl.textContent = msg;
}

function clearInvalid(input, errEl){
    input.classList.remove("is-invalid");
    errEl.textContent = "";
}

togglePwd.addEventListener("click", () => {
  const isHidden = password.type === "password";
  password.type = isHidden ? "text" : "password";

  togglePwd.classList.toggle("is-on", isHidden);
  togglePwd.setAttribute("aria-label", isHidden ? "Sembunyikan password" : "Tampilkan password");
});

forgotLink.addEventListener("click", (e)=>{
    e.preventDefault();
    alert("Fitur reset password belum diubungkan. Nanti bisa diarahkan ke halaman /forgot-password");
});

[googleBtn, fbBtn, twBtn].forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        alert("Login sosial belum dihubungkan. Nanti bisa pakai OAuth (Google/Facebook/Twitter).");
    });
});

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    message.textContent = "";

    let ok = true;

    //email validation
    const emailVal = email.value.trim();
    if(!emailVal){
        ok = false;
        setInvalid(email, emailErr, "Email wajib diisi.");
    } else if(!isValidEmail(emailVal)){
        ok = false;
        setInvalid(email, emailErr, "Format email tidak valid.");
    } else {
        clearInvalid(email, emailErr);
    }

    //password validation
    const passVal = password.value;
    if(!passVal){
        ok = false;
        setInvalid(password, passErr, "Password wajib diisi.");
    } else if(passVal.length < 6){
        ok = false;
        setInvalid(password, passErr, "Password minimal 6 karakter.");
    } else {
        clearInvalid(password, passErr);
    }

    if(!ok) return;

    //Demo login logic (ganti dengan fetch ke backend)
    //contoh akun demo:
    //email: demo@wismasinau.id
    //password: 123456
    const isDemo = (emailVal.toLowerCase() === "demo@wismasinau.id" && passVal === "123456");

    if(isDemo){
        // simpan session sederhana
        localStorage.setItem("ws_auth", JSON.stringify({
            email: emailVal,
            loginAt: Date.now()
        }));

        message.textContent = "Login berhasil. Mengarahkan ke Home...";
        setTimeout(() => window.location.href = "home.html", 700);
    } else {
        message.textContent = "Login diterima (mode demo). Hubungkan ke backend untuk validasi asli.";
    }
});
