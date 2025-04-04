<template>
    <div class="text-[var(--color-text)]">

      <header class="text-[var(--color-primary)] py-20 text-center bg-white">
        <div class="container mx-auto">
          <h1 class="text-5xl font-extrabold tracking-wide">Sobre FitVue</h1>
          <p class="mt-4 text-lg md:text-xl text-[var(--color-text)]">
            Nuestra misión, visión y el equipo que hay detrás de tu cambio.
          </p>
        </div>
      </header>


      <!-- Nuestra Misión -->
      <section class="px-6 text-center">
        <h2 class="text-4xl font-bold text-[var(--color-primary)] mb-4">Nuestra Misión</h2>
        <p class="text-lg max-w-3xl mx-auto text-[var(--color-text)]">
          En FitVue, te acompañamos en cada paso hacia una vida más saludable con rutinas y planes personalizados que se adaptan a tus metas.
        </p>
      </section>

      <!-- Nuestro Equipo -->
      <section class="bg-[var(--color-primary)] text-white px-6 text-center">
        <h2 class="text-4xl font-bold mb-4">Nuestro Equipo</h2>
        <p class="text-lg max-w-2xl mx-auto mb-12">
          Profesionales en fitness, nutrición y bienestar a tu lado.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <!-- PERSONAL TRAINER CARD -->
          <div class="p-6 rounded-xl shadow-xl text-center bg-white">
            <img src="https://placehold.co/150/005F78/FFF?text=Carlos&font=poppins" alt="Entrenador 1" class="w-42 h-42 mx-auto rounded-full mb-4">
            <h3 class="text-xl font-bold text-[var(--color-primary)]">Carlos Gómez</h3>
            <p class="text-sm text-[var(--color-text)]">Entrenador Personal</p>
          </div>

          <!-- NUTRITIONIST CARD -->
          <div class="p-6 rounded-xl shadow-xl text-center bg-white">
            <img src="https://placehold.co/150/005F78/FFF?text=Laura&font=poppins" alt="Nutricionista 1" class="w-42 h-42 mx-auto rounded-full mb-4">
            <h3 class="text-xl font-bold text-[var(--color-primary)]">Laura Díaz</h3>
            <p class="text-sm text-[var(--color-text)]">Nutricionista deportiva</p>
          </div>

          <!-- COACH CARD -->
          <div class="p-6 rounded-xl shadow-xl text-center bg-white">
            <img src="https://placehold.co/150/005F78/FFF?text=Juan&font=poppins" alt="Coach 1" class="w-42 h-42 mx-auto rounded-full mb-4">
            <h3 class="text-xl font-bold text-[var(--color-primary)]">Juan Perez</h3>
            <p class="text-sm text-[var(--color-text)]">Coach de bienestar integral</p>
          </div>

        </div>
      </section>

      <!-- Nuestros Valores -->
      <section class="py-20 px-6 text-[var(--color-text)] text-center">
        <h2 class="text-4xl font-bold mb-4 text-[var(--color-primary)]">Nuestros Valores</h2>
        <p class="text-lg max-w-3xl mx-auto mb-10">Principios que guían todo lo que hacemos.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <!-- Compromiso -->
          <div class="bg-white p-6 rounded-xl shadow">
            <h3 class="text-xl font-bold text-[var(--color-primary)]">Compromiso</h3>
            <p class="mt-2 text-sm">Estamos contigo en cada paso de tu cambio.</p>
          </div>

          <!-- Adaptabilidad -->
          <div class="bg-white p-6 rounded-xl shadow">
            <h3 class="text-xl font-bold text-[var(--color-primary)]">Adaptabilidad</h3>
            <p class="mt-2 text-sm">Nos ajustamos a tus necesidades, adaptando los planes de entrenamiento a tu ritmo y posibilidades.</p>
          </div>

          <!-- Empoderamiento -->
          <div class="bg-white p-6 rounded-xl shadow">
            <h3 class="text-xl font-bold text-[var(--color-primary)]">Empoderamiento</h3>
            <p class="mt-2 text-sm">Queremos que tomes el control de tu bienestar y te ayudes a sentirte bien tanto física como mentalmente.</p>
          </div>

        </div>
      </section>
    
    </div>
  </template>