<template>
    <DashboardLayout>
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 animate-fadeIn">
                <div>
                    <h1 class="text-3xl font-black text-[#1B0B38] mb-2 flex items-center gap-3">
                        <i class="fas" :class="headerIcon ? headerIcon : 'fa-headset'"></i>
                        {{ title }}
                    </h1>
                    <p class="text-gray-500 text-sm font-medium">
                        {{ subtitle }}
                    </p>
                </div>
                <div class="flex gap-3">
                    <slot name="header-actions"></slot>
                    <button @click="toggleSidebar"
                        class="lg:hidden w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-500 hover:text-[#E54801] transition-colors">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Optional Hero Section -->
            <slot name="hero"></slot>

            <!-- Services / Areas Cards -->
            <div v-if="$slots.services" :class="[servicesGridClass, 'gap-6 mb-12 animate-slide-up']"
                style="animation-delay: 0.1s">
                <slot name="services"></slot>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content Area -->
                <div class="lg:col-span-2 space-y-8 animate-slide-up" style="animation-delay: 0.2s">
                    <slot name="main-content"></slot>

                    <!-- Default FAQ Section if provided -->
                    <div v-if="faqs && faqs.length > 0"
                        class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 class="text-xl font-black text-[#1B0B38] mb-6 flex items-center gap-2">
                            <i class="fas fa-question-circle text-[#E54801]"></i> Questions Fréquentes
                        </h2>
                        <div class="space-y-4">
                            <div v-for="(faq, index) in faqs" :key="index"
                                class="border border-gray-100 rounded-2xl overflow-hidden hover:border-[#E54801] transition-colors">
                                <button @click="faq.open = !faq.open"
                                    class="w-full px-6 py-4 flex items-center justify-between text-left bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                    <span class="font-bold text-[#1B0B38]">{{ faq.question || faq.q }}</span>
                                    <i
                                        :class="['fas fa-chevron-down text-gray-400 transition-transform duration-300', faq.open ? 'rotate-180' : '']"></i>
                                </button>
                                <div v-show="faq.open"
                                    class="px-6 pb-4 pt-2 text-sm text-gray-500 leading-relaxed bg-white">
                                    {{ faq.answer || faq.a }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Area -->
                <div class="space-y-8 animate-slide-up" style="animation-delay: 0.3s">
                    <slot name="sidebar-content"></slot>

                    <!-- Default Contact Block -->
                    <div v-if="showContactParams"
                        class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                        <!-- Accent Line -->
                        <div class="absolute top-0 left-0 w-1.5 h-full bg-[#E54801]"></div>

                        <h3 class="font-black text-[#1B0B38] mb-6 flex items-center gap-2">
                            <i class="fas fa-life-ring text-[#E54801]"></i> Besoin d'aide rapide ?
                        </h3>

                        <div class="space-y-4">
                            <a href="tel:+237600000000"
                                class="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl group hover:bg-[#E54801] transition-colors">
                                <div
                                    class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#E54801] shadow-sm">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <p
                                        class="text-[10px] font-black uppercase tracking-widest text-[#E54801] group-hover:text-white/80 transition-colors">
                                        Appelez-nous</p>
                                    <p class="font-bold text-[#1B0B38] group-hover:text-white transition-colors">+237
                                        600 00 00 00</p>
                                </div>
                            </a>

                            <a href="mailto:support@hmc.cm"
                                class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl group hover:bg-[#1B0B38] transition-colors border border-gray-100">
                                <div
                                    class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1B0B38] shadow-sm">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <p
                                        class="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white/60 transition-colors">
                                        Écrivez-nous</p>
                                    <p class="font-bold text-[#1B0B38] group-hover:text-white transition-colors">
                                        support@hmc.cm</p>
                                </div>
                            </a>
                        </div>

                        <slot name="contact-extra"></slot>
                    </div>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const props = defineProps({
    title: { type: String, default: "Assistance" },
    subtitle: { type: String, default: "Comment pouvons-nous vous aider aujourd'hui ?" },
    headerIcon: { type: String, default: "fa-headset" },
    faqs: { type: Array, default: () => [] },
    showContactParams: { type: Boolean, default: true },
    servicesGridClass: { type: String, default: 'grid grid-cols-1 md:grid-cols-3' }
});

const emit = defineEmits(["toggleSidebar"]);

const toggleSidebar = () => {
    emit("toggleSidebar");
};
</script>

<style scoped>
.animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
}

.animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
