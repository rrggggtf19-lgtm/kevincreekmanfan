const legacyCopy = {
  'English Muscle': 'Kevin Creekman',
  'englishmuscle7': 'kevincreekman',
  'English Muscle TikTok': 'Kevin Creekman TikTok',
  'English Muscle community': 'Kevin Creekman tattoo community',
  'English Muscle membership': 'Kevin Creekman tattoo support',
  'EM': 'KC',
  'Pet rescue': 'Tattoo dream',
  'pet rescue': 'tattoo dream',
  'rescue.html': 'rescue.html'
};

let pageMarkup = document.body.innerHTML;
Object.entries(legacyCopy).forEach(([oldText, newText]) => {
  pageMarkup = pageMarkup.replaceAll(oldText, newText);
});
pageMarkup = pageMarkup.replaceAll('£', '$');
document.body.innerHTML = pageMarkup;
document.title = document.title.replace('English Muscle', 'Kevin Creekman').replace('Clips', 'TikTok');
document.querySelectorAll('.brand').forEach((brand) => {
  const wordmark = brand.querySelector(':scope > span:last-child');
  if (wordmark) wordmark.innerHTML = 'KEVIN<br><i>CREEKMAN</i>';
});
const paletteStyle = document.createElement('style');
paletteStyle.textContent = ':root{--red:#11110f}.fan-card-purchases{grid-column:1;display:flex;gap:10px;flex-wrap:wrap}.fan-card-purchases .button{margin:0}.fan-card-success{grid-column:1}';
document.head.appendChild(paletteStyle);

const localImages = {
  kevin: ['kev.jpg', 'kev1.webp', 'kev2.webp', 'kev3.jpg', 'kev4.webp'],
  gym: ['gym.jpg', 'gym1.jpg', 'gym2.webp', 'gym3.webp', 'gym4.jpg']
};
const setLocalImage = (image, source, alt) => {
  if (!image) return;
  image.src = source;
  if (alt) image.alt = alt;
};
const imageIndex = (selector, sources, alt) => document.querySelectorAll(selector).forEach((image, index) => setLocalImage(image, sources[index % sources.length], alt));

