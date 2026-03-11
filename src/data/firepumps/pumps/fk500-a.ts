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

export const fk500_a: Firepump = {
    slug: 'fk500-a',
    title: 'FK500-A',
    subtitle: 'Durable, well-balanced performance',
    description: "A well-balanced, durable pump featuring Shibaura's proprietary engine-cooling system. The fully water-cooled radiator ensures reliable operation and extended service life, even in dirty-water environments.",
    valueProp: 'Balanced, durable pump engineered for long service life in harsh conditions.',
    icon: shibauraLogoMark,
    image: fk500Img,
    graphImage: fk500GraphImg,
    manualPdf: fk500ManualPdf,
    features: [
      { label: 'Water-cooled Shibaura engine', icon: watercooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 1,595L/min, 1.0MPa: 1,020L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1 m suction head: 2.2sec', icon: timerIcon }
    ],
    keySpecs: [
      { key: 'pumpModel', value: { en: 'Shibaura B716', fr: 'Shibaura B716' }, icon: modelIcon },
      { key: 'coolingSystem', value: { en: 'Water-cooled', fr: 'Refroidissement par eau' }, icon: watercooledIcon },
      {
        key: 'flowRate',
        value: {
          en: '421 GPM @ 72.5 PSI\n269 GPM @ 145 PSI',
          fr: '421 GPM @ 72,5 PSI\n269 GPM @ 145 PSI'
        },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 2.2 sec', fr: '1 m : 2,2 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '145 PSI (1.0 MPa)', fr: '145 PSI (1,0 MPa)' }, icon: pressureIcon },
      { key: 'engineType', value: { en: '2-stroke gasoline engine', fr: 'Moteur 2 temps à essence' }, icon: engineIcon }
    ],
    benefits: [
      { title: 'Balanced Output', description: '1,595 L/min at 0.5 MPa for steady flow.' },
      { title: 'Water-Cooled System', description: 'Reliable cooling in dirty-water environments.' },
      { title: 'Fast Priming', description: '2.2 sec priming at 1 m suction head.' },
      { title: 'Durable Build', description: 'Designed for extended service life.' }
    ],
    specsTable: {
      columns: ['FK500-A (Metric)', 'FK500-A (Imperial)', 'FK450-A (Metric)', 'FK450-A (Imperial)'],
      groups: [
        {
          title: 'Model',
          rows: [
            { key: 'dimensions', values: ['701 x 652 x 709 mm', '27.6 x 25.7 x 27.9 in', '701 x 652 x 709 mm', '27.6 x 25.7 x 27.9 in']
            },
            { key: 'dryWeight', values: ['85 kg', '187 lb', '85 kg', '187 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { key: 'model', values: ['SHIBAURA B716', 'SHIBAURA B716', 'SHIBAURA B716', 'SHIBAURA B716']
            },
            { key: 'type', values: [
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump'
              ]
            },
            { key: 'dischargePerformance', pressureMPa: '0.5', suctionHeightM: '1', values: [
                '1,595 L/min',
                '421 gpm @ 72.5 psi, 3.3 ft',
                '1,560 L/min',
                '412 gpm @ 72.5 psi, 3.3 ft'
              ]
            },
            { key: 'dischargePerformance', pressureMPa: '0.5', suctionHeightM: '3', values: [
                '1,580 L/min',
                '417 gpm @ 72.5 psi, 9.8 ft',
                '1,550 L/min',
                '409 gpm @ 72.5 psi, 9.8 ft'
              ]
            },
            { key: 'dischargePerformance', pressureMPa: '1.0', suctionHeightM: '1', values: [
                '1,020 L/min',
                '269 gpm @ 145 psi, 3.3 ft',
                '1,000 L/min',
                '264 gpm @ 145 psi, 3.3 ft'
              ]
            },
            { key: 'dischargePerformance', pressureMPa: '1.0', suctionHeightM: '3', values: [
                '975 L/min',
                '258 gpm @ 145 psi, 9.8 ft',
                '950 L/min',
                '251 gpm @ 145 psi, 9.8 ft'
              ]
            },
            { key: 'primingPerformance', qualifier: '1 m', values: [
                '2.2 Seconds',
                '2.2 Seconds (3.3 ft suction head)',
                '2.2 Seconds',
                '2.2 Seconds (3.3 ft suction head)'
              ]
            },
            {
              key: 'dischargeDiameterJis',
              connections: [
                { jp: { size: 65, unit: 'mm', standard: 'JIS' } },
                { jp: { size: 65, unit: 'mm', standard: 'JIS' } },
              ],
            },
            {
              key: 'suctionDiameterJis',
              connections: [
                { jp: { size: 75, unit: 'mm', standard: 'JIS' } },
                { jp: { size: 75, unit: 'mm', standard: 'JIS' } },
              ],
            }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { key: 'model', values: ['SHIBAURA L618Z', 'SHIBAURA L618Z', 'SHIBAURA L618Z', 'SHIBAURA L618Z']
            },
            { key: 'type', values: [
                'Water cooled 2-stroke gasoline engine',
                'Water cooled 2-stroke gasoline engine',
                'Water cooled 2-stroke gasoline engine',
                'Water cooled 2-stroke gasoline engine'
              ]
            },
            { key: 'coolingSystem', values: ['Water cooled type', 'Water cooled type', 'Water cooled type', 'Water cooled type']
            },
            { key: 'cylinderCount', values: ['2 cylinder', '2 cylinder', '2 cylinder', '2 cylinder']
            },
            { key: 'fuelSystem', values: ['Auto choke carburetor', 'Auto choke carburetor', 'Auto choke carburetor', 'Auto choke carburetor']
            },
            { key: 'displacement', values: ['618 cc', '37.7 cu in', '618 cc', '37.7 cu in']
            },
            { key: 'boreStroke', values: ['75 mm x 70 mm', '2.95 x 2.76 in', '75 mm x 70 mm', '2.95 x 2.76 in']
            },
            { key: 'ratedOutput', values: ['33.1 kW / 45 PS', '44.3 hp', '33.1 kW / 45 PS', '44.3 hp']
            },
            { key: 'startingSystem', values: [
                'Electric starter & manual starter',
                'Electric starter & manual starter',
                'Electric starter & manual starter',
                'Electric starter & manual starter'
              ]
            },
            { key: 'fuelTankCapacity', values: ['14.5 L', '3.83 gal', '14.5 L', '3.83 gal']
            },
            { key: 'fuelConsumption', values: ['14 L/h', '3.7 gal/h', '14 L/h', '3.7 gal/h']
            },
            { key: 'fuelType', values: [
                'Regular unleaded gasoline',
                'Regular unleaded gasoline',
                'Regular unleaded gasoline',
                'Regular unleaded gasoline'
              ]
            }
          ]
        },
        {
          title: 'Vacuum Pump',
          rows: [
            { key: 'type', values: [
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type'
              ]
            },
            { key: 'vaneMaterial', values: ['High strength carbon', 'High strength carbon', 'High strength carbon', 'High strength carbon']
            },
            { key: 'maxSuctionHeight', values: ['9 m', '29.5 ft', '9 m', '29.5 ft']
            }
          ]
        },
        {
          title: 'Features',
          rows: [
            { key: 'featureOriginalEngine', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { key: 'featureOriginalCentrifugalPump', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { key: 'featureOriginalVacuumPump', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { key: 'featureAlertMonitoringSystem', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { key: 'featureQuickDischargeValve', values: ['Yes', 'Yes', 'Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '1,595 L/min' },
      { label: 'Discharge performance (1.0MPa, 1 m suction head)', value: '1,020 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec' }
    ]
  };
