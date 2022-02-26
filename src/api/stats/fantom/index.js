const getTombApys = require('./getTombApys');
const getMagikApys = require('./getMagikApys');
const getMagikSingleApys = require('./getMagikSingleApys');

const getApys = [
  getTombApys,
  getMagikApys,
  getMagikSingleApys,
  // getSushiLpApys,
  // getSpookyLpApys,
  // getFroyoLpApys,
  // getEsterApys,
  // getSpookyBooApy,
  // getFantomBifiGovApy,
  // getFantomBifiMaxiApy,
  // getSpiritApys,
  // getCurveApys,
  // getScreamApys,
  // getSteakHouseLpApys,
  // getStakeSteakLpApys,
  // getTosdisLpApys,
  // getJetswapApys,
  // getSpellApys,
  // getGeistLpApys,
  // getSingularApys,
  // getPearzapApys,
  // getBeethovenxApys,
  // getBeethovenxDualApys,
  // getSummitApys,
  // getGeistLendingApys,
  // getfBeetsApy,
  // getSpartacadabraApys,
  // getPopsicleApys,
  // get2ombApys,
  // get0xdaoApys,
  // getCreditumApys,
  // getRipaeApys,
];

const getFantomApys = async () => {
  let apys = {};
  let apyBreakdowns = {};

  let promises = [];

  getApys.forEach(getApy => promises.push(getApy()));
  const results = await Promise.allSettled(promises);

  for (const result of results) {
    if (result.status !== 'fulfilled') {
      console.warn('getFantomApys error', result.reason);
      continue;
    }

    // Set default APY values
    let mappedApyValues = result.value;
    let mappedApyBreakdownValues = {};

    // Loop through key values and move default breakdown format
    // To require totalApy key
    for (const [key, value] of Object.entries(result.value)) {
      mappedApyBreakdownValues[key] = {
        totalApy: value,
      };
    }

    // Break out to apy and breakdowns if possible
    let hasApyBreakdowns = 'apyBreakdowns' in result.value;
    if (hasApyBreakdowns) {
      mappedApyValues = result.value.apys;
      mappedApyBreakdownValues = result.value.apyBreakdowns;
    }

    apys = { ...apys, ...mappedApyValues };

    apyBreakdowns = { ...apyBreakdowns, ...mappedApyBreakdownValues };
  }

  return {
    apys,
    apyBreakdowns,
  };
};

module.exports = { getFantomApys };
