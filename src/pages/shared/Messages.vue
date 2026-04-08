<template>
  <div class="messages-page flex h-[calc(100vh-80px)] bg-background max-w-7xl mx-auto overflow-hidden rounded-2xl border border-border shadow-sm mt-4 mb-8">
    <!-- Left Sidebar: Conversations List -->
    <div :class="[selectedConversation ? 'hidden md:flex' : 'flex', 'w-full md:w-1/3 flex-col border-r border-border bg-card']">
      <!-- Header -->
      <div class="p-4 border-b border-border flex items-center justify-between">
        <h2 class="text-lg font-black text-foreground">Messages</h2>
        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <i class="fas fa-inbox text-sm"></i>
        </div>
      </div>
      
      <!-- List -->
      <div class="flex-1 overflow-y-auto hidden-scroll">
        <div v-if="isLoadingConversations" class="p-4 space-y-4">
          <div v-for="n in 5" :key="n" class="flex gap-3 animate-pulse">
            <div class="w-12 h-12 bg-muted/50 rounded-full"></div>
            <div class="flex-1 space-y-2 py-1">
              <div class="h-4 bg-muted/50 rounded w-1/2"></div>
              <div class="h-3 bg-muted/50 rounded w-5/6"></div>
            </div>
          </div>
        </div>
        
        <div v-else-if="conversations.length === 0" class="p-8 text-center text-muted-foreground">
          <div class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-comments text-2xl text-muted-foreground/50"></i>
          </div>
          <p class="text-sm font-medium">Aucune conversation pour le moment.</p>
        </div>
        
        <div v-else>
          <div v-for="conv in conversations" :key="conv.id" 
               @click="selectConversation(conv)"
               :class="['p-4 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors', 
                       selectedConversation?.id === conv.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent']">
            <div class="flex items-center gap-3">
              <!-- Avatar -->
              <div class="relative">
                <img :src="conv.partner?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + conv.partner?.name" 
                     class="w-12 h-12 rounded-full border border-border object-cover bg-muted" />
                <span v-if="conv.unread_count > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-black">
                  {{ conv.unread_count }}
                </span>
              </div>
              <!-- Preview -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-0.5">
                  <h3 class="text-sm font-bold text-foreground truncate">{{ conv.partner?.name }}</h3>
                  <span class="text-[10px] text-muted-foreground shrink-0 ml-2">
                    {{ formatDateShort(conv.updated_at) }}
                  </span>
                </div>
                <p v-if="conv.servicePost" class="text-[10px] text-secondary font-bold uppercase tracking-wide truncate mb-0.5">
                  <i class="fas fa-tools mr-1"></i> {{ conv.servicePost.title }}
                </p>
                <p :class="['text-xs truncate', conv.unread_count > 0 ? 'font-bold text-foreground' : 'text-muted-foreground']">
                  {{ conv.last_message ? conv.last_message.content : 'Nouvelle conversation' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: Chat Window -->
    <div :class="[!selectedConversation ? 'hidden md:flex' : 'flex', 'w-full md:w-2/3 flex-col bg-background relative']">
      <div v-if="!selectedConversation" class="m-auto text-center p-8">
        <div class="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border">
          <i class="fas fa-paper-plane text-4xl text-primary/30"></i>
        </div>
        <h3 class="text-xl font-black text-foreground mb-2">Vos Messages</h3>
        <p class="text-muted-foreground text-sm max-w-xs mx-auto">Sélectionnez une conversation dans le menu pour commencer à discuter.</p>
      </div>

      <template v-else>
        <!-- Chat Header -->
        <div class="h-[72px] border-b border-border bg-card/50 backdrop-blur-md px-4 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div class="flex items-center gap-3 min-w-0">
            <button @click="selectedConversation = null" class="md:hidden w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-foreground mr-1">
              <i class="fas fa-arrow-left"></i>
            </button>
            <img :src="selectedConversation.partner?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + selectedConversation.partner?.name" 
                 class="w-10 h-10 rounded-full border border-border bg-muted shrink-0" />
            <div class="min-w-0">
              <h3 class="text-sm font-bold text-foreground truncate">{{ selectedConversation.partner?.name }}</h3>
              <p v-if="selectedConversation.servicePost" class="text-[10px] text-muted-foreground truncate flex items-center gap-1">
                <i class="fas fa-briefcase text-secondary"></i> Concerne: {{ selectedConversation.servicePost.title }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
             <button class="w-8 h-8 rounded-full hover:bg-muted text-muted-foreground flex items-center justify-center transition-colors">
               <i class="fas fa-ellipsis-v"></i>
             </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 hidden-scroll bg-gradient-to-b from-transparent to-muted/10 relative" id="message-container">
          <div v-if="isLoadingMessages" class="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <div v-for="msg in messages" :key="msg.id" 
               :class="['flex', msg.sender_id === authStore.user?.id ? 'justify-end' : 'justify-start']">
            <!-- Received Message -->
            <div v-if="msg.sender_id !== authStore.user?.id" class="flex gap-2 max-w-[80%]">
              <img :src="selectedConversation.partner?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + selectedConversation.partner?.name" 
                   class="w-6 h-6 rounded-full mt-auto shrink-0 bg-muted border border-border" />
              <div class="bg-card border border-border text-foreground px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm shadow-sm">
                <p class="whitespace-pre-wrap leading-relaxed">{{ msg.content }}</p>
                <span class="text-[9px] text-muted-foreground block mt-1 opacity-70">{{ formatTime(msg.created_at) }}</span>
              </div>
            </div>
            <!-- Sent Message -->
            <div v-else class="flex flex-col items-end max-w-[80%]">
              <div class="bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl rounded-br-sm text-sm shadow-md">
                <p class="whitespace-pre-wrap leading-relaxed">{{ msg.content }}</p>
              </div>
              <div class="flex items-center gap-1 mt-1 text-[9px] text-muted-foreground">
                <span>{{ formatTime(msg.created_at) }}</span>
                <i :class="['fas fa-check-double', msg.is_read ? 'text-secondary/80' : 'opacity-50']"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-3 bg-card border-t border-border mt-auto shrink-0">
          <form @submit.prevent="sendMessage" class="flex items-end gap-2 bg-muted/30 rounded-2xl border border-border p-1 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <button type="button" class="w-10 h-10 rounded-xl text-muted-foreground hover:bg-muted/80 hover:text-foreground flex items-center justify-center shrink-0">
              <i class="fas fa-paperclip"></i>
            </button>
            <textarea v-model="newMessage" rows="1" placeholder="Écrivez un message..."
                class="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none max-h-32"
                @keydown.enter.prevent="sendMessage"></textarea>
            <button type="submit" :disabled="!newMessage.trim() || isSending"
                class="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all">
              <i v-if="!isSending" class="fas fa-paper-plane text-sm translate-y-[1px] -translate-x-[1px]"></i>
              <i v-else class="fas fa-spinner fa-spin text-sm"></i>
            </button>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useAuthStore } from '../../stores/auth';
import axios from '../../axios';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const conversations = ref([]);
const selectedConversation = ref(null);
const messages = ref([]);
const newMessage = ref('');

const isLoadingConversations = ref(true);
const isLoadingMessages = ref(false);
const isSending = ref(false);

let pollingInterval = null;

const fetchConversations = async () => {
  try {
    const { data } = await axios.get('/api/chat/conversations');
    if (data.success) {
      conversations.value = data.data;
      
      // If a conversation ID was passed in query string, auto-select it
      if (route.query.id && !selectedConversation.value) {
        const target = conversations.value.find(c => c.id == route.query.id);
        if (target) selectConversation(target);
      }
    }
  } catch (err) {
    console.error("Erreur de chargement des conversations", err);
  } finally {
    isLoadingConversations.value = false;
  }
};

const selectConversation = async (conv) => {
  selectedConversation.value = conv;
  messages.value = [];
  newMessage.value = '';
  isLoadingMessages.value = true;
  
  // Update URL silently
  router.replace({ query: { id: conv.id } });

  try {
    const { data } = await axios.get(`/api/chat/conversations/${conv.id}`);
    if (data.success) {
      messages.value = data.data.messages;
      scrollToBottom();
      
      // Mark as read if needed
      if (conv.unread_count > 0) {
        await axios.post(`/api/chat/conversations/${conv.id}/read`);
        conv.unread_count = 0;
      }
    }
  } catch (err) {
    console.error("Erreur de chargement des messages", err);
  } finally {
    isLoadingMessages.value = false;
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim() || isSending.value) return;
  
  const content = newMessage.value;
  newMessage.value = ''; // UI Instant clear
  isSending.value = true;
  
  try {
    const { data } = await axios.post(`/api/chat/conversations/${selectedConversation.value.id}/messages`, {
      content: content
    });
    if (data.success) {
      messages.value.push(data.data);
      scrollToBottom();
      
      // Update preview in list
      const conv = conversations.value.find(c => c.id === selectedConversation.value.id);
      if (conv) {
        conv.last_message = data.data;
        conv.updated_at = data.data.created_at;
        // Bump to top
        conversations.value.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
      }
    }
  } catch (err) {
    console.error("Erreur d'envoi", err);
    newMessage.value = content; // restore on fail
  } finally {
    isSending.value = false;
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.getElementById('message-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('fr-FR', { hour: '2-digit', minute:'2-digit' });
};

const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  if (date.toDateString() === now.toDateString()) return formatTime(dateString);
  if (now.getTime() - date.getTime() < 86400000 * 2) return 'Hier';
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
};

const pollMessages = async () => {
  if (selectedConversation.value) {
    try {
      const { data } = await axios.get(`/api/chat/conversations/${selectedConversation.value.id}`);
      if (data.success && data.data.messages.length > messages.value.length) {
        messages.value = data.data.messages;
        scrollToBottom();
        // Mark as read
        await axios.post(`/api/chat/conversations/${selectedConversation.value.id}/read`);
      }
    } catch(e) {}
  }
  // Refresh list
  try {
      const { data } = await axios.get('/api/chat/conversations');
      if (data.success) {
          conversations.value = data.data;
      }
  } catch(e) {}
};

onMounted(() => {
  fetchConversations();
  pollingInterval = setInterval(pollMessages, 5000); // Polling every 5 sec
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});
</script>

<style scoped>
.hidden-scroll::-webkit-scrollbar {
  display: none;
}
.hidden-scroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
