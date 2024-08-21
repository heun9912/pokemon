// 페이지 로드 시 데이터 가져오기
// 페이지 로드 시 포켓몬 데이터 가져오기
window.onload = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
    .then((response) => response.json())
    .then((json) => {
      const container = document.getElementById("container");
      const pokemonList = json.results;

      // API에서 받아온 포켓몬 리스트 출력
      pokemonList.forEach((pokemon, index) => {
        const pokemonId = index + 1;
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `<img src="${imageUrl}" alt="${pokemon.name}" /> No.${pokemonId}<br>${pokemon.name}`;

        // 상세 페이지로 이동하는 클릭 이벤트 추가
        item.addEventListener("click", () => {
          window.location.href = `detail.html?id=${pokemonId}`;
        });

        container.appendChild(item);
      });

      // 검색 이벤트
      $("#form").on("submit", function (e) {
        e.preventDefault();
        const value = $("#search").val().toLowerCase();

        // 포켓몬 이름에 검색 문자열을 포함한 포켓몬만 필터링
        const filteredPokemon = pokemonList.filter((pokemon) =>
          pokemon.name.includes(value)
        );

        // 기존에 있던 요소를 비움
        $("#container").empty();

        // 필터링된 포켓몬을 다시 출력
        filteredPokemon.forEach((pokemon) => {
          const pokemonId = pokemonList.indexOf(pokemon) + 1;
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          const item = document.createElement("div");
          item.className = "item";
          item.innerHTML = `<img src="${imageUrl}" alt="${pokemon.name}" /> No.${pokemonId}<br>${pokemon.name}`;

          // 상세 페이지로 이동하는 클릭 이벤트 추가
          item.addEventListener("click", () => {
            window.location.href = `detail.html?id=${pokemonId}`;
          });

          // 필터된 아이템을 컨테이너에 추가
          container.appendChild(item);
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
};
