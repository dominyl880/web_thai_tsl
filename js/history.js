window.onload = function() {
    const historyResults = document.querySelector('#history-results tbody');

    // ตัวอย่างข้อมูลประวัติ สามารถปรับเปลี่ยนตามข้อมูลจริง
    const historyData = [
        { query: 'ค้นหาคำที่มีความยาวมากๆ เกินกว่าที่จะแสดงในหน้าจอในกรณีนี้เราจะทำให้สั้นลง...', date: '2024-08-01 14:30' },
        { query: 'ค้นหา 2', date: '2024-08-02 11:45' },
        { query: 'ค้นหา 3', date: '2024-08-03 09:15' },
        { query: 'ค้นหา 4', date: '2024-08-04 16:20' },
        { query: 'ค้นหา 5', date: '2024-08-05 10:00' },
        { query: 'ค้นหา 6', date: '2024-08-06 08:55' },
        { query: 'ค้นหา 7', date: '2024-08-07 13:25' }
    ];

    historyData.forEach(data => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        const queryCell = document.createElement('td');
        const actionsCell = document.createElement('td');
        const saveButton = document.createElement('button');
        const detailsButton = document.createElement('button');

        dateCell.textContent = data.date;

        // Limit the text length and add "..." if it exceeds a certain length
        let displayQuery = data.query;
        if (displayQuery.length > 30) {
            displayQuery = displayQuery.substring(0, 30) + '...';
        }
        queryCell.textContent = displayQuery;

        saveButton.textContent = 'บันทึกรายการโปรด';
        saveButton.className = 'save-button';

        detailsButton.textContent = 'ดูรายละเอียด';
        detailsButton.className = 'details-button';

        actionsCell.className = 'actions';
        actionsCell.appendChild(saveButton);
        actionsCell.appendChild(detailsButton);

        row.appendChild(dateCell);
        row.appendChild(queryCell);
        row.appendChild(actionsCell);

        historyResults.appendChild(row);
    });
};
