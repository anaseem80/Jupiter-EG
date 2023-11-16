import ar from "@/localization/json/ar.json";
import en from "@/localization/json/en.json";
import { createI18n } from "vue-i18n";

function loadLocaleMessages() {
  const locales = [{ en: en }, { ar: ar }]
  const messages = {}
  locales.forEach(lang => {
    const key = Object.keys(lang)
    messages[key] = lang[key] 
  })
  return messages
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})

export default i18n;