import { TranslationType } from '../schema';

const tr: TranslationType = {
  sections: {
    experience: "Deneyim",
    education: "Eğitim",
    blog: "Blog",
    contact: "İletişim",
    skills: "Yetenekler"
  },
  contact: {
    info: "İletişim Bilgileri",
    sendMessage: "Mesaj Gönder",
    form: {
      name: "Ad Soyad",
      email: "E-posta",
      phone: "Telefon",
      phoneOptional: "opsiyonel",
      message: "Mesaj",
      send: "Gönder",
      sending: "Gönderiliyor..."
    },
    success: "Mesajınız başarıyla gönderildi.",
    error: "Mesaj gönderilirken bir hata oluştu."
  },
  blog: {
    readMore: "Devamını oku",
    loading: "Blog yazıları yükleniyor...",
    noPosts: "Henüz blog yazısı yok.",
    readingTime: {
      minute: "dakika",
      minutes: "dakika"
    },
    aria: {
      coverImage: "için kapak görseli",
      readPost: "Blog yazısını oku"
    }
  },
  theme: {
    dark: "Koyu",
    light: "Açık"
  },
  experience: {
    current: "Günümüz",
    fullTime: "Tam Zamanlı"
  },
  skills: {
    showAll: "Tüm Yetenekleri Göster",
    showLess: "Daha Az Göster"
  },
  error: {
    title: "Bir Hata Oluştu",
    message: "Üzgünüz, bir şeyler yanlış gitti.",
    retry: "Tekrar Dene"
  }
};

export default tr; 