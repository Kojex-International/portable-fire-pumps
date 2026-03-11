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

export const tf516mh_ab: Firepump = {
    slug: 'tf516mh-ab',
    title: 'TF516MH-AB',
    subtitle: 'The smallest pump in its class, offering superior mobility',
    description: "Its compact, lightweight design with Shibaura's proprietary air-cooled engine allows for simple installation on small vehicles.",
    valueProp: 'Smallest-in-class pump for rapid deployment and easy vehicle mounting.',
    icon: shibauraLogoMark,
    image: tf516mhImg,
    graphImage: tf516mhGraphImg,
    manualPdf: tf516mhManualPdf,
    features: [
      { label: 'Air-cooled Shibaura engine', icon: aircooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 560L/min, 1.0MPa: 280L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1 m suction head: 3.6sec', icon: timerIcon }
    ],
    keySpecs: [
      { key: 'pumpModel', value: { en: 'Shibaura C505', fr: 'Shibaura C505' }, icon: modelIcon },
      { key: 'coolingSystem', value: { en: 'Air-cooled', fr: 'Refroidissement par air' }, icon: aircooledIcon },
      {
        key: 'flowRate',
        value: {
          en: '148 GPM @ 72.5 PSI\n74 GPM @ 116 PSI',
          fr: '148 GPM @ 72,5 PSI\n74 GPM @ 116 PSI'
        },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 3.6 sec', fr: '1 m : 3,6 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '116 PSI (0.8 MPa)', fr: '116 PSI (0,8 MPa)' }, icon: pressureIcon },
      { key: 'engineType', value: { en: '2-stroke gasoline engine', fr: 'Moteur 2 temps à essence' }, icon: engineIcon }
    ],
    benefits: [
      { title: 'Compact Footprint', description: 'Smallest-in-class size for tight vehicle mounts.' },
      { title: 'Reliable Air Cooling', description: 'Simplified cooling with easy maintenance access.' },
      { title: 'Solid Discharge', description: '560 L/min at 0.5 MPa for consistent output.' },
      { title: 'Fast Priming', description: '3.6 sec priming at 1 m suction head.' }
    ],
    specsTable: {
      columns: ['Metric', 'Imperial'],
      groups: [
        {
          title: 'Model',
          rows: [
            { key: 'dimensions', values: ['555 x 466 x 520 mm', '21.9 x 18.3 x 20.5 in'] },
            { key: 'dryWeight', values: ['41 kg', '90 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { key: 'model', values: ['SHIBAURA C505', 'SHIBAURA C505'] },
            { key: 'type', values: ['High pressure, single stage centrifugal pump', 'High pressure, single stage centrifugal pump'] },
            { key: 'dischargePerformance', pressureMPa: '0.5', suctionHeightM: '1', values: ['560 L/min', '148 gpm @ 72.5 psi, 3.3 ft'] },
            { key: 'dischargePerformance', pressureMPa: '0.5', suctionHeightM: '3', values: ['533 L/min', '141 gpm @ 72.5 psi, 9.8 ft'] },
            { key: 'dischargePerformance', pressureMPa: '0.8', suctionHeightM: '1', values: ['280 L/min (0.8MPa)', '74 gpm @ 116 psi, 3.3 ft'] },
            { key: 'dischargePerformance', pressureMPa: '0.8', suctionHeightM: '3', values: ['257 L/min (0.8MPa)', '68 gpm @ 116 psi, 9.8 ft'] },
            { key: 'primingPerformance', qualifier: '1 m', values: ['3.6 Seconds', '3.6 Seconds (3.3 ft suction head)'] },
            {
              key: 'dischargeDiameterJis',
              connections: {
                jp: { size: 65, unit: 'mm', standard: 'JIS' },
              },
            },
            {
              key: 'suctionDiameterJis',
              connections: {
                jp: { size: 65, unit: 'mm', standard: 'JIS' },
              },
            }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { key: 'model', values: ['SHIBAURA E180A', 'SHIBAURA E180A'] },
            { key: 'type', values: ['Air cooled 2-stroke gasoline engine', 'Air cooled 2-stroke gasoline engine'] },
            { key: 'coolingSystem', values: ['Air cooled type', 'Air cooled type'] },
            { key: 'cylinderCount', values: ['1 cylinder', '1 cylinder'] },
            { key: 'fuelSystem', values: ['Auto choke carburetor', 'Auto choke carburetor'] },
            { key: 'displacement', values: ['182 cc', '11.1 cu in'] },
            { key: 'boreStroke', values: ['65 mm x 55 mm', '2.56 x 2.17 in'] },
            { key: 'ratedOutput', values: ['8.1 kW / 11 PS', '10.8 hp'] },
            { key: 'startingSystem', values: ['Electric starter & manual starter', 'Electric starter & manual starter'] },
            { key: 'fuelTankCapacity', values: ['4.2 L', '1.11 gal'] },
            { key: 'fuelConsumption', values: ['4.6 L/h', '1.22 gal/h'] },
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
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '560 L/min' },
      { label: 'Discharge performance (0.8MPa, 1 m suction head)', value: '280 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '3.6 sec' }
    ]
  };
