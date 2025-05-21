<script setup>
import PlanCard from '@/components/home/PlanCard.vue'

const plans = [
  {
    title: 'Plan Gratuito',
    price: '0€/mes',
    highlighted: false,
    buttonText: 'Empezar',
    features: [
      { label: 'Acceso a rutinas básicas', active: true },
      { label: 'Acceso a la herramienta de progreso', active: true },
      { label: 'Rutinas personalizadas', active: false },
      { label: 'Dietas personalizadas', active: false },
      { label: 'Seguimiento avanzado', active: false },
      { label: 'Acceso a la comunidad', active: false },
    ]
  },
  {
    title: 'Plan Avanzado',
    price: '€39.99/mes',
    highlighted: true,
    buttonText: 'Empezar',
    features: [
      { label: 'Acceso a rutinas básicas', active: true },
      { label: 'Acceso a la herramienta de progreso', active: true },
      { label: 'Rutinas personalizadas', active: true },
      { label: 'Dietas personalizadas', active: false },
      { label: 'Seguimiento avanzado', active: false },
      { label: 'Acceso a la comunidad', active: false },
    ]
  },
  {
    title: 'Plan Premium',
    price: '€59.99/mes',
    highlighted: false,
    buttonText: 'Empezar',
    features: [
    { label: 'Acceso a rutinas básicas', active: true },
      { label: 'Acceso a la herramienta de progreso', active: true },
      { label: 'Rutinas personalizadas', active: true },
      { label: 'Dietas personalizadas', active: true },
      { label: 'Seguimiento avanzado', active: true },
      { label: 'Acceso a la comunidad', active: true },
    ]
  }
]
</script>

<template>
  <section class="bg-[#f3f6f8]">
    <div class="max-w-7xl mx-auto px-6 py-20 text-center">

    <h2 class="text-4xl font-semibold text-[var(--color-primary)] mb-12">Nuestros Planes</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
      <PlanCard
        v-for="(plan, i) in plans"
        :key="i"
        v-bind="plan"
      />
    </div>
  </div>
  </section>
</template>
