const labelPlugin = {
  id: "labelPlugin",
  afterDraw(chart) {
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);

      meta.data.forEach((element, index) => {
        const value = dataset.data[index];
        const position = element.tooltipPosition();

        ctx.fillStyle = "#fff";
        ctx.font = "bold 13px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(value, position.x, position.y);
      });
    });
  },
};
const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6"],
    datasets: [
      {
        type: "bar",
        label: "Đơn hàng",
        data: [2400, 2200, 2700, 3200, 3500, 3800],
        backgroundColor: "#2f6fb2",
        borderRadius: 8,
        borderSkipped: false,
        order: 2,
      },
      {
        type: "line",
        label: "Doanh thu",
        data: [1000, 1800, 2000, 2600, 3000, 4000],
        borderColor: "#f39c12",
        backgroundColor: "#f39c12",
        borderWidth: 3,
        tension: 0.2,
        pointRadius: 6,
        pointBackgroundColor: "#f39c12",
        yAxisID: "y1",
        order: 1,
        clip: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
        text: "Tình hình Đơn hàng & Doanh thu (Theo tháng)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Đơn hàng",
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        max: 5500,
        ticks: {
          stepSize: 1000,
        },
        title: {
          display: true,
          text: "Doanh thu (triệu)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  },
});

// ===== LINE CHART =====
const ctx1 = document.getElementById("mainChart");

if (ctx1) {
  new Chart(ctx1, {
    type: "line",
    data: {
      labels: Array.from({ length: 31 }, (_, i) => i + 1),
      datasets: [
        {
          label: "Doanh thu",
          data: [
            1000000, 1200000, 1300000, 2000000, 2500000, 2200000, 2100000,
            1200000, 1500000, 2000000, 1600000, 2500000, 1800000, 1400000,
            1900000, 2100000, 1700000, 2800000, 2700000, 1600000, 2300000,
            1400000, 1300000, 3500000, 2000000, 2400000, 1900000, 2100000,
            1800000, 2200000, 2000000,
          ],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.08)",
          tension: 0.5,
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: "#2563eb",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 10,
      },
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Ngày",
            color: "#555",
            font: {
              size: 13,
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          title: {
            display: true,
            text: "Doanh thu (VNĐ)",
            color: "#555",
            font: {
              size: 13,
            },
          },
          grid: {
            color: "#eee",
          },
          ticks: {
            callback: (value) => value.toLocaleString("vi-VN") + " đ",
          },
        },
      },
    },
  });
}

// ===== DONUT CHART =====
const ctx2 = document.getElementById("pieChart");

if (ctx2) {
  new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["Chờ xử lý", "Đang vận chuyển", "Hoàn thành"],
      datasets: [
        {
          data: [15, 45, 60],
          backgroundColor: ["#9ca3af", "#f59e0b", "#22c55e"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
    plugins: [labelPlugin],
  });
}

// ===== FILTER TABLE =====
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const table = document.getElementById("orderTable");

function filterTable() {
  const keyword = searchInput.value.toLowerCase();
  const status = statusFilter ? statusFilter.value : "all";

  const rows = table.getElementsByTagName("tr");

  for (let row of rows) {
    const customer = row.cells[1]?.innerText.toLowerCase();
    const orderStatus = row.cells[2]?.innerText;

    let matchSearch = customer.includes(keyword);
    let matchStatus = status === "all" || orderStatus.includes(status);

    row.style.display = matchSearch && matchStatus ? "" : "none";
  }
}
searchInput.addEventListener("keyup", filterTable);
if (searchInput) {
  searchInput.addEventListener("keyup", filterTable);
}

if (statusFilter) {
  statusFilter.addEventListener("change", filterTable);
}
