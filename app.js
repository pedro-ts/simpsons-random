const BASE_LINK = "https://redecanais.fm/musicvideo.php?";

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function loadJson() {
  const res = await fetch("./EpisodioTemporada.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar JSON: " + res.status);
  return res.json();
}

function sortearTemporada(data) {
  const temporadas = Object.keys(data);
  return randomItem(temporadas);
}

function sortearEpisodio(data, temporada) {
  const episodiosObj = data[temporada];
  const episodios = Object.keys(episodiosObj);
  const episodio = randomItem(episodios);
  const vid = episodiosObj[episodio]; // "vid=xxxxx"
  return { episodio, vid };
}

function render(temporada, episodio, vid) {
  const url = BASE_LINK + vid;

  document.getElementById("temp").textContent = temporada;
  document.getElementById("epi").textContent = episodio;

  const a = document.getElementById("link");
  a.href = url;
  a.textContent = url;

  document.getElementById("out").style.display = "block";
}

let cacheData = null;

document.getElementById("btn").addEventListener("click", async () => {
  try {
    if (!cacheData) cacheData = await loadJson();
    const temporada = sortearTemporada(cacheData);
    const { episodio, vid } = sortearEpisodio(cacheData, temporada);
    render(temporada, episodio, vid);
  } catch (e) {
    alert("Erro: " + e.message);
  }
});
