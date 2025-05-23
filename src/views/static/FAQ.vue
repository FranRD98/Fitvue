<template>
  <div class="bg-gray-100 min-h-screen py-16 px-4">
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 class="text-3xl font-bold text-[var(--color-primary)] mb-8 text-center">
        Preguntas Frecuentes (FAQ)
      </h1>

      <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
        <!-- Pregunta -->
        <button
          @click="toggleFAQ(index)"
          class="w-full flex justify-between items-center text-left bg-[var(--color-bg-light)] p-4 rounded-lg border hover:bg-gray-100 transition"
          :aria-expanded="faq.open"
          :aria-controls="'faq-' + index"
          role="button"
        >
          <span class="font-semibold text-[var(--color-primary)]">{{ faq.question }}</span>
          <svg
            :class="['w-5 h-5 transform transition-transform duration-300', faq.open ? 'rotate-180' : 'rotate-0']"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Respuesta con transición -->
        <transition name="fade-slide">
          <div
            v-show="faq.open"
            :id="'faq-' + index"
            class="px-4 pt-3 pb-4 bg-gray-50 rounded-b-lg border border-t-0 text-gray-700"
          >
            {{ faq.answer }}
          </div>
        </transition>
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
        {
          question: "¿Qué es Fitvue?",
          answer: "Fitvue es una plataforma para el seguimiento del estado físico y bienestar.",
          open: false
        },
        {
          question: "¿Cómo creo una cuenta?",
          answer: "Puedes registrarte con tu correo electrónico y una contraseña segura.",
          open: false
        },
        {
          question: "¿Es gratis el servicio?",
          answer: "Sí, ofrecemos un plan gratuito con opciones premium disponibles.",
          open: false
        },
        {
          question: "¿Puedo cancelar mi suscripción?",
          answer: "Sí, puedes cancelarla en cualquier momento desde tu perfil.",
          open: false
        }
      ]
    };
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
