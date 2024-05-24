const clienteUtils = require("../utils/game.utils");

let initialResultsFetched = false;
let initialResultsCache = [];
let errorOccurred = null;

function initializeGameFetching() {
  const emitter = clienteUtils.startFetchingGames();

  emitter.once('initialResults', (initialResults) => {
    initialResultsCache = initialResults;
    initialResultsFetched = true;
  });

  emitter.on('error', (error) => {
    errorOccurred = error;
  });

  return emitter;
}

const emitter = initializeGameFetching();

async function getGameResults() {
  if (initialResultsFetched) {
    return initialResultsCache;
  } else {
    return new Promise((resolve, reject) => {
      emitter.once('initialResults', (initialResults) => {
        resolve(initialResults);
      });
      emitter.once('error', (error) => {
        reject(error);
      });
    });
  }
}

async function handleApiRequest(req, res) {
  try {
    return await getGameResults();
  } catch (error) {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ha ocurrido un error consultando la información en base de datos",
    };
  }
}

module.exports = {
  handleApiRequest
};