//router
router.get('/gameAPI', listarGameAPI);

//api
const listarGameAPI = async (req, res) => {
  //const {id} = req.body;
  let message;
  try {
    const resultado = await handleApiRequest();
    message = new ResponseBody(true, 200, resultado);
  } catch (error) {
    if (error.status_cod) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(
        false,
        500,
        "Ocurrió un error en el proceso para listar las fechas"
      );
    }
  }

  return res.json(message);
};

//controller
let initialResultsFetched = false;
let initialResultsCache = [];
let errorOccurred = null;

function initializeGameFetching() {
  const emitter = clienteUtils.startFetchingGames();

  emitter.once("initialResults", (initialResults) => {
    initialResultsCache = initialResults;
    initialResultsFetched = true;
  });

  emitter.on("error", (error) => {
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
      emitter.once("initialResults", (initialResults) => {
        resolve(initialResults);
      });
      emitter.once("error", (error) => {
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

//utils
function startFetchingGames() {
  const EventEmitter = require('events');
  const emitter = new EventEmitter();
  const bodyJuegoExterno = "f game, platform, uid; where category=1; limit 500; offset rem;";
  const cantidadOffset = 278999;
  const general = [];
  const batchSize = 2; // Número de peticiones simultáneas
  const delayBetweenBatches = 2000; // 5 segundos de espera entre lotes
  let contador = 0;
  let emittedInitialResults = false;

  async function fetchGames() {
    try {
      while (contador < cantidadOffset) {
        const batchPromises = [];
        for (let i = 0; i < batchSize && contador < cantidadOffset; i++) {
          contador++;
          const body = bodyJuegoExterno.replace("rem", contador);
          batchPromises.push(fetchData('external_games', body));
        }
        emitter.emit('allResults', general);
        emitter.emit('initialResults', general);
        emittedInitialResults = true;
        const results = await Promise.allSettled(batchPromises);
        
        for (const result of results) {
          if (result.status === 'fulfilled') {
            general.push(...result.value);
          } else {
            console.error(`Error fetching data at offset ${contador - batchSize + results.indexOf(result)}: ${result.reason}`);
          }
        }
        
        await delay(delayBetweenBatches);
      }
    } catch (error) {
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error insertando el Game",
      };
    }
  }
  fetchGames();
  return emitter;
}