// Sample Default Data for Resetting
const defaultData = {
    inquiryBreakdown: [36.2, 63.8],
    inquiriesPerMonth: [5, 10, 8, 12, 20, 25, 22, 28, 30, 18, 25, 28],
    incomePerQuarter: [18.1, 28.6, 23, 30.3],
    inquirySourceBreakdown: [70, 30, 20, 10, 5],
    incomePerMonthProductA: [10, 15, 20, 25, 30, 20, 35, 40, 20, 25, 15, 10],
    incomePerMonthProductB: [15, 20, 25, 20, 35, 40, 25, 20, 30, 35, 20, 15],
    incomeSourcePerMonthWeb: [5000, 7000, 8000, 6000, 9000, 10000, 12000, 14000, 11000, 13000, 12500, 11000],
    incomeSourcePerMonthEmail: [3000, 5000, 6000, 4000, 7000, 8000, 9500, 11500, 9000, 10500, 10000, 9500],
    incomeSourcePerMonthInstagram: [2000, 3000, 3500, 3000, 4000, 4500, 5000, 6000, 5500, 6500, 6000, 5500]
};

// Function to show the selected section and hide others
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.menu-item[title="${sectionId.replace('Section', '').toLowerCase()}"]`).classList.add('active');
}

// Event listeners for sidebar navigation
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = item.getAttribute('title') + 'Section';
        showSection(sectionId);
    });
});

// Functions for Notifications
function markAllAsRead() {
    document.querySelectorAll('.notification.unread').forEach(notification => notification.classList.remove('unread'));
}

function clearNotifications() {
    const list = document.getElementById('notificationList');
    list.innerHTML = ''; // Clear all notifications
}

// Function to toggle chart type in Analytics Section
let analyticsChart;
function toggleChart(type) {
    const analyticsCtx = document.getElementById('analyticsChart').getContext('2d');
    if (analyticsChart) analyticsChart.destroy();

    const chartData = {
        pie: {
            type: 'pie',
            data: {
                labels: ['Product A', 'Product B', 'Product C'],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            }
        },
        line: {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Sales',
                    data: [100, 200, 150, 300, 250, 350],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                }]
            }
        }
    };
    analyticsChart = new Chart(analyticsCtx, chartData[type]);
}

// Function to Update Settings (Theme)
function updateSettings(event) {
    event.preventDefault();
    const theme = document.getElementById('theme').value;
    document.body.className = theme;
}

// Function to Update All Charts
function updateAllCharts() {
    inquiryBreakdownChart.update();
    inquiriesPerMonthChart.update();
    incomePerQuarterChart.update();
    inquirySourceBreakdownChart.update();
    incomePerMonthChart.update();
    incomeSourcePerMonthChart.update();
}

// Function to Apply Date Filter
function applyDateFilter() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    if (!startDateInput.value || !endDateInput.value) {
        alert('Please select both start and end dates');
        startDateInput.focus(); // Focus on the start date input
        return;
    }

    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (startDate <= endDate) {
        // Example logic to filter data
        const filteredInquiries = defaultData.inquiriesPerMonth.map((value, index) => {
            const currentDate = new Date(2023, index); // Example: assuming data is for the year 2023
            return currentDate >= startDate && currentDate <= endDate ? value : 0;
        });

        const filteredIncome = defaultData.incomePerQuarter.map((value, index) => {
            const currentDate = new Date(2023, index * 3); // Quarterly data
            return currentDate >= startDate && currentDate <= endDate ? value : 0;
        });

        const filteredInquiryBreakdown = defaultData.inquiryBreakdown.map((value, index) => {
            return filteredInquiries.reduce((acc, val) => acc + val, 0) * (value / 100);
        });

        // Update the charts with filtered data
        inquiriesPerMonthChart.data.datasets[0].data = filteredInquiries;
        incomePerQuarterChart.data.datasets[0].data = filteredIncome;
        inquiryBreakdownChart.data.datasets[0].data = filteredInquiryBreakdown;

        // Update summary values (example logic)
        const totalIncome = filteredIncome.reduce((acc, val) => acc + val, 0);
        const successRate = (filteredInquiries.reduce((acc, val) => acc + val, 0) / defaultData.inquiriesPerMonth.reduce((acc, val) => acc + val, 0)) * 100;
        const newClients = Math.floor(Math.random() * 50); // Example: random value
        const completedProjects = Math.floor(Math.random() * 30); // Example: random value

        updateSummaryValues(totalIncome, successRate.toFixed(1), newClients, completedProjects);

        // Update charts
        updateAllCharts();

        alert(`Data filtered from ${startDate.toDateString()} to ${endDate.toDateString()}`);
    } else {
        alert('Start date must be before end date');
    }
}

// Function to Update Summary Values
function updateSummaryValues(income, successRate, newClients, completedProjects) {
    document.getElementById('totalIncome').innerText = `$${income.toLocaleString()}`;
    document.getElementById('successRate').innerText = `${successRate}%`;
    document.getElementById('newClients').innerText = newClients;
    document.getElementById('completedProjects').innerText = completedProjects;
}

// Function to Randomize Data
function randomizeData() {
    const randomIncome = Math.floor(Math.random() * 300000 + 50000);
    const randomSuccessRate = (Math.random() * 50 + 25).toFixed(1);
    const randomNewClients = Math.floor(Math.random() * 100);
    const randomCompletedProjects = Math.floor(Math.random() * 100);

    updateSummaryValues(randomIncome, randomSuccessRate, randomNewClients, randomCompletedProjects);

    inquiryBreakdownChart.data.datasets[0].data = [randomSuccessRate, 100 - randomSuccessRate];
    inquiriesPerMonthChart.data.datasets[0].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 30 + 5));
    incomePerQuarterChart.data.datasets[0].data = Array.from({ length: 4 }, () => Math.random() * 40 + 10);
    inquirySourceBreakdownChart.data.datasets[0].data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    incomePerMonthChart.data.datasets[0].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50));
    incomePerMonthChart.data.datasets[1].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50));
    incomeSourcePerMonthChart.data.datasets[0].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 15000));
    incomeSourcePerMonthChart.data.datasets[1].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 12000));
    incomeSourcePerMonthChart.data.datasets[2].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 9000));

    updateAllCharts();
}

// Function to Reset Data to Default Values
function resetData() {
    updateSummaryValues(250000, 36.2, 36, 29);

    inquiryBreakdownChart.data.datasets[0].data = [...defaultData.inquiryBreakdown];
    inquiriesPerMonthChart.data.datasets[0].data = [...defaultData.inquiriesPerMonth];
    incomePerQuarterChart.data.datasets[0].data = [...defaultData.incomePerQuarter];
    inquirySourceBreakdownChart.data.datasets[0].data = [...defaultData.inquirySourceBreakdown];
    incomePerMonthChart.data.datasets[0].data = [...defaultData.incomePerMonthProductA];
    incomePerMonthChart.data.datasets[1].data = [...defaultData.incomePerMonthProductB];
    incomeSourcePerMonthChart.data.datasets[0].data = [...defaultData.incomeSourcePerMonthWeb];
    incomeSourcePerMonthChart.data.datasets[1].data = [...defaultData.incomeSourcePerMonthEmail];
    incomeSourcePerMonthChart.data.datasets[2].data = [...defaultData.incomeSourcePerMonthInstagram];

    updateAllCharts();
}

// Function for New Functionality
function newFunctionality() {
    console.log("New functionality executed!");
    // Add your new functionality here
}

// Function to Export Data as CSV
function exportDataAsCSV() {
    const data = [
        ['Metric', 'Value'],
        ['Total Income', document.getElementById('totalIncome').innerText],
        ['Inquiry Success Rate', document.getElementById('successRate').innerText],
        ['New Clients', document.getElementById('newClients').innerText],
        ['Completed Projects', document.getElementById('completedProjects').innerText]
    ];

    let csvContent = "data:text/csv;charset=utf-8," 
        + data.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dashboard_data.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}

// Function to Toggle Date Filter Visibility
function toggleDateFilter() {
    const dateFilterContainer = document.getElementById('dateFilterContainer');
    if (dateFilterContainer.classList.contains('hidden')) {
        dateFilterContainer.classList.remove('hidden');
    } else {
        dateFilterContainer.classList.add('hidden');
    }
}

// Update Event Listeners for Buttons
document.getElementById('exportData').addEventListener('click', exportDataAsCSV);
document.getElementById('filterData').addEventListener('click', toggleDateFilter);
document.getElementById('randomizeData').addEventListener('click', randomizeData);
document.getElementById('resetData').addEventListener('click', resetData);

// Chart Configurations

// Inquiry Breakdown Chart (Doughnut Chart)
const inquiryBreakdownCtx = document.getElementById('inquiryBreakdown').getContext('2d');
const inquiryBreakdownChart = new Chart(inquiryBreakdownCtx, {
    type: 'doughnut',
    data: {
        labels: ['Booked', 'Flopped'],
        datasets: [{
            data: [...defaultData.inquiryBreakdown],
            backgroundColor: ['#6a77e3', '#b9b6d3']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
});

// Inquiries per Month (Bar Chart)
const inquiriesPerMonthCtx = document.getElementById('inquiriesPerMonth').getContext('2d');
const inquiriesPerMonthChart = new Chart(inquiriesPerMonthCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Inquiries',
            data: [...defaultData.inquiriesPerMonth],
            backgroundColor: '#d69ef3'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Income per Quarter (Pie Chart)
const incomePerQuarterCtx = document.getElementById('incomePerQuarter').getContext('2d');
const incomePerQuarterChart = new Chart(incomePerQuarterCtx, {
    type: 'pie',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            data: [...defaultData.incomePerQuarter],
            backgroundColor: ['#d69ef3', '#a98ff3', '#8261d2', '#5c2aa0']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
});

// Inquiry Source Breakdown (Horizontal Bar Chart)
const inquirySourceBreakdownCtx = document.getElementById('inquirySourceBreakdown').getContext('2d');
const inquirySourceBreakdownChart = new Chart(inquirySourceBreakdownCtx, {
    type: 'bar',
    data: {
        labels: ['Web', 'Email', 'Instagram', 'TikTok', 'Pinterest'],
        datasets: [{
            label: 'Sources',
            data: [...defaultData.inquirySourceBreakdown],
            backgroundColor: ['#6a77e3', '#b9b6d3', '#d69ef3', '#a98ff3', '#8261d2']
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});

// Income per Month (Stacked Bar Chart)
const incomePerMonthCtx = document.getElementById('incomePerMonth').getContext('2d');
const incomePerMonthChart = new Chart(incomePerMonthCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Product A',
                data: [...defaultData.incomePerMonthProductA],
                backgroundColor: '#d69ef3'
            },
            {
                label: 'Product B',
                data: [...defaultData.incomePerMonthProductB],
                backgroundColor: '#a98ff3'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            }
        }
    }
});

// Income Source per Month (Line Chart)
const incomeSourcePerMonthCtx = document.getElementById('incomeSourcePerMonth').getContext('2d');
const incomeSourcePerMonthChart = new Chart(incomeSourcePerMonthCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Web',
                data: [...defaultData.incomeSourcePerMonthWeb],
                borderColor: '#6a77e3',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Email',
                data: [...defaultData.incomeSourcePerMonthEmail],
                borderColor: '#b9b6d3',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Instagram',
                data: [...defaultData.incomeSourcePerMonthInstagram],
                borderColor: '#d69ef3',
                fill: false,
                tension: 0.1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function toggleNotifications() {
    const notificationsSection = document.getElementById('notificationsSection');
    if (notificationsSection.style.display === 'none' || notificationsSection.style.display === '') {
        notificationsSection.style.display = 'block';
    } else {
        notificationsSection.style.display = 'none';
    }
}

// Function to Toggle Theme
function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = newTheme;
    console.log(`Theme changed to ${newTheme}`);
}

// Update Event Listeners for Buttons
document.getElementById('newFunctionality').addEventListener('click', toggleTheme);

