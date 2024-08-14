// API로부터 데이터를 가져오는 함수
function fetchData() {
  // 예시 데이터 (실제 API에서 가져온 데이터로 교체)
  const data = Array.from({ length: 108 }, (_, i) => `Item ${i + 1}`);

  // Grid 컨테이너 참조
  const gridContainer = document.getElementById("grid-container");

  // 데이터를 기반으로 동적으로 grid-item 생성
  data.forEach((item) => {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.textContent = item;
    gridContainer.appendChild(gridItem);
  });
}

// 페이지 로드 시 데이터 가져오기
// 페이지 로드 시 포켓몬 데이터 가져오기
window.onload = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((json) => {
      const gridContainer = document.getElementById("grid-container");

      // API에서 받아온 포켓몬 리스트 출력
      json.results.forEach((pokemon) => {
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        gridItem.innerHTML = `${pokemon.name}<br><a href="${pokemon.url}" target="_blank">Details</a>`;
        gridContainer.appendChild(gridItem);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
};
