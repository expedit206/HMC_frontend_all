<template>
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
        <!-- CHAT WINDOW -->
        <Transition name="slide-up">
            <div v-if="isOpen"
                class="w-[350px] sm:w-[400px] max-h-[90vh] bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-y-scroll mb-2 animate-in fade-in zoom-in duration-300">

                <!-- Header -->
                <div class="p-4 bg-primary text-primary-foreground flex items-center justify-between shadow-md">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <i class="fas fa-robot text-lg"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-sm tracking-tight">Assistant Home Cameroon</h3>
                            <p class="text-[10px] opacity-80 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                Gemini Flash 2.0 • En ligne
                            </p>
                        </div>
                    </div>
                    <button @click="isOpen = false"
                        class="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Messages -->
                <div ref="messageContainer" class=" overflow-y-scroll max-h-[100%] p-4 space-y-4 custom-scrollbar bg-card/50">
                    <div v-for="(msg, idx) in messages" :key="idx"
                        :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">

                        <div v-if="msg.role === 'model'" :class="[
                            'max-w-[85%] p-3 rounded-2xl text-sm shadow-sm animate-in slide-in-from-bottom-2 duration-300',
                            'bg-muted border border-border text-foreground rounded-tl-none prose prose-sm dark:prose-invert prose-p:leading-snug prose-ul:my-1 prose-li:my-0 prose-headings:font-bold prose-headings:mb-1'
                        ]" v-html="renderMarkdown(msg.content)"></div>

                        <div v-else :class="[
                            'max-w-[85%] p-3 rounded-2xl text-sm shadow-sm animate-in slide-in-from-bottom-2 duration-300',
                            'bg-primary text-primary-foreground rounded-tr-none'
                        ]">{{ msg.content }}</div>
                    </div>

                    <!-- Loading / Typing -->
                    <div v-if="isLoading" class="flex justify-start animate-pulse">
                        <div class="bg-muted border border-border p-3 rounded-2xl rounded-tl-none flex gap-1">
                            <span
                                class="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span
                                class="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span class="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"></span>
                        </div>
                    </div>

                    <!-- Suggestions -->
                    <div v-if="messages.length === 1 && !isLoading" class="pt-4 space-y-2">
                        <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Questions
                            fréquentes</p>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="sug in suggestions" :key="sug" @click="sendSuggestion(sug)"
                                class="text-[11px] font-semibold bg-primary/5 text-primary border border-primary/10 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all">
                                {{ sug }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Input -->
                <div class="p-4 border-t border-border bg-card">
                    <form @submit.prevent="sendMessage" class="relative group">
                        <input v-model="userInput" type="text" placeholder="Posez votre question..."
                            class="w-full pr-12 pl-4 py-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:bg-card transition-all"
                            :disabled="isLoading" />
                        <button type="submit" :disabled="!userInput.trim() || isLoading"
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-sm">
                            <i class="fas fa-paper-plane text-xs"></i>
                        </button>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- TRIGGER BUTTON -->
        <button @click="isOpen = !isOpen"
            class="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 hover:scale-110 transition-all border-2 border-card relative group shadow-[0_8px_25px_-5px_rgba(var(--primary-rgb),0.5)]">
            <i
                :class="['fas  text-white  text-2xl transition-transform duration-500', isOpen ? 'fa-times rotate-90' : 'fa-robot']"></i>

            <span v-if="!isOpen"
                class="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-card flex items-center justify-center animate-bounce">
                <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            </span>

            <!-- Tooltip -->
            <div v-if="!isOpen"
                class="absolute right-full mr-4 px-3 py-1.5 bg-card border border-border rounded-xl text-[11px] font-bold text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all shadow-xl pointer-events-none">
                Besoin d'aide ? ✨
            </div>
        </button>
    </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import axios from '@/../axios';
import { marked } from 'marked';

const isOpen = ref(false);
const isLoading = ref(false);
const userInput = ref('');
const messageContainer = ref(null);

const messages = ref([
    { role: 'model', content: 'Bonjour ! Je suis l\'assistant Home Cameroon. Comment puis-je vous aider aujourd\'hui ?' }
]);

const suggestions = [
    "C'est quoi le séquestre ?",
    "Comment vendre un article ?",
    "Comment visiter un logement ?",
    "Quels sont les frais ?",
];

const renderMarkdown = (text) => {
    if (!text) return '';
    return marked.parse(text);
};

const scrollToBottom = async () => {
    await nextTick();
    if (messageContainer.value) {
        messageContainer.value.scrollTo({
            top: messageContainer.value.scrollHeight,
            behavior: 'smooth'
        });
    }
};

const sendMessage = async () => {
    if (!userInput.value.trim() || isLoading.value) return;

    const userText = userInput.value;
    userInput.value = '';

    // Add user message
    messages.value.push({ role: 'user', content: userText });
    await scrollToBottom();

    isLoading.value = true;

    try {
        // Build history for backend (Gemini style)
        // Only keep last 10 messages to avoid huge payload
        const history = messages.value.slice(1, -1).map(m => ({
            role: m.role,
            content: m.content
        }));

        const { data } = await axios.post('/api/ai/chat', {
            message: userText,
            history: history
        });

        if (data.success) {
            messages.value.push({ role: 'model', content: data.data });
        } else {
            throw new Error(data.message || 'Erreur inconnue');
        }
    } catch (err) {
        messages.value.push({
            role: 'model',
            content: 'Désolé, j\'ai un petit souci technique. veuillez réessayer dans un instant ?'
        });
    } finally {
        isLoading.value = false;
        await scrollToBottom();
    }
};

const sendSuggestion = (sug) => {
    userInput.value = sug;
    sendMessage();
};

watch(isOpen, (val) => {
    if (val) scrollToBottom();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--border));
    border-radius: 10px;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}

@keyframes pulse-soft {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse-soft {
    animation: pulse-soft 2s infinite ease-in-out;
}

:deep(.prose p) {
    margin-bottom: 0.5rem;
}
:deep(.prose p:last-child) {
    margin-bottom: 0;
}
:deep(.prose ul) {
    list-style-type: disc;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
}
:deep(.prose ol) {
    list-style-type: decimal;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
}
:deep(.prose li) {
    margin-bottom: 0.25rem;
}
:deep(.prose strong) {
    font-weight: 800;
}
:deep(.prose h1), :deep(.prose h2), :deep(.prose h3), :deep(.prose h4) {
    font-weight: 800;
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
}
</style>
