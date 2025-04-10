<script setup>
import { ref, onMounted, watch } from 'vue'

    // Props y eventos
    const props = defineProps({
        show: Boolean,
    })
    const emit = defineEmits(['close', 'saved'])

    const step = ref(0)

    const userData = {
        weight: '',
        neck: '',
        shoulders: '',
        chest: '',
        biceps_relaxed: '',
        biceps_flexed: '',
        forearm: '',
        wrist: '',
        waist: '',
        abdomen: '',
        hips: '',
        quadriceps: '',
        calves: ''
    }
    

    const nextStep = () => {
        if (step.value < 14) {
            step.value++
        } else {
            alert('fin')
        }
    }

    const previousStep = () => {
        if (step.value > 0) step.value--
    }

</script>

<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            
            <!-- STEPS -->
            <div class="mb-8">
                <!-- STEP 1 - BEFORE START -->
                <div v-if="step === 0" key="step0">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Recuerda que debes estar en ayunas y lo ideal es siempre en ropa interior.</label>
                        </div>                      
                    </div>
                </div>

                <!-- STEP 2 - WEIGHT -->
                <div v-if="step === 1" key="step1">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Peso</label>
                            <input v-model.string="userData.weight" type="text" class="w-full border p-2 rounded-lg" placeholder="Peso" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 3 - NECK -->
                <div v-if="step === 2" key="step2">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Cuello</label>
                            <input v-model.string="userData.neck" type="text" class="w-full border p-2 rounded-lg" placeholder="Cuello" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 4 - WEIGHT -->
                <div v-if="step === 3" key="step3">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Hombros</label>
                            <input v-model.string="userData.shoulders" type="text" class="w-full border p-2 rounded-lg" placeholder="Hombros" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 5 - CHEST -->
                <div v-if="step === 4" key="step4">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Pecho</label>
                            <input v-model.string="userData.chest" type="text" class="w-full border p-2 rounded-lg" placeholder="Pecho" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 6 - BICEPS RELAXED -->
                <div v-if="step === 5" key="step5">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Biceps Relajado</label>
                            <input v-model.string="userData.biceps_relaxed" type="text" class="w-full border p-2 rounded-lg" placeholder="Biceps Relajado" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 7 - BICEPS FLEXED -->
                <div v-if="step === 6" key="step6">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Biceps Contraído</label>
                            <input v-model.string="userData.biceps_flexed" type="text" class="w-full border p-2 rounded-lg" placeholder="Biceps Contraído" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 8 - Forearm -->
                <div v-if="step === 7" key="step7">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Antebrazo</label>
                            <input v-model.string="userData.forearm" type="text" class="w-full border p-2 rounded-lg" placeholder="Antebrazo" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 9 - WEIGHT -->
                <div v-if="step === 8" key="step8">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Muñeca</label>
                            <input v-model.string="userData.wrist" type="text" class="w-full border p-2 rounded-lg" placeholder="Muñeca" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 10 - WAIST -->
                <div v-if="step === 9" key="step9">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Cintura (encima del ombligo)</label>
                            <input v-model.string="userData.waist" type="text" class="w-full border p-2 rounded-lg" placeholder="Cintura" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 11 - ABDOMEN -->
                <div v-if="step === 10" key="step10">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Abdomen (Ombligo)</label>
                            <input v-model.string="userData.abdomen" type="text" class="w-full border p-2 rounded-lg" placeholder="Abdomen" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 12 - HIPS -->
                <div v-if="step === 11" key="step11">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Cadera</label>
                            <input v-model.string="userData.hips" type="text" class="w-full border p-2 rounded-lg" placeholder="Cadera" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 13 - QUADRICEPS -->
                <div v-if="step === 12" key="step12">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Cuadriceps</label>
                            <input v-model.string="userData.quadriceps" type="text" class="w-full border p-2 rounded-lg" placeholder="Cuadriceps" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 14 - CALVES -->
                <div v-if="step === 13" key="step13">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">Gemelos</label>
                            <input v-model.string="userData.calves" type="text" class="w-full border p-2 rounded-lg" placeholder="Gemelos" />
                        </div>                      
                    </div>
                </div>

                <!-- STEP 15 - CONFIRM -->
                <div v-if="step === 14" key="step14">
                    <div class="flex items-center gap-8">
                        <div>
                            <img src="https://placehold.co/600x400"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="block text-gray-600 mb-2 ">¿Todo preparado?</label>
                        </div>                      
                    </div>
                </div>

            </div>

            <!-- ACTIONS -->
            <div>
                <button v-if="step > 0" @click="previousStep" class="bg-gray-300 px-4 py-2 rounded-lg">
                    Atrás
                </button>
                <button @click="nextStep" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded-full">
                    {{ step < 14 ? 'Siguiente' : 'Calcular' }}
                </button>
            </div>
             
        </div>

    </div>
</template>