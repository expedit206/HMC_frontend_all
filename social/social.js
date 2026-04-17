document.addEventListener('DOMContentLoaded',()=>{
  // --- Données simulées ---
  const users = [
    { id: 1, name: 'Vous', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', isMe: true },
    { id: 2, name: 'Sarah N.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Paul K.', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: 4, name: 'Amina T.', avatar: 'https://randomuser.me/api/portraits/women/46.jpg' },
    { id: 5, name: 'Jean M.', avatar: 'https://randomuser.me/api/portraits/men/50.jpg' },
    { id: 6, name: 'Marie C.', avatar: 'https://randomuser.me/api/portraits/women/50.jpg' },
    { id: 7, name: 'Fabrice B.', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
    { id: 8, name: 'Etienne T.', avatar: 'https://randomuser.me/api/portraits/men/70.jpg' },
  ];
  
  let posts = [
    {
      id: 1,
      author: users[7],
      content: "🏢 Nouvelle résidence de luxe lancée à Yaoundé ! Les ventes commencent ce mois-ci. Venez découvrir nos 150 appartements de haut standing avec vue panoramique sur la ville. Facilités de paiement disponibles. #Immobilier #Cameroun #Yaoundé",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 120,
      likes: [1, 2, 3, 4, 5],
      comments: [
        { id: 1, author: users[2], text: "Intéressant ! Quels sont les prix ?", createdAt: Date.now() - 1000 * 60 * 110, replies: [] },
        { id: 2, author: users[5], text: "C'est magnifique, compliments !", createdAt: Date.now() - 1000 * 60 * 100, replies: [] },
      ],
    },
    {
      id: 2,
      author: users[1],
      content: "Journée parfaite à la plage de Kribi ! Le soleil, la mer, les copains... c'est ça la vie ! ☀️🏖️ Qui vient nous rejoindre ce week-end ?",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 150,
      likes: [2, 3, 4],
      comments: [
        { id: 1, author: users[0], text: "Ça donne envie !", createdAt: Date.now() - 1000 * 60 * 140, replies: [] },
      ],
    },
    {
      id: 3,
      author: users[3],
      content: "Conférence sur l'investissement immobilier 📊 Demain à 14h à Douala. Intervenants: experts du secteur et success stories. Entrée libre ! Inscription en ligne sur notre site. #Formation #Immobilier",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 180,
      likes: [1, 2, 4, 5, 6],
      comments: [
        { id: 1, author: users[2], text: "Je serais présent !", createdAt: Date.now() - 1000 * 60 * 170, replies: [] },
      ],
    },
    {
      id: 4,
      author: users[4],
      content: "💡 5 conseils pour bien investir dans l'immobilier au Cameroun :\n\n1️⃣ Bien choisir la localisation\n2️⃣ Faire une étude de marché\n3️⃣ S'entourer d'experts\n4️⃣ Penser long terme\n5️⃣ Vérifier les documents légaux\n\nPartagez vos expériences en commentaire ! 👇",
      image: null,
      video: null,
      createdAt: Date.now() - 1000 * 60 * 200,
      likes: [1, 2, 3, 4, 5, 6, 7],
      comments: [
        { id: 1, author: users[0], text: "Excellent article ! Je partage avec ma famille.", createdAt: Date.now() - 1000 * 60 * 190, replies: [] },
        { id: 2, author: users[5], text: "Le conseil #3 est très important, merci !", createdAt: Date.now() - 1000 * 60 * 180, replies: [] },
      ],
    },
    {
      id: 5,
      author: users[2],
      content: "Visite de chantier réussie ! 🏗️ Avancement à 70% du projet. Les infrastructures se développent bien. Rendez-vous à la prochaine étape ! #ConstructionLive",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 240,
      likes: [1, 3, 4, 6],
      comments: [],
    },
    {
      id: 6,
      author: users[6],
      content: "🎉 Grand succès ! Nous avons fermé 50 transactions ce mois-ci. Merci à tous nos clients, partenaires et équipe ! On continue sur cette lancée 💪 #MilestoneReached",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 280,
      likes: [1, 2, 3, 4, 5, 6, 7],
      comments: [
        { id: 1, author: users[1], text: "Félicitations ! Très inspirant !", createdAt: Date.now() - 1000 * 60 * 270, replies: [] },
      ],
    },
    {
      id: 7,
      author: users[5],
      content: "Nouveau quartier résidentiel en développement à Limbe 🏘️ Espaces verts, routes bitumées, électricité, eau courante. C'est le moment d'investir ! #NouveauProjet",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 320,
      likes: [1, 2, 3, 4],
      comments: [
        { id: 1, author: users[3], text: "Pourriez-vous m'envoyer plus d'infos ?", createdAt: Date.now() - 1000 * 60 * 310, replies: [] },
      ],
    },
    {
      id: 8,
      author: users[0],
      content: "Interview exclusive avec le directeur de Home Cameroon 🎥 Découvrez sa vision pour l'immobilier au Cameroun. Regardez la vidéo complète en cliquant ci-dessous.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      createdAt: Date.now() - 1000 * 60 * 360,
      likes: [2, 3, 4, 5, 6, 7],
      comments: [
        { id: 1, author: users[1], text: "Très intéressant, merci pour cette vidéo !", createdAt: Date.now() - 1000 * 60 * 350, replies: [] },
        { id: 2, author: users[4], text: "Belle initiative pour communiquer !", createdAt: Date.now() - 1000 * 60 * 340, replies: [] },
      ],
    },
    {
      id: 9,
      author: users[4],
      content: "Offre spéciale : 20% de réduction sur les terrains à Bambili jusqu'à la fin du mois ! 🏷️ Surface de 300m² à 500m² disponibles. Contactez-nous rapidement ! #PromoFin mois",
      image: null,
      video: null,
      createdAt: Date.now() - 1000 * 60 * 400,
      likes: [1, 2, 3, 4, 5],
      comments: [
        { id: 1, author: users[6], text: "Excellent ! Je suis intéressé", createdAt: Date.now() - 1000 * 60 * 390, replies: [] },
      ],
    },
    {
      id: 10,
      author: users[3],
      content: "❓ Questionnaire : Quel est votre rêve immobilier ?\n\n🏠 Une maison avec jardin\n🏢 Un immeuble de rapport\n🏖️ Une résidence de vacances\n🏗️ Un terrain à développer\n\nVotez en commentaire ! 👇",
      image: null,
      video: null,
      createdAt: Date.now() - 1000 * 60 * 440,
      likes: [1, 2, 3, 4],
      comments: [
        { id: 1, author: users[0], text: "Une maison avec jardin pour moi !", createdAt: Date.now() - 1000 * 60 * 430, replies: [] },
        { id: 2, author: users[5], text: "Un immeuble de rapport", createdAt: Date.now() - 1000 * 60 * 420, replies: [] },
      ],
    },
    {
      id: 11,
      author: users[1],
      content: "Weekend en famille à Buea 🏔️ L'air frais, la nature, les amis... Rien de mieux ! #FamilyTime #Buea",
      image: "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 480,
      likes: [2, 3, 4],
      comments: [],
    },
    {
      id: 12,
      author: users[6],
      content: "📚 Webinaire gratuit : Les tendances 2026 de l'immobilier camerounais\n\n📅 Date : 25 janvier à 18h30\n🎯 Thèmes : Marché, investissement, financement\n👥 Formateurs : Experts du secteur\n\nS'inscrire : [lien]\n\n#Formation #Immobilier2026",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 520,
      likes: [1, 2, 3, 4, 5, 6],
      comments: [
        { id: 1, author: users[2], text: "Je serais présent ! C'est important", createdAt: Date.now() - 1000 * 60 * 510, replies: [] },
      ],
    },
    {
      id: 13,
      author: users[5],
      content: "Avant/Après : Transformation d'un terrain en habitations modernes ! 📸 Quel progrès ! Nous restons engagés pour la qualité. #RealEstate #Transformation",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 560,
      likes: [1, 2, 3, 4, 5, 6, 7],
      comments: [
        { id: 1, author: users[1], text: "Splendide !", createdAt: Date.now() - 1000 * 60 * 550, replies: [] },
      ],
    },
    {
      id: 14,
      author: users[2],
      content: "Visite guidée de nos nouveaux bureaux de représentation à Edea ! 🏢 Moderne, accueillant et bien équipé. Bienvenue dans notre équipe !",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 600,
      likes: [1, 2, 3, 4, 5],
      comments: [],
    },
    {
      id: 15,
      author: users[7],
      content: "💼 Nous recrutons ! Postes disponibles :\n- Agents immobiliers\n- Architectes\n- Commerciaux\n- Community managers\n\nEnvoyez votre CV et lettre de motivation à : recrutement@homecameroon.cm\n\n#Recrutement #Emploi",
      image: null,
      video: null,
      createdAt: Date.now() - 1000 * 60 * 640,
      likes: [1, 2, 3, 4],
      comments: [
        { id: 1, author: users[3], text: "Je suis intéressé par le poste d'agent immobilier !", createdAt: Date.now() - 1000 * 60 * 630, replies: [] },
      ],
    },
    {
      id: 16,
      author: users[4],
      content: "Succès client : De la recherche à la clé en 3 mois ! 🔑 Merci à notre équipe et au couple pour leur confiance. Votre maison vous attend ! #ClientHeureux",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 680,
      likes: [1, 2, 3, 4, 5, 6, 7],
      comments: [
        { id: 1, author: users[0], text: "Magnifique résultat !", createdAt: Date.now() - 1000 * 60 * 670, replies: [] },
      ],
    },
    {
      id: 17,
      author: users[3],
      content: "🌍 Expansion internationale ! Home Cameroon ouvre ses portes au Gabon et en Guinée Équatoriale. Nous sommes fiers d'apporter notre expertise au-delà de nos frontières ! #Expansion #NewMarkets",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 720,
      likes: [1, 2, 3, 4, 5, 6, 7],
      comments: [
        { id: 1, author: users[5], text: "Félicitations pour cette belle évolution !", createdAt: Date.now() - 1000 * 60 * 710, replies: [] },
      ],
    },
    {
      id: 18,
      author: users[1],
      content: "Moment zen au spa après une longue semaine 🧘‍♀️ Se détendre c'est important ! Qui d'autre aime se relaxer ?",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 760,
      likes: [2, 3],
      comments: [],
    },
    {
      id: 19,
      author: users[6],
      content: "🏆 Nous avons reçu le prix du 'Meilleur Développeur Immobilier 2025' ! 🎖️ Un honneur qui nous pousse à toujours mieux faire. Merci à tous ! #Award #Excellence",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 800,
      likes: [1, 2, 3, 4, 5, 6, 7],
      comments: [
        { id: 1, author: users[0], text: "Bien mérité !", createdAt: Date.now() - 1000 * 60 * 790, replies: [] },
      ],
    },
    {
      id: 20,
      author: users[5],
      content: "Portes ouvertes ce samedi ! 🚪 Visitez nos 5 sites en construction. Équipe présente pour répondre à toutes vos questions. À bientôt ! #PortesOuvertes",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      video: null,
      createdAt: Date.now() - 1000 * 60 * 840,
      likes: [1, 2, 3, 4],
      comments: [
        { id: 1, author: users[3], text: "Je serai là avec ma famille !", createdAt: Date.now() - 1000 * 60 * 830, replies: [] },
      ],
    },
  ];
  
  const me = users[0];
  
  // --- Helpers ---
  function timeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return `il y a ${diff}s`;
    if (diff < 3600) return `il y a ${Math.floor(diff/60)} min`;
    if (diff < 86400) return `il y a ${Math.floor(diff/3600)} h`;
    return new Date(ts).toLocaleDateString();
  }
  function escapeHtml(s) {
    return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('\n','<br>');
  }
  
  // --- Rendering ---
  function renderFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    posts.sort((a,b)=>b.createdAt-a.createdAt).forEach(post => {
      feed.appendChild(renderPost(post));
    });
  }
  
  function renderPost(post) {
    const article = document.createElement('article');
    article.className = 'post border-b border-gray-200 p-4 hover:bg-gray-50 transition';
    article.innerHTML = `
      <header class="post-header flex gap-3 items-start mb-3">
        <img src="${post.author.avatar}" class="post-avatar w-10 h-10 rounded-full border-2 border-hc-primary flex-shrink-0" />
        <div class="post-author-info flex-1 flex items-center justify-between">
          <div>
            <div class="post-author-name">${post.author.name}</div>
            <div class="post-author-meta text-xs text-gray-500">${timeAgo(post.createdAt)}</div>
          </div>
          <button class="text-gray-400 hover:text-gray-600"><i class="fa fa-ellipsis-h"></i></button>
        </div>
      </header>
      <div class="post-body mb-3 whitespace-pre-wrap">${escapeHtml(post.content)}</div>
      ${post.image ? `<img src="${post.image}" class="post-image w-full rounded-lg mb-3 max-h-96 object-cover" alt="Post image" />` : ''}
      ${post.video ? `<div class="mb-3 rounded-lg overflow-hidden bg-black"><iframe width="100%" height="250" src="${post.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` : ''}
      <div class="post-footer flex gap-3 text-gray-700 border-t border-gray-200 pt-2">
        <button class="like-btn post-action-btn flex items-center justify-center gap-1 flex-1 ${post.likes.includes(me.id)?'text-hc-primary liked':''}"><i class="fa fa-heart"></i> <span class="text-sm">${post.likes.length}</span></button>
        <button class="comment-btn post-action-btn flex items-center justify-center gap-1 flex-1"><i class="fa fa-comment"></i> <span class="text-sm">${post.comments.length}</span></button>
        <button class="share-btn post-action-btn flex items-center justify-center gap-1 flex-1"><i class="fa fa-share"></i> <span class="text-sm">Partager</span></button>
      </div>
      <div class="comments mt-4 space-y-3">
        ${post.comments.slice(0, 3).map(c=>renderCommentHtml(c, post.id)).join('')}
        ${post.comments.length > 3 ? `<button class="text-hc-primary font-semibold text-sm">Voir les ${post.comments.length - 3} autres commentaires</button>` : ''}
        <form class="comment-form flex gap-2 mt-3">
          <img src="${me.avatar}" class="w-8 h-8 rounded-full flex-shrink-0" alt="Avatar" />
          <input type="text" class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hc-primary" placeholder="Commenter..." />
        </form>
      </div>
    `;
    
    // Like
    article.querySelector('.like-btn').onclick = () => {
      if (post.likes.includes(me.id)) post.likes = post.likes.filter(id=>id!==me.id);
      else post.likes.push(me.id);
      renderFeed();
    };
    
    // Comment
    article.querySelector('.comment-form').onsubmit = e => {
      e.preventDefault();
      const input = article.querySelector('.comment-form input');
      const text = input.value.trim();
      if (!text) return;
      post.comments.unshift({ id: Date.now(), author: me, text, createdAt: Date.now(), replies: [] });
      input.value = '';
      renderFeed();
    };
    
    // Share
    article.querySelector('.share-btn').onclick = () => {
      alert('Lien du post copié dans le presse-papiers !');
    };
    
    // Réponses aux commentaires
    article.querySelectorAll('.reply-btn').forEach(btn => {
      btn.onclick = () => {
        const cid = btn.getAttribute('data-cid');
        const c = post.comments.find(c=>c.id==cid);
        const reply = prompt('Votre réponse :');
        if (reply) {
          c.replies.push({ id: Date.now(), author: me, text: reply, createdAt: Date.now() });
          renderFeed();
        }
      };
    });
    
    return article;
  }
  
  function renderCommentHtml(c, postId) {
    return `
      <div class="comment flex gap-2 items-start">
        <img src="${c.author.avatar}" class="comment-avatar w-8 h-8 rounded-full flex-shrink-0" alt="Avatar" />
        <div class="flex-1 min-w-0">
          <div class="comment-content bg-gray-100 rounded-lg px-3 py-2 text-sm">
            <span class="comment-author font-semibold text-gray-900">${c.author.name}</span>
            <br>
            <span class="comment-text text-gray-800">${escapeHtml(c.text)}</span>
          </div>
          <div class="flex gap-3 mt-1 ml-2 text-xs">
            <span class="comment-time text-gray-500">${timeAgo(c.createdAt)}</span>
            <button class="reply-btn text-hc-primary font-semibold hover:underline" data-cid="${c.id}">Répondre</button>
          </div>
          ${c.replies && c.replies.length ? `<div class="ml-6 mt-2 space-y-2">${c.replies.map(r=>renderReplyHtml(r)).join('')}</div>` : ''}
        </div>
      </div>
    `;
  }
  
  function renderReplyHtml(r) {
    return `<div class="comment flex gap-2 items-start">
      <img src="${r.author.avatar}" class="comment-avatar w-7 h-7 rounded-full flex-shrink-0" alt="Avatar" />
      <div class="flex-1 min-w-0">
        <div class="comment-content bg-gray-100 rounded-lg px-3 py-2 text-xs">
          <span class="comment-author font-semibold text-gray-900">${r.author.name}</span>
          <br>
          <span class="comment-text text-gray-800">${escapeHtml(r.text)}</span>
        </div>
        <div class="flex gap-3 mt-1 ml-2 text-xs">
          <span class="comment-time text-gray-500">${timeAgo(r.createdAt)}</span>
        </div>
      </div>
    </div>`;
  }
  
  // --- Création de post ---
  const btnPost = document.getElementById('btn-post');
  const postText = document.getElementById('post-text');
  const imageInput = document.getElementById('image-input');
  
  let imageData = null;
  imageInput.addEventListener('change',e=>{
    const file = e.target.files[0];
    if (!file) return imageData=null;
    const reader = new FileReader();
    reader.onload = ev => { imageData = ev.target.result; };
    reader.readAsDataURL(file);
  });
  
  btnPost.addEventListener('click',()=>{
    const text = postText.value.trim();
    if (!text && !imageData) return alert('Écrivez ou ajoutez une image.');
    posts.unshift({
      id: Date.now(),
      author: me,
      content: text,
      image: imageData,
      createdAt: Date.now(),
      likes: [],
      comments: [],
    });
    postText.value = '';
    imageInput.value = '';
    imageData = null;
    renderFeed();
  });
  
  renderFeed();
});
