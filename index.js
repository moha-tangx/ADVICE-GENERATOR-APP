const root = document.firstElementChild;
const btn = document.querySelector("button.dice");
const theme_toggle = document.querySelector(".theme-toggle");

const getTheme = () => localStorage.getItem("adviceGeneratorTheme") || "dark";
const setTheme = (theme) => localStorage.setItem("adviceGeneratorTheme", theme);
root.classList.add(getTheme());

function toggleTheme() {
  getTheme() == "light" ? setTheme("dark") : setTheme("light");
  root.classList = getTheme();
}

async function getAdvices() {
  const url = "https://api.adviceslip.com/advice";
  try {
    const res = await fetch(url);
    // console.log(await res.json());
    return await res.json();
  } catch (error) {
    alert(error);
  }
}

async function advice() {
  const obj = await getAdvices();
  const { id, advice } = obj.slip;
  const paragraph = document.querySelector("p#advice");
  const span = document.querySelector("span#advice-id");
  paragraph.textContent = advice;
  span.textContent = `ADVICE #${id}`;
}

btn.addEventListener("click", () => {
  btn.style.transform = "rotate(180deg)";
  setTimeout(() => {
    btn.style.transform = "rotate(0)";
  }, 400);
  advice();
});

theme_toggle.addEventListener("click", toggleTheme);