if (document.querySelector('.hero')) {
  setLocalImage(document.querySelector('.hero-image-wrap img'), localImages.kevin[0], 'Kevin Creekman tattooed portrait');
  setLocalImage(document.querySelector('.profile-image-wrap img'), localImages.kevin[4], 'Kevin Creekman portrait');
  imageIndex('.tiktok-preview-grid img', localImages.kevin.slice(1, 4), 'Kevin Creekman portrait');
  imageIndex('.video-cover img', localImages.gym, 'Kevin Creekman training');
  document.querySelectorAll('.video-card').forEach((card, index) => { card.dataset.image = localImages.gym[index % localImages.gym.length]; });
  setLocalImage(document.querySelector('.story-image img'), localImages.kevin[2], 'Kevin Creekman tattooed portrait');
}
if (document.querySelector('.story-page-intro')) setLocalImage(document.querySelector('.story-image img'), localImages.kevin[3], 'Kevin Creekman tattooed portrait');
if (document.querySelector('.clips-page-section')) {
  imageIndex('.video-cover img', localImages.gym, 'Kevin Creekman training');
  document.querySelectorAll('.video-card').forEach((card, index) => { card.dataset.image = localImages.gym[index % localImages.gym.length]; });
}
if (document.querySelector('.rescue-hero')) {
  setLocalImage(document.querySelector('.rescue-hero img'), localImages.gym[0], 'Kevin Creekman training in the gym');
  imageIndex('.rescue-gallery img', localImages.gym.slice(1), 'Kevin Creekman training');
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const modal = document.querySelector('#videoModal');
const modalImage = document.querySelector('#modalImage');
const modalTitle = document.querySelector('#modalTitle');
const modalCategory = document.querySelector('#modalCategory');
const likeButton = document.querySelector('#likeButton');
const loadMore = document.querySelector('#loadMore');

const contactModal = document.createElement('div');
contactModal.className = 'contact-modal';
contactModal.setAttribute('aria-hidden', 'true');
contactModal.innerHTML = '<div class="contact-modal-backdrop"></div><div class="contact-modal-content" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title"><button class="contact-modal-close" type="button" aria-label="Close contact options">×</button><p class="eyebrow">Continue securely</p><h2 id="contact-modal-title">Choose your<br><em>contact.</em></h2><p class="contact-modal-item"></p><div class="contact-options"><a class="contact-option whatsapp-option" target="_blank" rel="noreferrer"><strong>WhatsApp</strong><span>Message the team ↗</span></a><a class="contact-option signal-option" target="_blank" rel="noreferrer"><strong>Signal</strong><span>Message privately ↗</span></a><a class="contact-option gmail-option"><strong>Gmail</strong><span>Send an email ↗</span></a></div><p class="contact-note">Your message will include what you selected. A payment provider will confirm the final transaction.</p></div>';
document.body.appendChild(contactModal);
const contactItem = contactModal.querySelector('.contact-modal-item');
const closeContactModal = () => { contactModal.classList.remove('open'); contactModal.setAttribute('aria-hidden', 'true'); };
const openContactModal = (item) => {
  const message = `Hello Kevin Creekman team, I would like to purchase or support: ${item}.`;
  const encodedMessage = encodeURIComponent(message);
  contactItem.textContent = item;
  contactModal.querySelector('.whatsapp-option').href = `https://wa.me/13142298844?text=${encodedMessage}`;
  contactModal.querySelector('.signal-option').href = `https://signal.me/#p/+14106984975`;
  contactModal.querySelector('.gmail-option').href = `https://mail.google.com/mail/?view=cm&fs=1&to=k11326818@gmail.com&su=${encodeURIComponent(`Kevin Creekman - ${item}`)}&body=${encodedMessage}`;
  contactModal.classList.add('open');
  contactModal.setAttribute('aria-hidden', 'false');
};
contactModal.querySelector('.contact-modal-close').addEventListener('click', closeContactModal);
contactModal.querySelector('.contact-modal-backdrop').addEventListener('click', closeContactModal);

const homeLink = nav?.querySelector('a');
if (homeLink) {
  homeLink.href = 'index.html';
  homeLink.textContent = 'Home';
  homeLink.classList.toggle('current', window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/'));
}

nav?.querySelector('a[href="clips.html"]')?.remove();
document.querySelector('.header-actions .tiktok-link')?.remove();

if (nav && !nav.querySelector('a[href="rescue.html"]')) {
  const rescueLink = document.createElement('a');
  rescueLink.href = 'rescue.html';
  rescueLink.textContent = 'Tattoo dream';
  nav.appendChild(rescueLink);
}

if (nav) {
  const investmentLink = nav.querySelector('a[href="membership.html"]');
  const existingInvestLink = nav.querySelector('a[href="invest.html"]');
  const isMembershipPage = window.location.pathname.endsWith('membership.html');
  const isInvestPage = window.location.pathname.endsWith('invest.html');
  if (investmentLink && !isMembershipPage && !existingInvestLink) {
    investmentLink.href = 'invest.html';
    investmentLink.textContent = 'Invest';
    investmentLink.classList.toggle('current', isInvestPage);
  } else if (existingInvestLink) {
    existingInvestLink.classList.toggle('current', isInvestPage);
  }
  if (!nav.querySelector('a[href="invest.html"]')) {
    const newInvestmentLink = document.createElement('a');
    newInvestmentLink.href = 'invest.html';
    newInvestmentLink.textContent = 'Invest';
    nav.appendChild(newInvestmentLink);
  }
  if (!nav.querySelector('a[href="membership.html"]')) {
    const membershipLink = document.createElement('a');
    membershipLink.href = 'membership.html';
    membershipLink.textContent = 'Membership';
    nav.appendChild(membershipLink);
  }
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}

if (nav && menuToggle) {
  document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

function openModal(card) {
  if (!modal) return;
  modalImage.src = card.dataset.image;
  modalImage.alt = card.dataset.title;
  modalTitle.textContent = card.dataset.title;
  modalCategory.textContent = `${card.dataset.category} / latest drop`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  likeButton.classList.remove('liked');
  likeButton.innerHTML = '♡ <span>Like this</span>';
}

document.querySelectorAll('.video-card').forEach((card) => card.querySelector('.video-cover').addEventListener('click', () => openModal(card)));
document.querySelectorAll('[data-close]').forEach((element) => element.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
if (likeButton) {
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('liked');
    likeButton.innerHTML = likeButton.classList.contains('liked') ? '♥ <span>Liked</span>' : '♡ <span>Like this</span>';
  });
}

document.querySelectorAll('.filter').forEach((filterButton) => filterButton.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active');
  filterButton.classList.add('active');
  const category = filterButton.dataset.filter;
  document.querySelectorAll('.video-card').forEach((card) => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });
}));

