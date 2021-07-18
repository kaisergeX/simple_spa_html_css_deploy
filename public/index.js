/**
 * Just play around with vanilla JS to create a SPA.
 * Btw, this SPA simulator would defeat the purpose of SEO if its applied to real project.
 *
 * @note my English is not good. So, the comments code below may be confusing. Sorry about that.
 * If you have any ideas or suggestions, feel free to comment on the comments section. I appreciate that!
 */

const body = document.getElementById("body");
const moon = document.getElementById("moon");
const themePool = ["light-mode", "dark-mode"];
const themeSwitcher = [null, "moon--set"];
const countTheme = themePool.length;
let currTheme = 0;

let previousComponent = 0;
const navDirect = document.querySelectorAll("#app-nav .header_nav__link");
const arrayNavDirect = Object.assign(navDirect);

// Change style for current active navbar link element.
const handleActiveNav = currIndex => {
  arrayNavDirect[previousComponent].classList.remove("active-link");
  arrayNavDirect[currIndex].classList.add("active-link");
  previousComponent = currIndex;
};

/**
 * Fetch corresponding component asynchronously from the html file with the paths,
 * declared on the dataset attr. in the navbar (stored in navDirect).
 *
 * @param {Object} component dataset DOM map of the target component.
 * @param {int} currIndex target index of components base on the index its stored on "componentSrcList".
 */
const loadComponent = async (component, currIndex) => {
  if (!component?.src) return;
  const target = document.getElementById("app");
  target.innerHTML = await (await fetch(component.src)).text();
  if (component.title) document.title = component.title;
  handleActiveNav(currIndex);
};

/**
 * Create a (likely) Single Page App.
 * Click on the navigation bar element to load the corresponding html code (components).
 *
 * @example click [Blog] → Remove [Gallery]'s html codes from the DOM → Load [Blog]'s html codes.
 */
const SPASimulator = () => {
  navDirect.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (!element.dataset.src) return;
      loadComponent(element.dataset, index).catch(console.error);
    });
  });
};

const toHomePage = () => {
  loadComponent(arrayNavDirect[0]?.dataset, 0);
};

/**
 * An example of change color theme feature.
 *
 * This function can also working with more than 2 themes,
 * just declare global theme css on the array [themePool].
 */
const changeTheme = () => {
  body.classList.remove(themePool[currTheme]);
  moon.classList.remove(themeSwitcher[currTheme]);
  currTheme++;
  if (currTheme === countTheme) {
    currTheme = 0;
  }
  body.classList.add(themePool[currTheme]);
  if (themeSwitcher[currTheme]) moon.classList.add(themeSwitcher[currTheme]);
};

SPASimulator();

// Component no.0 is mounted by default.
loadComponent(arrayNavDirect[0]?.dataset, 0);
