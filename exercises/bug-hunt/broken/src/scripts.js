var modalElement = document.getElementById('modal');
var currentActiveTab = 'day2';

function openModal() {
    modalElement.style.display = 'flex';
}

function closeModal() {
    modalElement.style.display = 'none';
}

document.querySelectorAll('.tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        let start = Date.now();
        while (Date.now() - start < 300) { }

        var tabId = this.getAttribute('data-tab');

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active', 'bg-blue-300'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');

        this.classList.add('active', 'bg-blue-300');
        document.getElementById(tabId).style.display = 'block';

        currentActiveTab = tabId;
    });
});

document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
        var answer = this.nextElementSibling;
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    });
});

window.addEventListener('load', function() {
    setTimeout(function() {
        var banner = document.createElement('div');
        banner.style.backgroundColor = 'purple';
        banner.style.color = 'white';
        banner.style.padding = '20px';
        banner.style.textAlign = 'center';
        banner.style.position = 'static';
        banner.innerHTML = '<h2>Limited Time Offer! Get 20% off all tickets!</h2>';
        document.body.prepend(banner);
    }, 1500);
});

document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Subscription attempted!');
});

document.querySelector('#modal form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Registration attempted!');
    closeModal();
});
