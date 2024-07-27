const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
    SubRegion: { type: String, required: true },
    AverageIncomePerCapita: { type: Number, required: true },
    AverageEnergyCost: { type: Number, required: true },
    PopulationDensity: { type: Number, required: true },
    HeightFromSeaLevel: { type: Number, required: true },
    AverageTemperature: { type: Number, required: true },
    TotalConsumption: { type: Number, required: true },
    FlowRate: { type: Number, required: true },
    HouseholdInfrastructurePercentageOfBuilding: { type: Number, required: true },
    HouseholdInfrastructurePercentageOfBungalow: { type: Number, required: true },
    SocioEconomicFactor: { type: Number, required: true },
    PeerEffectPercent: { type: Number, required: true },
    Const: { type: Number, required: true },
});

const Parameter = mongoose.model('Parameter', parameterSchema);
module.exports = Parameter;