if (loadMore) {
  loadMore.addEventListener('click', () => {
    loadMore.textContent = loadMore.dataset.loaded ? 'That’s all for now' : 'You’re all caught up';
    loadMore.dataset.loaded = 'true';
    loadMore.disabled = true;
    loadMore.style.opacity = '.55';
  });
}

document.querySelectorAll('.join-button').forEach((button) => button.addEventListener('click', () => {
  const plan = button.closest('.membership-card').querySelector('h3').textContent;
  const checkout = document.querySelector('#checkoutPanel');
  const planField = document.querySelector('#checkoutPlan');
  if (checkout && planField) {
    planField.value = plan;
    checkout.classList.add('visible');
  }
  openContactModal(`membership ${plan}`);
}));

document.querySelectorAll('.membership-card h3').forEach((price, index) => {
  price.innerHTML = [`$200<span>/mo</span>`, `$500<span>/mo</span>`, `$1,000<span>/mo</span>`][index];
});

const membershipRewards = [
  ['Member-only TikTok lives', 'Early access to new drops', 'One signed Kevin Creekman shirt'],
  ['Monthly group challenge', 'Priority Q&A questions', 'Two signed Kevin Creekman shirts'],
  ['Behind-the-scenes drops', 'Your name in the monthly roll call', 'Three signed Kevin Creekman shirts', 'One signed guitar', 'Meet and greet with Kevin']
];
document.querySelectorAll('.membership-card').forEach((card, index) => {
  const rewards = membershipRewards[index];
  if (rewards) card.querySelector('ul').innerHTML = rewards.map((reward) => `<li>${reward}</li>`).join('');
});

const checkoutForm = document.querySelector('#checkoutForm');
if (checkoutForm) checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#checkoutSuccess').classList.add('visible');
  openContactModal(`membership ${document.querySelector('#checkoutPlan').value}`);
});

document.querySelectorAll('.amount-options button').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('.amount-options .selected')?.classList.remove('selected');
  button.classList.add('selected');
  document.querySelector('#customAmount').value = button.dataset.amount;
}));

const donationForm = document.querySelector('#donationForm');
if (donationForm) donationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#donationSuccess').classList.add('visible');
  openContactModal(`support donation of $${document.querySelector('#customAmount').value || 'the selected amount'}`);
});

