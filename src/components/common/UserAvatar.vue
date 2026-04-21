<template>
    <div :class="[
        'relative shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center',
        sizeClasses[size] || 'w-10 h-10',
        roundedClasses[rounded] || 'rounded-full',
        border ? 'border-2 border-white shadow-sm' : ''
    ]">
        <img v-if="avatarUrl" :src="avatarUrl" :alt="userName" class="w-full h-full object-cover"
        @error="handleError" />
        <div v-else class="w-full h-full flex items-center justify-center font-bold text-gray-500 uppercase"
        {{ props }}
            :class="textClasses[size] || 'text-sm'" :style="{ backgroundColor: bgColor }">
            {{ initials }}
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    },
    size: {
        type: String,
        default: 'md' // xs, sm, md, lg, xl, 2xl
    },
    rounded: {
        type: String,
        default: 'full' // full, xl, 2xl, none
    },
    border: {
        type: Boolean,
        default: false
    }
});

const imageError = ref(false);

const sizeClasses = {
    'xs': 'w-6 h-6',
    'sm': 'w-8 h-8',
    'md': 'w-10 h-10',
    'lg': 'w-12 h-12',
    'xl': 'w-16 h-16',
    '2xl': 'w-24 h-24',
    '3xl': 'w-32 h-32'
};

const textClasses = {
    'xs': 'text-[8px]',
    'sm': 'text-[10px]',
    'md': 'text-xs',
    'lg': 'text-sm',
    'xl': 'text-base',
    '2xl': 'text-xl',
    '3xl': 'text-3xl'
};

const roundedClasses = {
    'full': 'rounded-full',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    'none': 'rounded-none'
};

const avatarUrl = computed(() => {
    if (imageError.value) return null;
    console.log(props.user);
    
    return props.user?.avatar_url || props.user?.avatar || null;
});

const userName = computed(() => props.user?.name || 'User');

const initials = computed(() => {
    const parts = userName.value.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return userName.value.slice(0, 2).toUpperCase();
});

const bgColor = computed(() => {
    const colors = [
        '#FEE2E2', '#FEF3C7', '#D1FAE5', '#DBEAFE', '#E0E7FF', '#F5F3FF', '#FAE8FF'
    ];
    const index = (userName.value.length + (props.user?.id || 0)) % colors.length;
    return colors[index];
});

const handleError = () => {
    imageError.value = true;
};
</script>
