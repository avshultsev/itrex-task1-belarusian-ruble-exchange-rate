const createLayout = (table, data) => {
  const strings = [];
  for (const item of data) {
    const { Cur_Scale, Cur_Name, Cur_OfficialRate } = item;
    const str = `<tr>
      <td>${Cur_Scale}</td>
      <td>${Cur_Name}</td>
      <td>${Cur_OfficialRate}</td>
    </tr>`;
    strings.push(str); 
  };
  const thead = `<thead>
    <tr>
      <th>Сумма</th>
      <th>Валюта</th>
      <th>Эквивалент в беларусских рублях</th>
    </tr>
  </thead>`;
  table.innerHTML = thead + '<tbody>' + strings.join('') + '</tbody>';
};

const fetchRates = async (url) => {
  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();
  return data;
};

const getRates = (url) => {
  const table = document.getElementById('root');
  fetchRates(url)
    .then(createLayout.bind(null, table))
    .catch(console.log);
};

const url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

window.onload = getRates.bind(null, url);