if (document.querySelector('.membership-grid') && !document.querySelector('#checkoutPanel')) {
  const checkoutPanel = document.createElement('form');
  checkoutPanel.id = 'checkoutPanel';
  checkoutPanel.className = 'checkout-panel';
  checkoutPanel.innerHTML = '<p class="eyebrow">Secure checkout</p><h2>Finish your <em>membership.</em></h2><label for="checkoutPlan">Selected plan</label><input id="checkoutPlan" name="plan" readonly><label for="checkoutEmail">Email address</label><input id="checkoutEmail" type="email" placeholder="you@example.com" required><label>Payment method</label><div class="payment-methods"><button type="button" class="payment-method selected">Card</button><button type="button" class="payment-method">PayPal</button><button type="button" class="payment-method">Apple Pay</button></div><button class="button button-yellow" type="submit">Continue to secure payment <span>→</span></button><p class="form-note">Payments are completed by a secure Stripe or PayPal checkout.</p><p class="form-success" id="checkoutSuccess" role="status">Checkout is ready. Connect your payment provider to finish payment.</p>';
  document.querySelector('.membership-section').appendChild(checkoutPanel);
  checkoutPanel.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#checkoutSuccess').classList.add('visible');
  });
  checkoutPanel.querySelectorAll('.payment-method').forEach((method) => method.addEventListener('click', () => {
    checkoutPanel.querySelector('.payment-method.selected').classList.remove('selected');
    method.classList.add('selected');
  }));
}

if (document.querySelector('.clips-page-section') && !document.querySelector('.tiktok-media')) {
  const displayBanner = document.createElement('div');
  displayBanner.className = 'clips-display-banner';
  displayBanner.innerHTML = '<span class="live-dot"></span><strong>NOW PLAYING</strong><span>New tattoo and studio clips from @kevincreekman</span><a href="https://www.tiktok.com/@kevincreekman" target="_blank" rel="noreferrer">Watch live ↗</a>';
  document.querySelector('.clips-page-section').prepend(displayBanner);
  const mediaWall = document.createElement('section');
  mediaWall.className = 'tiktok-media';
  mediaWall.innerHTML = '<div><p class="eyebrow">From the feed / @kevincreekman</p><h2>See it<br><em>taking shape.</em></h2><p>Tattoo details, studio snapshots and the moments behind the finished work.</p><a class="text-link" href="https://www.tiktok.com/@kevincreekman" target="_blank" rel="noreferrer">Open TikTok profile ↗</a></div><div class="media-wall"><a href="https://www.tiktok.com/@kevincreekman" target="_blank" rel="noreferrer"><img src="gym.jpg" alt="Kevin Creekman training"><span>PLAY CLIP ↗</span></a><a href="https://www.tiktok.com/@kevincreekman" target="_blank" rel="noreferrer"><img src="gym1.jpg" alt="Kevin Creekman training"><span>VIEW POST ↗</span></a><a href="https://www.tiktok.com/@kevincreekman" target="_blank" rel="noreferrer"><img src="gym2.webp" alt="Kevin Creekman training"><span>PLAY CLIP ↗</span></a></div>';
  document.querySelector('main').appendChild(mediaWall);
}

if (document.querySelector('.community-details') && !document.querySelector('.fan-card')) {
  const communityStyle = document.createElement('style');
  communityStyle.textContent = '.community-card:before{background-image:url("gym3.webp")}';
  document.head.appendChild(communityStyle);
  const fanCard = document.createElement('section');
  fanCard.className = 'fan-card';
  fanCard.innerHTML = '<div><p class="eyebrow">Supporter card / 001</p><h2>Built by<br><em>the community.</em></h2><p>Follow @kevincreekman, share the work and become part of the people behind the tattoo dream.</p></div><div class="fan-card-mark">KC<br><small>FAN</small></div><div class="fan-card-purchases"><button class="button button-yellow fan-card-purchase" type="button" data-price="$100">Purchase fan card - $100 <span>→</span></button><button class="button button-yellow fan-card-purchase" type="button" data-price="$250">Purchase fan card - $250 <span>→</span></button></div><p class="form-success fan-card-success" role="status">Fan card purchase started. Connect your payment provider to complete checkout.</p>';
  document.querySelector('main').appendChild(fanCard);
  fanCard.querySelectorAll('.fan-card-purchase').forEach((purchaseButton) => purchaseButton.addEventListener('click', () => { fanCard.querySelector('.fan-card-success').classList.add('visible'); openContactModal(`the ${purchaseButton.dataset.price} supporter fan card`); }));
}

