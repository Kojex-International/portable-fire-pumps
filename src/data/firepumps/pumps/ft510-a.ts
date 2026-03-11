import type { Firepump } from '../types';
import {
  shibauraLogoMark,
  aircooledIcon,
  watercooledIcon,
  dischargeIcon,
  engineIcon,
  carburatorIcon,
  timerIcon,
  checkIcon,
  pressureIcon,
  modelIcon,
  ft510Img,
  ft400Img,
  tf516mhImg,
  p572sImg,
  fk500Img,
  ff500arImg,
  ft510GraphImg,
  ft300400GraphImg,
  tf516mhGraphImg,
  p572sGraphImg,
  fk500GraphImg,
  ff500arGraphImg,
  ft300400ManualPdf,
  ft450500ManualPdf,
  ft510ManualPdf,
  tf516mhManualPdf,
  p572sManualPdf,
  fk500ManualPdf,
  ff500ManualPdf,
} from '../media';

export const ft510_a: Firepump = {
    slug: 'ft510-a',
    title: 'FT510-A',
    subtitle: "Strong power with Shibaura's original air-cooled engine",
    description:
      "Shibaura's largest air-cooled engine delivers strong power without influencing water quality.",
    valueProp:
      'Big-bore air-cooled performance with fast starting and quick valve control for demanding field use.',
    icon: shibauraLogoMark,
    image: ft510Img,
    graphImage: ft510GraphImg,
    manualPdf: ft510ManualPdf,
    features: [
      { label: 'Air-cooled Shibaura engine', icon: aircooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 1,450L/min, 1.0MPa: 830L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1 m suction head: 3.5sec', icon: timerIcon }
    ],
    keySpecs: [
      { key: 'pumpModel', value: { en: 'Shibaura B612B', fr: 'Shibaura B612B' }, icon: modelIcon },
      { key: 'coolingSystem', value: { en: 'Air-cooled', fr: 'Refroidissement par air' }, icon: aircooledIcon },
      {
        key: 'flowRate',
        value: {
          en: '450 GPM @ 72 PSI\n390 GPM @ 116 PSI',
          fr: '450 GPM @ 72 PSI\n390 GPM @ 116 PSI'
        },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 3.5 sec', fr: '1 m : 3,5 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '145 PSI (1.00 MPa)', fr: '145 PSI (1,00 MPa)' }, icon: pressureIcon },
      { key: 'engineType', value: { en: '2-stroke gasoline engine', fr: 'Moteur 2 temps à essence' }, icon: engineIcon }
    ],
    benefits: [
      { title: 'Quick Starting', description: 'Automatic choke starts the engine without warm-up.' },
      { title: 'Fast Valve Control', description: 'Quick valve lever enables rapid discharge control.' },
      { title: 'Clean Operation', description: 'Oilless vacuum pump avoids oily discharge.' },
      { title: 'High Discharge', description: 'Delivers 1,450 L/min at 0.5 MPa for demanding operations.' }
    ],
    specsTable: {
      columns: ['Metric', 'Imperial'],
      groups: [
        {
          title: 'Model',
          rows: [
            { key: 'dimensions', values: ['737 x 572 x 740 mm', '29.0 x 22.5 x 29.1 in'] },
            { key: 'dryWeight', values: ['90 kg', '198 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { key: 'model', values: ['SHIBAURA B612B', 'SHIBAURA B612B'] },
            { key: 'type', values: ['High pressure, single stage centrifugal pump', 'High pressure, single stage centrifugal pump'] },
            { key: 'dischargePerformance', pressureMPa: '0.5', suctionHeightM: '1', values: ['1,703 L/min', '450 gpm @ 72 psi'] },
            { key: 'dischargePerformance', pressureMPa: '0.6', suctionHeightM: '1', values: ['1,590 L/min', '420 gpm @ 87 psi'] },
            { key: 'dischargePerformance', pressureMPa: '0.8', suctionHeightM: '1', values: ['1,476 L/min', '390 gpm @ 116 psi'] },
            { key: 'primingPerformance', qualifier: '1 m', values: ['3.5 Seconds', '3.5 Seconds (3.3 ft suction head)'] },
            {
              key: 'dischargeDiameterJis',
              connections: {
                jp: { size: 65, unit: 'mm', standard: 'JIS' },
                na: { size: 2.5, unit: 'in', standard: 'NH' },
              },
            },
            {
              key: 'suctionDiameterJis',
              connections: {
                jp: { size: 75, unit: 'mm', standard: 'JIS' },
                na: { size: 4, unit: 'in', standard: 'NH' },
              },
            }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { key: 'model', values: ['SHIBAURA E440C', 'SHIBAURA E440C'] },
            { key: 'type', values: ['Air cooled 2-stroke gasoline engine', 'Air cooled 2-stroke gasoline engine'] },
            { key: 'coolingSystem', values: ['Air cooled type', 'Air cooled type'] },
            { key: 'cylinderCount', values: ['2 cylinder', '2 cylinder'] },
            { key: 'fuelSystem', values: ['Auto choke carburetor', 'Auto choke carburetor'] },
            { key: 'displacement', values: ['436 cc', '26.6 cu in'] },
            { key: 'boreStroke', values: ['68 mm x 60 mm', '2.68 x 2.36 in'] },
            { key: 'maxOutput', values: ['46 HP / 34 kW', '46 HP / 34 kW'] },
            { key: 'ratedOutput', values: ['22.8 kW / 31 PS', '30.6 hp'] },
            { key: 'startingSystem', values: ['Electric starter & manual starter', 'Electric starter & manual starter'] },
            { key: 'fuelTankCapacity', values: ['14.5 L', '3.83 gal'] },
            { key: 'fuelConsumption', values: ['14.0 L/h', '3.7 gal/h'] },
            { key: 'fuelType', values: ['Regular unleaded gasoline', 'Regular unleaded gasoline'] }
          ]
        },
        {
          title: 'Vacuum Pump',
          rows: [
            { key: 'type', values: ['4-Vane eccentric rotary type', '4-Vane eccentric rotary type'] },
            { key: 'vaneMaterial', values: ['High strength carbon', 'High strength carbon'] },
            { key: 'maxSuctionHeight', values: ['9 m', '29.5 ft'] }
          ]
        },
        {
          title: 'Features',
          rows: [
            { key: 'featureOriginalEngine', values: ['Yes', 'Yes'] },
            { key: 'featureOriginalCentrifugalPump', values: ['Yes', 'Yes'] },
            { key: 'featureOriginalVacuumPump', values: ['Yes', 'Yes'] },
            { key: 'featureAlertMonitoringSystem', values: ['Yes', 'Yes'] },
            { key: 'featureQuickDischargeValve', values: ['Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '1,703 L/min' },
      { label: 'Discharge performance (0.6MPa, 1 m suction head)', value: '1,590 L/min' },
      { label: 'Discharge performance (0.8MPa, 1 m suction head)', value: '1,476 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '3.5 sec' }
    ]
  };
