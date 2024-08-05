// จับเหตุการณ์การค้นหา
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const query = this.value;
        if (query) {
            window.location.href = 'search.html?q=' + encodeURIComponent(query);
        }
    }
});

// ดึงค่า query จาก URL และแสดงผล
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        document.getElementById('search-input').value = query;
        // ใส่โค้ดการค้นหาและแสดงผลที่นี่
        // ตัวอย่างเช่น:
        const searchResults = document.getElementById('search-results');
        const resultItem = document.createElement('li');
        resultItem.textContent = query;
        searchResults.appendChild(resultItem);
    }
};
