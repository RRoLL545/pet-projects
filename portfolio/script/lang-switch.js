import i18n from "../assets/i18n.js";

/**
 * Gets requested language and run language switching procedure
 * @param {*} e event
 */
export const getLang = (e) => {
  if (!e.target.classList.contains('lang-switch__button_active')) return;
  const lang = e.target.dataset.lang;
  switchLang(lang);

  const langSwitchBtns = document.querySelectorAll('.lang-switch__button');
  langSwitchBtns.forEach(btn => btn.classList.toggle('lang-switch__button_active'));
}

/**
 * switch current text of items to requested language text
 * @param {string} lang - language name
 */
export const switchLang = (lang) => {
  const langSwitchItems = document.querySelectorAll('[data-i18n]');
  langSwitchItems.forEach(item => {
    if (item.placeholder) {
      item.placeholder = i18n[lang][item.dataset.i18n];
      item.value = '';
    }
    if (item.dataset.i18n === 'send-message') item.value = i18n[lang][item.dataset.i18n];
    item.textContent = i18n[lang][item.dataset.i18n];
  })
}