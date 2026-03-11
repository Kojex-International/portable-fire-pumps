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

export const ft300_400_a: Firepump = {
    slug: 'ft300-400-a',
    title: 'FT300 / 400-A',
    subtitle: 'Compact and light weight',
    description: 'A compact, lightweight pump delivering class-leading performance. The newly installed 5.3 L fuel tank supports extended operating time.',
    valueProp: 'Lightweight portable fire pump designed for fast setup and reliable output.',
    icon: shibauraLogoMark,
    image: ft400Img,
    graphImage: ft300400GraphImg,
    manualPdf: ft300400ManualPdf,
    features: [
      { label: 'Air-cooled Shibaura engine', icon: aircooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance:\nFT300-A 0.5MPa: 568L/min, 0.8MPa: 318L/min\nFT400-A1 0.5MPa: 568L/min, 0.8MPa: 330L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1 m suction head:\nFT300-A 2.2sec\nFT400-A1 3.5sec', icon: timerIcon }
    ],
    keySpecs: [
      { key: 'pumpModel', value: { en: 'Shibaura C505', fr: 'Shibaura C505' }, icon: modelIcon },
      { key: 'coolingSystem', value: { en: 'Air-cooled', fr: 'Refroidissement par air' }, icon: aircooledIcon },
      {
        key: 'flowRate',
        value: {
          en: '150 GPM @ 72.5 PSI\n84/87 GPM @ 116 PSI',
          fr: '150 GPM @ 72,5 PSI\n84/87 GPM @ 116 PSI'
        },
        icon: dischargeIcon
      },
      {
        key: 'primingTime',
        value: { en: '1 m : 2.2 sec (FT300-A)\n1 m : 3.5 sec (FT400-A1)', fr: '1 m : 2,2 s (FT300-A)\n1 m : 3,5 s (FT400-A1)' },
        icon: timerIcon
      },
      { key: 'maxPressure', value: { en: '116 PSI (0.8 MPa)', fr: '116 PSI (0,8 MPa)' }, icon: pressureIcon },
      { key: 'engineType', value: { en: '2-stroke gasoline engine', fr: 'Moteur 2 temps à essence' }, icon: engineIcon }
    ],
    benefits: [
      { title: 'Lightweight Build', description: 'Compact chassis makes transport and setup easy.' },
      { title: 'Consistent Output', description: '568 L/min at 0.5 MPa for steady flow.' },
      { title: 'Extended Runtime', description: 'Fuel tank supports longer operation windows.' },
      { title: 'Fast Priming', description: '2.2–3.5 sec priming at 1 m suction head.' }
    ],
    specsTable: {
      columns: ['FT300-A (Metric)', 'FT300-A (Imperial)', 'FT400-A1 (Metric)', 'FT400-A1 (Imperial)'],
      groups: [
        {
          title: 'Model',
          rows: [
            { key: 'dimensions', values: ['601 x 463 x 515 mm', '23.7 x 18.2 x 20.3 in', '601 x 463 x 515 mm', '23.7 x 18.2 x 20.3 in']
            },
            { key: 'dryWeight', values: ['44 kg', '97 lb', '45 kg', '99 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { key: 'model', values: ['SHIBAURA C505', 'SHIBAURA C505', 'SHIBAURA C505', 'SHIBAURA C505']
            },
            { key: 'type', values: [
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump'
              ]
            },
            { key: 'dischargePerformance', pressureMPa: '0.5', suctionHeightM: '1', values: [
                '568 L/min',
                '150 gpm @ 72.5 psi, 3.3 ft',
                '568 L/min',
                '150 gpm @ 72.5 psi, 3.3 ft'
              ]
            },
            { key: 'dischargePerformance', pressureMPa: '0.5', suctionHeightM: '3', values: [
                '550 L/min',
                '145 gpm @ 72.5 psi, 9.8 ft',
                '556 L/min',
                '147 gpm @ 72.5 psi, 9.8 ft'
              ]
            },
            { key: 'dischargePerformance', pressureMPa: '0.8', suctionHeightM: '1', values: [
                '318 L/min',
                '84 gpm @ 116 psi, 3.3 ft',
                '330 L/min',
                '87 gpm @ 116 psi, 3.3 ft'
              ]
            },
            { key: 'dischargePerformance', pressureMPa: '0.8', suctionHeightM: '3', values: [
                '300 L/min',
                '79 gpm @ 116 psi, 9.8 ft',
                '309 L/min',
                '82 gpm @ 116 psi, 9.8 ft'
              ]
            },
            { key: 'primingPerformance', qualifier: '1 m', values: [
                '2.2 Seconds',
                '2.2 Seconds (3.3 ft suction head)',
                '3.5 Seconds',
                '3.5 Seconds (3.3 ft suction head)'
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
                { jp: { size: 65, unit: 'mm', standard: 'JIS' } },
                { jp: { size: 65, unit: 'mm', standard: 'JIS' } },
              ],
            }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { key: 'model', values: ['SHIBAURA E200', 'SHIBAURA E200', 'SHIBAURA E200', 'SHIBAURA E200']
            },
            { key: 'type', values: [
                'Air cooled 2-stroke gasoline engine',
                'Air cooled 2-stroke gasoline engine',
                'Air cooled 2-stroke gasoline engine',
                'Air cooled 2-stroke gasoline engine'
              ]
            },
            { key: 'coolingSystem', values: ['Air cooled type', 'Air cooled type', 'Air cooled type', 'Air cooled type']
            },
            { key: 'cylinderCount', values: ['1 cylinder', '1 cylinder', '1 cylinder', '1 cylinder']
            },
            { key: 'fuelSystem', values: ['Auto choke carburetor', 'Auto choke carburetor', 'Auto choke carburetor', 'Auto choke carburetor']
            },
            { key: 'displacement', values: ['200 cc', '12.2 cu in', '200 cc', '12.2 cu in']
            },
            { key: 'boreStroke', values: ['68 mm x 55 mm', '2.68 x 2.17 in', '68 mm x 55 mm', '2.68 x 2.17 in']
            },
            { key: 'ratedOutput', values: ['8.8 kW / 12 PS', '11.8 hp', '8.8 kW / 12 PS', '11.8 hp']
            },
            { key: 'startingSystem', values: [
                'Electric starter & manual starter',
                'Electric starter & manual starter',
                'Electric starter & manual starter',
                'Electric starter & manual starter'
              ]
            },
            { key: 'fuelTankCapacity', values: ['4.0 L', '1.06 gal', '4.0 L', '1.06 gal']
            },
            { key: 'fuelConsumption', values: ['5.4 L/h', '1.43 gal/h', '5.6 L/h', '1.48 gal/h']
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
            { key: 'featureAlertMonitoringSystem', values: ['-', '-', '-', '-'] },
            { key: 'featureQuickDischargeValve', values: ['Yes', 'Yes', 'Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '568 L/min' },
      { label: 'Discharge performance (0.8MPa, 1 m suction head)', value: '318 L/min (FT300-A), 330 L/min (FT400-A1)' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec (FT300-A), 3.5 sec (FT400-A1)' }
    ]
  };
