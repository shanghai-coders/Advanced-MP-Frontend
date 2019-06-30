import wxp from '../utils/wxp'

const allowedLanguages = ['en', 'zh']
const defaultLanguage = ['en']

const getStoredLanguage = async () => {
  try {
    const { data } = await wxp.getStorage({ key: 'language' })
    return data
  } catch (error) {
    return null
  }
}

export const setStoredLanguage = async (language) => {
  await wxp.setStorage({ key: 'language', data: language })
}

export const filterLanguage = (newLanguage) => {
  let language = defaultLanguage
  if (allowedLanguages.includes(newLanguage)) {
    language = newLanguage
  }
  return language
}

const getPhoneLanguage = async () => {
  const { language } = await wxp.getSystemInfo()
  return language.split('_').shift().split('-').shift()
}

export const getStoredOrPhoneLanguage = async () => {
  let language = await getStoredLanguage()
  if (!language) {
    language = filterLanguage(await getPhoneLanguage())
  }
  return language
}
