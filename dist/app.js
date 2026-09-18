const examples = {
  property: {
    title: 'A property enquiry.<br>A follow-up that happens.',
    description: 'A buyer asks about a listing. The enquiry goes straight into your CRM, with the property details and an assigned agent.',
    outcome: 'The agent starts with the conversation, not the data entry.',
    steps: [['Capture the enquiry', 'Contact and property details saved together'], ['Assign the agent', 'The right person receives the enquiry'], ['Schedule the follow-up', 'A next action is added to the CRM']]
  },
  services: {
    title: 'The work is approved.<br>The invoice is ready to review.',
    description: 'A project manager approves a milestone. The agreed project details create an invoice draft for finance to check before it is sent.',
    outcome: 'Finance can review the invoice without chasing the project team.',
    steps: [['Confirm the milestone', 'Project owner approves the completed work'], ['Prepare the invoice draft', 'Agreed details are passed to finance'], ['Schedule a payment reminder', 'Follow up after the approved invoice is sent']]
  },
  trading: {
    title: 'Stock is running low.<br>Purchasing knows what to do.',
    description: 'An item reaches the stock level you set. Purchasing receives an alert and a reorder request is prepared for a manager to approve.',
    outcome: 'The team sees the shortage and the next step in the same place.',
    steps: [['Check the stock threshold', 'An item reaches your chosen minimum'], ['Prepare the reorder request', 'Purchasing receives the relevant details'], ['Route it for approval', 'A manager reviews before an order is placed']]
  }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function showExample(key) {
  const item = examples[key];
  document.getElementById('workflow-number').textContent = 'EXAMPLE / 0' + (Object.keys(examples).indexOf(key) + 1);
  document.getElementById('example-title').innerHTML = item.title;
  document.getElementById('example-description').textContent = item.description;
  document.getElementById('example-outcome').textContent = item.outcome;
  document.getElementById('example-steps').innerHTML = item.steps.map((step, i) => `<div class="step"><span>0${i + 1}</span><div><strong>${step[0]}</strong><small>${step[1]}</small></div></div>`).join('');
  document.getElementById('example-panel').setAttribute('aria-labelledby', 'tab-' + key);
  tabs.forEach(tab => { const active = tab.dataset.example === key; tab.setAttribute('aria-selected', active); tab.tabIndex = active ? 0 : -1; });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => showExample(tab.dataset.example));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (i + 1) % tabs.length;
    if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (i + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); showExample(tabs[next].dataset.example); }
  });
});
showExample('property');
const menu = document.querySelector('.menu'), nav = document.querySelector('nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
function openLinkedService() { const id = location.hash.slice(1); const detail = document.getElementById(id); if (detail?.tagName === 'DETAILS') detail.open = true; }
window.addEventListener('hashchange', openLinkedService);
document.querySelectorAll('.scope a').forEach(link => link.addEventListener('click', () => { const detail = document.querySelector(link.getAttribute('href')); detail.open = true; }));
openLinkedService();
