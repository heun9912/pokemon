// function fetchData() {
//   const Container = document.getElementById("container");

//   data.forEach((item) => {
//     const Item = document.createElement("div");
//     Item.className = "item";
//     Item.textContent = item;
//     Container.appendChild(Item);
//   });
// }

// 페이지 로드 시 데이터 가져오기
// 페이지 로드 시 포켓몬 데이터 가져오기
window.onload = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
    .then((response) => response.json())
    .then((json) => {
      const Container = document.getElementById("container");
      const pokemonList = json.results;
      // API에서 받아온 포켓몬 리스트 출력
      pokemonList.forEach((pokemon, index) => {
        // 포켓몬 ID는 index + 1로 계산 가능
        const pokemonId = index + 1;
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

        const Item = document.createElement("div");
        Item.className = "item";
        Item.innerHTML = `<img src="${imageUrl}" alt="${pokemon.name}" /> No.${pokemonId}<br>${pokemon.name}`;
        Container.appendChild(Item);
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

          const Item = document.createElement("div");
          Item.className = "item";
          Item.innerHTML = `<img src="${imageUrl}" alt="${pokemon.name}" /> No.${pokemonId}<br>${pokemon.name}`;
          Container.appendChild(Item);
        });
      });
    })

    .catch((error) => console.error("Error fetching data:", error));
};