if (document.querySelector('.donation-form') && !document.querySelector('.donation-price-note')) {
  const priceNote = document.createElement('p');
  priceNote.className = 'donation-price-note';
  priceNote.textContent = 'Supporter contributions start at $10. Every amount helps.';
  document.querySelector('.donation-form').prepend(priceNote);
}

if (document.querySelector('.membership-hero') && document.querySelector('.membership-grid')) {
  const membershipIntro = document.querySelector('.membership-hero > p:last-child');
  if (membershipIntro) membershipIntro.textContent = 'More ways to follow the work, support the tattoo dream and stay close to @kevincreekman.';
}

if (document.querySelector('.investment-page-hero')) {
  const investmentHero = document.querySelector('.investment-page-hero');
  const investmentOpportunity = document.createElement('section');
  investmentOpportunity.className = 'investment-opportunity';
  investmentOpportunity.setAttribute('aria-labelledby', 'investment-title');
  investmentOpportunity.innerHTML = '<div class="investment-copy"><p class="eyebrow">A chance to take part</p><h2 id="investment-title">Back the<br><em>next chapter.</em></h2><p>Help fund Kevin Creekman\'s tattoo studio, content and creative projects. Selected backers may receive a percentage of future distributable profits, subject to the final round terms and the business\'s performance.</p><div class="investment-points"><div><strong>01</strong><span>Support the creative business</span></div><div><strong>02</strong><span>Share in eligible future profits</span></div><div><strong>03</strong><span>Get updates from behind the scenes</span></div></div></div><form class="investment-form" id="investmentForm"><p class="eyebrow">Register your interest</p><label for="investmentAmount">Amount you could invest</label><div class="investment-input"><span>$</span><input id="investmentAmount" name="amount" type="number" min="100" step="50" placeholder="500" required></div><label for="investmentTarget">Participation target</label><select id="investmentTarget" name="target"><option value="1">1% target participation</option><option value="2">2% target participation</option><option value="5">5% target participation</option></select><button class="button button-yellow" type="submit">Request the opportunity deck <span>↗</span></button><p class="investment-disclaimer">Illustrative only. This is not an offer, guarantee of returns or financial advice. Participation, percentages and eligibility will be set out in formal legal documents.</p><p class="form-success" id="investmentSuccess" role="status">Thanks. Your interest is registered and the opportunity deck request is ready.</p></form>';
  investmentHero.after(investmentOpportunity);
  document.querySelector('#investmentForm').addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#investmentSuccess').classList.add('visible');
      openContactModal(`an investment of $${document.querySelector('#investmentAmount').value || 'an amount to be discussed'}`);
  });
}

if ((document.querySelector('.hero') || document.querySelector('.clips-page-section')) && !document.querySelector('.creator-embed-section')) {
  const creatorSection = document.createElement('section');
  creatorSection.className = 'creator-embed-section';
  creatorSection.innerHTML = '<div><p class="eyebrow">Official account</p><h2>From the<br><em>source.</em></h2><p>See the latest public posts and profile details directly from Kevin’s TikTok.</p><a class="text-link" href="https://www.tiktok.com/@kevincreekman" target="_blank" rel="noreferrer">Open @kevincreekman ↗</a></div><div class="creator-embed"><blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kevincreekman" data-unique-id="kevincreekman" data-embed-from="oembed" data-embed-type="creator"><section><a target="_blank" href="https://www.tiktok.com/@kevincreekman">@kevincreekman</a></section></blockquote></div>';
  document.querySelector('main').appendChild(creatorSection);
  const tiktokScript = document.createElement('script');
  tiktokScript.src = 'https://www.tiktok.com/embed.js';
  tiktokScript.async = true;
  document.body.appendChild(tiktokScript);
}
