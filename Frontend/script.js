async function fetchData(userInput) {
  const response = await fetch(
    `http://localhost:3000/quantidade-por-estoque/${userInput}`
  );
  return response.json();
}

function createTableHeader() {
  const headers = ["Nome", "Estoque", "Valor"];
  const thead = document.createElement("thead");

  const headerRow = document.createElement("tr");

  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.className = "text-center";
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  return thead;
}

function createTableBody(data) {
  const tbody = document.createElement("tbody");

  data.results[0].forEach((item) => {
    const row = document.createElement("tr");

    Object.keys(item).forEach((key) => {
      const cell = document.createElement("td");
      cell.className = "text-center";
      cell.textContent = item[key];
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  return tbody;
}

function displayResults(tbody, resultDiv) {
  const table = document.createElement("table");
  table.role = "grid"
  table.className = "search-table";
  table.appendChild(createTableHeader());
  table.appendChild(tbody);

  resultDiv.innerHTML = "";
  resultDiv.appendChild(table);
}

async function search() {
  const userInput = document.getElementById("userInput").value;
  const resultDiv = document.getElementById("result");

  try {
    const data = await fetchData(userInput);

    const tbody = createTableBody(data);

    displayResults(tbody, resultDiv);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os dados:", error);
  }
}
