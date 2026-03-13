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

export const p572s_a: Firepump = {
    slug: 'p572s-a',
    title: 'P572S-A',
    subtitle: 'Highest discharge performance of our lineup',
    description: 'Delivers the highest discharge performance. A large oil-less vacuum pump combined with a high-output engine enables faster priming and a greater volume of water discharge within its class.',
    valueProp: 'High-output fire pump built for demanding operations and rapid priming.',
    icon: shibauraLogoMark,
    image: p572sImg,
    graphImage: p572sGraphImg,
    manualPdf: p572sManualPdf,
    features: [
      { label: 'Water-cooled Shibaura engine', icon: watercooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 1,650L/min, 1.0MPa: 1,100L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1 m suction head: 2.1sec', icon: timerIcon }
    ],
    aliases: ['p572sw-a'],
    keySpecs: [
      { key: 'pumpModel', value: { en: 'Shibaura P572', fr: 'Shibaura P572' }, icon: modelIcon },
      { key: 'coolingSystem', value: { en: 'Water-cooled', fr: 'Refroidissement par eau' }, icon: watercooledIcon },
      {
        key: 'flowRate',
        value: {
          en: '436 GPM @ 72.5 PSI\n291 GPM @ 145 PSI',
          fr: '436 GPM @ 72,5 PSI\n291 GPM @ 145 PSI'
        },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 2.1 sec', fr: '1 m : 2,1 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '145 PSI (1.0 MPa)', fr: '145 PSI (1,0 MPa)' }, icon: pressureIcon },
      { key: 'engineType', value: { en: '2-stroke gasoline engine', fr: 'Moteur 2 temps à essence' }, icon: engineIcon }
    ],
    benefits: [
      { title: 'Highest Output', description: '1,650 L/min at 0.5 MPa for peak performance.' },
      { title: 'Fast Priming', description: '2.1 sec priming at 1 m suction head.' },
      { title: 'Water-Cooled Durability', description: 'Stable operation during longer duty cycles.' },
      { title: 'High Pressure', description: '1.0 MPa performance for challenging scenarios.' }
    ],
    specsTable: {
      columns: ['Metric', 'Imperial'],
      groups: [
        {
          title: 'Model',
          rows: [
            { key: 'dimensions', values: ['657 x 584 x 720 mm', '25.9 x 23.0 x 28.3 in'] },
            { key: 'dryWeight', values: ['94 kg', '207 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { key: 'model', values: ['SHIBAURA P572', 'SHIBAURA P572'] },
            { key: 'type', values: ['High pressure, single stage centrifugal pump', 'High pressure, single stage centrifugal pump'] },
            {
              key: 'maximumDischargePerformance',
              pressureMPa: '0.4',
              suctionHeightM: '1',
              performanceSource: 'distributor',
              values: ['2,233 L/min', '590 gpm @ 58 psi']
            },
            {
              key: 'maximumDischargePerformance',
              pressureMPa: '0.6',
              suctionHeightM: '1',
              performanceSource: 'distributor',
              values: ['2,385 L/min', '630 gpm @ 87 psi']
            },
            {
              key: 'maximumDischargePerformance',
              pressureMPa: '0.8',
              suctionHeightM: '1',
              performanceSource: 'distributor',
              values: ['1,893 L/min', '500 gpm @ 116 psi']
            },
            {
              key: 'maximumDischargePerformance',
              pressureMPa: '1.0',
              suctionHeightM: '3',
              performanceSource: 'distributor',
              values: ['1,476 L/min', '390 gpm @ 145 psi']
            },
            {
              key: 'dischargePerformance',
              pressureMPa: '0.5',
              suctionHeightM: '1',
              performanceSource: 'manufacturer',
              values: ['1,650 L/min', '436 gpm @ 72.5 psi']
            },
            {
              key: 'dischargePerformance',
              pressureMPa: '0.7',
              suctionHeightM: '1',
              performanceSource: 'manufacturer',
              values: ['1,600 L/min', '423 gpm @ 101.5 psi']
            },
            {
              key: 'dischargePerformance',
              pressureMPa: '1.0',
              suctionHeightM: '1',
              performanceSource: 'manufacturer',
              values: ['1,100 L/min', '291 gpm @ 145 psi']
            },
            {
              key: 'dischargePerformance',
              pressureMPa: '1.0',
              suctionHeightM: '3',
              performanceSource: 'manufacturer',
              values: ['1,070 L/min', '283 gpm @ 145 psi']
            },
            { key: 'primingPerformance', qualifier: '1 m', values: ['2.1 Seconds', '2.1 Seconds (3.3 ft suction head)'] },
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
            { key: 'model', values: ['SHIBAURA EP572', 'SHIBAURA EP572'] },
            { key: 'type', values: ['Water cooled 2-stroke gasoline engine', 'Water cooled 2-stroke gasoline engine'] },
            { key: 'coolingSystem', values: ['Water cooled type', 'Water cooled type'] },
            { key: 'cylinderCount', values: ['2 cylinder', '2 cylinder'] },
            { key: 'fuelSystem', values: ['Auto choke carburetor', 'Auto choke carburetor'] },
            { key: 'displacement', values: ['723 cc', '44.1 cu in'] },
            { key: 'boreStroke', values: ['80 mm x 72 mm', '3.15 x 2.83 in'] },
            { key: 'ratedOutput', values: ['34.3 kW / 46 PS', '45.3 hp'] },
            { key: 'startingSystem', values: ['Electric starter & manual starter', 'Electric starter & manual starter'] },
            { key: 'fuelTankCapacity', values: ['12.0 L', '3.17 gal'] },
            { key: 'fuelConsumption', values: ['17.5 L/h', '4.62 gal/h'] },
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
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '1,650 L/min' },
      { label: 'Discharge performance (1.0MPa, 1 m suction head)', value: '1,100 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.1 sec' },
      {
        label: 'Performance note',
        value: '*Performance values represent maximum output under standard factory test conditions; actual performance may vary depending on operating conditions.'
      }
    ]
  };
