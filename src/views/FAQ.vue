<template>
    <div class="bg-gray-100 min-h-screen p-6">
      <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-cyan-800 mb-6">Preguntas Frecuentes (FAQ's)</h1>
  
        <div v-for="(faq, index) in faqs" :key="index" class="mb-6">
          <button
            @click="toggleFAQ(index)"
            class="w-full text-left flex justify-between items-center bg-cyan-100 p-4 rounded-lg"
          >
            <span class="text-cyan-900 font-semibold">{{ faq.question }}</span>
            <span :class="faq.open ? 'rotate-180' : ''" class="transition-transform">
              ▼
            </span>
          </button>
          <p v-if="faq.open" class="text-gray-700 p-4 bg-gray-50 rounded-lg mt-2">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FAQs",
    data() {
      return {
        faqs: [
          { question: "¿Qué es Fitvue?", answer: "Fitvue es una plataforma para el seguimiento del estado físico y bienestar.", open: false },
          { question: "¿Cómo creo una cuenta?", answer: "Puedes registrarte con tu correo electrónico y una contraseña segura.", open: false },
          { question: "¿Es gratis el servicio?", answer: "Sí, ofrecemos un plan gratuito con opciones premium disponibles.", open: false },
          { question: "¿Puedo cancelar mi suscripción?", answer: "Sí, puedes cancelarla en cualquier momento desde tu perfil.", open: false },
        ],
      };
    },
    methods: {
      toggleFAQ(index) {
        this.faqs[index].open = !this.faqs[index].open;
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    transition: background 0.2s ease-in-out;
  }
  button:hover {
    background: #b2ebf2;
  }
  </style>
  