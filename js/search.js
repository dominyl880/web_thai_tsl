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
        
        const searchResults = document.querySelector('#search-results tbody');
        
        // ตัวอย่างผลลัพธ์การค้นหา สามารถปรับเปลี่ยนตามข้อมูลจริง
        const results = [
            { name: query },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 2' },
            { name: 'ผลลัพธ์ 3' }
        ];
        
        results.forEach(result => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const actionsCell = document.createElement('td');
            const saveButton = document.createElement('button');
            const detailsButton = document.createElement('button');
            
            nameCell.textContent = result.name;
            
            saveButton.textContent = 'บันทึกรายการโปรด';
            saveButton.className = 'save-button';
            
            detailsButton.textContent = 'ดูรายละเอียด';
            detailsButton.className = 'details-button';
            
            actionsCell.className = 'actions';
            actionsCell.appendChild(saveButton);
            actionsCell.appendChild(detailsButton);
            
            row.appendChild(nameCell);
            row.appendChild(actionsCell);
            
            searchResults.appendChild(row);
        });
    }
};
