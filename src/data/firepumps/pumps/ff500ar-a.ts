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

export const ff500ar_a: Firepump = {
    slug: 'ff500ar-a',
    title: 'FF500AR-A',
    subtitle: 'Auto Relay for long-distance water delivery',
    description: 'Enables long-distance water delivery by automatically relaying flow between pumps without operator intervention. Electronic fuel injection ensures easy starting and efficient fuel consumption.',
    valueProp: 'Auto-relay pump for long-distance water delivery and efficient operations.',
    icon: shibauraLogoMark,
    image: ff500arImg,
    graphImage: ff500arGraphImg,
    manualPdf: ff500ManualPdf,
    features: [
      { label: 'Water-cooled Shibaura engine', icon: watercooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Fuel Injection System', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 1,550L/min, 1.0MPa: 980L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1 m suction head: 2.2sec', icon: timerIcon }
    ],
    keySpecs: [
      { key: 'pumpModel', value: { en: 'Shibaura P556', fr: 'Shibaura P556' }, icon: modelIcon },
      { key: 'coolingSystem', value: { en: 'Water-cooled', fr: 'Refroidissement par eau' }, icon: watercooledIcon },
      {
        key: 'flowRate',
        value: {
          en: '409 GPM @ 72.5 PSI\n259 GPM @ 145 PSI',
          fr: '409 GPM @ 72,5 PSI\n259 GPM @ 145 PSI'
        },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 2.2 sec', fr: '1 m : 2,2 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '145 PSI (1.0 MPa)', fr: '145 PSI (1,0 MPa)' }, icon: pressureIcon },
      { key: 'engineType', value: { en: '2-stroke gasoline engine', fr: 'Moteur 2 temps à essence' }, icon: engineIcon }
    ],
    benefits: [
      { title: 'Auto Relay', description: 'Automated relay supports long-distance water delivery.' },
      { title: 'EFI Fuel System', description: 'Electronic injection for easier starting and efficiency.' },
      { title: 'High Output', description: '1,550 L/min at 0.5 MPa for sustained flow.' },
      { title: 'Fast Priming', description: '2.2 sec priming at 1 m suction head.' }
    ],
    specsTable: {
      columns: ['Metric', 'Imperial'],
      groups: [
        {
          title: 'Model',
          rows: [
            { key: 'dimensions', values: ['681 x 639 x 774 mm', '26.8 x 25.2 x 30.5 in'] },
            { key: 'dryWeight', values: ['98 kg', '216 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { key: 'model', values: ['SHIBAURA P556', 'SHIBAURA P556'] },
            { key: 'type', values: ['High pressure, single stage centrifugal pump', 'High pressure, single stage centrifugal pump'] },
            { key: 'dischargePerformance', pressureMPa: '0.5', suctionHeightM: '1', values: ['1,550 L/min', '409 gpm @ 72.5 psi, 3.3 ft'] },
            { key: 'dischargePerformance', pressureMPa: '0.7', suctionHeightM: '3', values: ['1,320 L/min (0.7MPa)', '349 gpm @ 101.5 psi, 9.8 ft'] },
            { key: 'dischargePerformance', pressureMPa: '1.0', suctionHeightM: '1', values: ['980 L/min', '259 gpm @ 145 psi, 3.3 ft'] },
            { key: 'dischargePerformance', pressureMPa: '1.0', suctionHeightM: '3', values: ['960 L/min', '254 gpm @ 145 psi, 9.8 ft'] },
            { key: 'primingPerformance', qualifier: '1 m', values: ['2.2 Seconds', '2.2 Seconds (3.3 ft suction head)'] },
            {
              key: 'dischargeDiameterJis',
              connections: {
                jp: { size: 65, unit: 'mm', standard: 'JIS' },
              },
            },
            {
              key: 'suctionDiameterJis',
              connections: {
                jp: { size: 75, unit: 'mm', standard: 'JIS' },
              },
            }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { key: 'model', values: ['SHIBAURA EP556', 'SHIBAURA EP556'] },
            { key: 'type', values: ['Water cooled 2-stroke gasoline engine', 'Water cooled 2-stroke gasoline engine'] },
            { key: 'coolingSystem', values: ['Water cooled type', 'Water cooled type'] },
            { key: 'cylinderCount', values: ['2 cylinder', '2 cylinder'] },
            { key: 'fuelSystem', values: ['Electronic control fuel injection', 'Electronic control fuel injection'] },
            { key: 'displacement', values: ['635 cc', '38.8 cu in'] },
            { key: 'boreStroke', values: ['76 mm x 70 mm', '2.99 x 2.76 in'] },
            { key: 'ratedOutput', values: ['32.0 kW / 43 PS', '42.4 hp'] },
            { key: 'startingSystem', values: ['Electric starter & manual starter', 'Electric starter & manual starter'] },
            { key: 'fuelTankCapacity', values: ['11.0 L', '2.91 gal'] },
            { key: 'fuelConsumption', values: ['17.0 L/h', '4.49 gal/h'] },
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
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '1,550 L/min' },
      { label: 'Discharge performance (1.0MPa, 1 m suction head)', value: '980 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec' }
    ]
  };
