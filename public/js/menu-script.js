const map = {
    'ROYAL CURRIES': 'menu-royal-curries',
    'FROM THE TANDOOR': 'menu-tandoor',
    'STREET FOOD MAGIC': 'menu-street-food',
    'REFRESHING LASSIS & CHAI': 'menu-lassiS-chai',
    'SWEET ENDINGS': 'menu-sweet-endings',
};

function renderList(el, items) {
    el.innerHTML = items
        .map(item => `
        <li><strong>${item.name}</strong> <br/> ${item.description || ''}</li>
        `).join('');
}

async function init() {
    try {
        const res = await fetch('../data/menu.json');
        if (!res.ok) throw new Error('Failed to load menu JSON');
        const data = await res.json();

        Object.entries(map).forEach(([category, id]) => {
            const el = document.getElementById(id);
            if (!el) return;
            const items = data[category] || [];
            renderList(el, items);
        });
    } catch (e) {
        console.error(e);
    }
}

document.addEventListener('DOMContentLoaded', init);