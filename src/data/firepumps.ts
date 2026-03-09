import type { ImageMetadata } from 'astro';

import ft510Img from '@assets/ft510.jpg';
import ft400Img from '@assets/ft400.jpg';
import tf516mhImg from '@assets/tf516mh.jpg';
import p572sImg from '@assets/p572s.jpg';
import fk500Img from '@assets/fk500.jpg';
import ff500arImg from '@assets/ff500ar.jpg';
import ft510GraphImg from '@assets/ft510Graph.png';
import ft300400GraphImg from '@assets/ft300-400Graph.png';
import tf516mhGraphImg from '@assets/tf516mhGraph.png';
import p572sGraphImg from '@assets/p572sGraph.png';
import fk500GraphImg from '@assets/fk500aGraph.png';
import ff500arGraphImg from '@assets/ff500arGraph.png';
import ft300400ManualPdf from './manuals/aircooled/ft300-400Manual.pdf';
import ft450500ManualPdf from './manuals/aircooled/ft450-500Manual.pdf';
import ft510ManualPdf from './manuals/aircooled/ft510Manual.pdf';
import tf516mhManualPdf from './manuals/aircooled/tf516mhManual.pdf';
import p572sManualPdf from './manuals/watercooled/p572sManual.pdf';
import fk500ManualPdf from './manuals/watercooled/fk500Manual.pdf';
import ff500ManualPdf from './manuals/watercooled/ff500Manual.pdf';

import shibauraLogoMark from '@assets/shibaura-logo-mark.svg?url';
import aircooledIcon from '@assets/icons/aircooled.svg?url';
import watercooledIcon from '@assets/icons/watercooled.svg?url';
import dischargeIcon from '@assets/icons/discharge.svg?url';
import engineIcon from '@assets/icons/engine.svg?url';
import carburatorIcon from '@assets/icons/carburator.svg?url';
import timerIcon from '@assets/icons/timer.svg?url';
import checkIcon from '@assets/icons/check.svg?url';
import pressureIcon from '@assets/icons/pressure.svg?url';
import modelIcon from '@assets/icons/model.svg?url';
import { localizeSpecGroupTitle, localizeSpecLabel } from './specLabels';
import { getHeroFeatureLabel, type HeroFeatureLabelKey } from '../i18n/heroFeatureLabels';

export interface FirepumpFeature {
  label: string;
  icon: string;
}

type LocalizedValue = {
  en: string;
  fr: string;
};

export interface Firepump {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  valueProp: string;
  icon: string;
  image: ImageMetadata;
  graphImage: ImageMetadata;
  manualPdf?: string;
  aliases?: string[];
  features: FirepumpFeature[];
  keySpecs: { key: HeroFeatureLabelKey; label?: string; value: string | LocalizedValue; icon: string }[];
  benefits: { title: string; description: string }[];
  specsTable: {
    columns: string[];
    groups: {
      title: string;
      rows: { label: string; values: string[] }[];
    }[];
  };
  performance: { label: string; value: string }[];
}

const shibauraLogoIcon = shibauraLogoMark;

export const firepumps: Firepump[] = [
  {
    slug: 'ft510-a',
    title: 'FT510-A',
    subtitle: "Strong power with Shibaura's original air-cooled engine",
    description:
      "Shibaura's largest air-cooled engine delivers strong power without influencing water quality.",
    valueProp:
      'Big-bore air-cooled performance with fast starting and quick valve control for demanding field use.',
    icon: shibauraLogoIcon,
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
        value: { en: '0.5 MPa @ 1,450 L/min\n1.0 MPa @ 830 L/min', fr: '0,5 MPa @ 1,450 L/min\n1,0 MPa @ 830 L/min' },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 3.5 sec', fr: '1 m : 3,5 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '1.0 MPa', fr: '1,0 MPa' }, icon: pressureIcon },
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
            { label: 'Dimensions LxWxH (mm)', values: ['737 x 572 x 740', '29.0 x 22.5 x 29.1 in'] },
            { label: 'Dry Weight', values: ['90 kg', '198 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { label: 'Model', values: ['SHIBAURA B612B', 'SHIBAURA B612B'] },
            { label: 'Type', values: ['High pressure, single stage centrifugal pump', 'High pressure, single stage centrifugal pump'] },
            { label: 'Discharge performance (0.5MPa, 1m suction head)', values: ['1,450 L/min', '383 gpm @ 72.5 psi, 3.3 ft'] },
            { label: 'Discharge performance (0.5MPa, 3m suction head)', values: ['1,435 L/min', '379 gpm @ 72.5 psi, 9.8 ft'] },
            { label: 'Discharge performance (1.0MPa, 1m suction head)', values: ['830 L/min', '219 gpm @ 145 psi, 3.3 ft'] },
            { label: 'Discharge performance (1.0MPa, 3m suction head)', values: ['790 L/min', '209 gpm @ 145 psi, 9.8 ft'] },
            { label: 'Priming performance at 1m suction head', values: ['3.5 Seconds', '3.5 Seconds (3.3 ft suction head)'] },
            { label: 'Discharge Diameter JIS', values: ['65 mm', '2.6 in'] },
            { label: 'Suction Diameter JIS', values: ['75 mm', '3.0 in'] }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { label: 'Model', values: ['SHIBAURA E440C', 'SHIBAURA E440C'] },
            { label: 'Type', values: ['Air cooled 2-stroke gasoline engine', 'Air cooled 2-stroke gasoline engine'] },
            { label: 'Cooling system', values: ['Air cooled type', 'Air cooled type'] },
            { label: 'No of cylinder', values: ['2 cylinder', '2 cylinder'] },
            { label: 'Fuel system', values: ['Auto choke carburetor', 'Auto choke carburetor'] },
            { label: 'Displacement', values: ['436 cc', '26.6 cu in'] },
            { label: 'Bore x Stroke', values: ['68 mm x 60 mm', '2.68 x 2.36 in'] },
            { label: 'Rated output', values: ['22.8 kW / 31 PS', '30.6 hp'] },
            { label: 'Starting', values: ['Electric starter & manual starter', 'Electric starter & manual starter'] },
            { label: 'Fuel tank capacity', values: ['14.5 L', '3.83 gal'] },
            { label: 'Fuel consumption', values: ['14.0 L/h', '3.7 gal/h'] },
            { label: 'Fuel type', values: ['Regular unleaded gasoline', 'Regular unleaded gasoline'] }
          ]
        },
        {
          title: 'Vacuum Pump',
          rows: [
            { label: 'Type', values: ['4-Vane eccentric rotary type', '4-Vane eccentric rotary type'] },
            { label: 'Blade type', values: ['High strength carbon', 'High strength carbon'] },
            { label: 'Maximum suction height', values: ['9 m', '29.5 ft'] }
          ]
        },
        {
          title: 'Features',
          rows: [
            { label: 'Shibaura Original 2 cycle Gasoline Engine', values: ['Yes', 'Yes'] },
            { label: 'Shibaura Original Centrifugal Pump', values: ['Yes', 'Yes'] },
            { label: 'Shibaura Original Vacuum Pump', values: ['Yes', 'Yes'] },
            { label: 'Alert Monitoring System', values: ['Yes', 'Yes'] },
            { label: 'Quick Discharge Valve', values: ['Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '1,450 L/min' },
      { label: 'Discharge performance (0.5MPa, 3 m suction head)', value: '1,435 L/min' },
      { label: 'Discharge performance (1.0MPa, 1 m suction head)', value: '830 L/min' },
      { label: 'Discharge performance (1.0MPa, 3 m suction head)', value: '790 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '3.5 sec' }
    ]
  },
  {
    slug: 'ft300-400-a',
    title: 'FT300 / 400-A',
    subtitle: 'Compact and light weight',
    description: 'A compact, lightweight pump delivering class-leading performance. The newly installed 5.3 L fuel tank supports extended operating time.',
    valueProp: 'Lightweight portable fire pump designed for fast setup and reliable output.',
    icon: shibauraLogoIcon,
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
        value: { en: '0.5 MPa @ 568 L/min\n0.8 MPa @ 318/330 L/min', fr: '0,5 MPa @ 568 L/min\n0,8 MPa @ 318/330 L/min' },
        icon: dischargeIcon
      },
      {
        key: 'primingTime',
        value: { en: '1 m : 2.2 sec (FT300-A)\n1 m : 3.5 sec (FT400-A1)', fr: '1 m : 2,2 s (FT300-A)\n1 m : 3,5 s (FT400-A1)' },
        icon: timerIcon
      },
      { key: 'maxPressure', value: { en: '0.8 MPa', fr: '0,8 MPa' }, icon: pressureIcon },
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
            {
              label: 'Dimensions LxWxH (mm)',
              values: ['601 x 463 x 515', '23.7 x 18.2 x 20.3 in', '601 x 463 x 515', '23.7 x 18.2 x 20.3 in']
            },
            { label: 'Dry Weight', values: ['44 kg', '97 lb', '45 kg', '99 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            {
              label: 'Model',
              values: ['SHIBAURA C505', 'SHIBAURA C505', 'SHIBAURA C505', 'SHIBAURA C505']
            },
            {
              label: 'Type',
              values: [
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump'
              ]
            },
            {
              label: 'Discharge performance (0.5MPa, 1m suction head)',
              values: [
                '568 L/min',
                '150 gpm @ 72.5 psi, 3.3 ft',
                '568 L/min',
                '150 gpm @ 72.5 psi, 3.3 ft'
              ]
            },
            {
              label: 'Discharge performance (0.5MPa, 3m suction head)',
              values: [
                '550 L/min',
                '145 gpm @ 72.5 psi, 9.8 ft',
                '556 L/min',
                '147 gpm @ 72.5 psi, 9.8 ft'
              ]
            },
            {
              label: 'Discharge performance (0.8MPa, 1m suction head)',
              values: [
                '318 L/min',
                '84 gpm @ 116 psi, 3.3 ft',
                '330 L/min',
                '87 gpm @ 116 psi, 3.3 ft'
              ]
            },
            {
              label: 'Discharge performance (0.8MPa, 3m suction head)',
              values: [
                '300 L/min',
                '79 gpm @ 116 psi, 9.8 ft',
                '309 L/min',
                '82 gpm @ 116 psi, 9.8 ft'
              ]
            },
            {
              label: 'Priming performance at 1m suction head',
              values: [
                '2.2 Seconds',
                '2.2 Seconds (3.3 ft suction head)',
                '3.5 Seconds',
                '3.5 Seconds (3.3 ft suction head)'
              ]
            },
            {
              label: 'Discharge Diameter JIS',
              values: ['65 mm', '2.6 in', '65 mm', '2.6 in']
            },
            {
              label: 'Suction Diameter JIS',
              values: ['65 mm', '2.6 in', '65 mm', '2.6 in']
            }
          ]
        },
        {
          title: 'Engine',
          rows: [
            {
              label: 'Model',
              values: ['SHIBAURA E200', 'SHIBAURA E200', 'SHIBAURA E200', 'SHIBAURA E200']
            },
            {
              label: 'Type',
              values: [
                'Air cooled 2-stroke gasoline engine',
                'Air cooled 2-stroke gasoline engine',
                'Air cooled 2-stroke gasoline engine',
                'Air cooled 2-stroke gasoline engine'
              ]
            },
            {
              label: 'Cooling system',
              values: ['Air cooled type', 'Air cooled type', 'Air cooled type', 'Air cooled type']
            },
            {
              label: 'No of cylinder',
              values: ['1 cylinder', '1 cylinder', '1 cylinder', '1 cylinder']
            },
            {
              label: 'Fuel system',
              values: ['Auto choke carburetor', 'Auto choke carburetor', 'Auto choke carburetor', 'Auto choke carburetor']
            },
            {
              label: 'Displacement',
              values: ['200 cc', '12.2 cu in', '200 cc', '12.2 cu in']
            },
            {
              label: 'Bore x Stroke',
              values: ['68 mm x 55 mm', '2.68 x 2.17 in', '68 mm x 55 mm', '2.68 x 2.17 in']
            },
            {
              label: 'Rated output',
              values: ['8.8 kW / 12 PS', '11.8 hp', '8.8 kW / 12 PS', '11.8 hp']
            },
            {
              label: 'Starting',
              values: [
                'Electric starter & manual starter',
                'Electric starter & manual starter',
                'Electric starter & manual starter',
                'Electric starter & manual starter'
              ]
            },
            {
              label: 'Fuel tank capacity',
              values: ['4.0 L', '1.06 gal', '4.0 L', '1.06 gal']
            },
            {
              label: 'Fuel consumption',
              values: ['5.4 L/h', '1.43 gal/h', '5.6 L/h', '1.48 gal/h']
            },
            {
              label: 'Fuel type',
              values: [
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
            {
              label: 'Type',
              values: [
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type'
              ]
            },
            {
              label: 'Blade type',
              values: ['High strength carbon', 'High strength carbon', 'High strength carbon', 'High strength carbon']
            },
            {
              label: 'Maximum suction height',
              values: ['9 m', '29.5 ft', '9 m', '29.5 ft']
            }
          ]
        },
        {
          title: 'Features',
          rows: [
            { label: 'Shibaura Original 2 cycle Gasoline Engine', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { label: 'Shibaura Original Centrifugal Pump', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { label: 'Shibaura Original Vacuum Pump', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { label: 'Alert Monitoring System', values: ['-', '-', '-', '-'] },
            { label: 'Quick Discharge Valve', values: ['Yes', 'Yes', 'Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '568 L/min' },
      { label: 'Discharge performance (0.8MPa, 1 m suction head)', value: '318 L/min (FT300-A), 330 L/min (FT400-A1)' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec (FT300-A), 3.5 sec (FT400-A1)' }
    ]
  },
  {
    slug: 'tf516mh-ab',
    title: 'TF516MH-AB',
    subtitle: 'The smallest pump in its class, offering superior mobility',
    description: "Its compact, lightweight design with Shibaura's proprietary air-cooled engine allows for simple installation on small vehicles.",
    valueProp: 'Smallest-in-class pump for rapid deployment and easy vehicle mounting.',
    icon: shibauraLogoIcon,
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
        value: { en: '0.5 MPa @ 560 L/min\n1.0 MPa @ 280 L/min', fr: '0,5 MPa @ 560 L/min\n1,0 MPa @ 280 L/min' },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 3.6 sec', fr: '1 m : 3,6 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '1.0 MPa', fr: '1,0 MPa' }, icon: pressureIcon },
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
            { label: 'Dimensions LxWxH (mm)', values: ['555 x 466 x 520', '21.9 x 18.3 x 20.5 in'] },
            { label: 'Dry Weight', values: ['41 kg', '90 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { label: 'Model', values: ['SHIBAURA C505', 'SHIBAURA C505'] },
            { label: 'Type', values: ['High pressure, single stage centrifugal pump', 'High pressure, single stage centrifugal pump'] },
            { label: 'Discharge performance (0.5MPa, 1m suction head)', values: ['560 L/min', '148 gpm @ 72.5 psi, 3.3 ft'] },
            { label: 'Discharge performance (0.5MPa, 3m suction head)', values: ['533 L/min', '141 gpm @ 72.5 psi, 9.8 ft'] },
            { label: 'Discharge performance (1.0MPa, 1m suction head)', values: ['280 L/min (0.8MPa)', '74 gpm @ 116 psi, 3.3 ft'] },
            { label: 'Discharge performance (1.0MPa, 3m suction head)', values: ['257 L/min (0.8MPa)', '68 gpm @ 116 psi, 9.8 ft'] },
            { label: 'Priming performance at 1m suction head', values: ['3.6 Seconds', '3.6 Seconds (3.3 ft suction head)'] },
            { label: 'Discharge Diameter JIS', values: ['65 mm', '2.6 in'] },
            { label: 'Suction Diameter JIS', values: ['65 mm', '2.6 in'] }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { label: 'Model', values: ['SHIBAURA E180A', 'SHIBAURA E180A'] },
            { label: 'Type', values: ['Air cooled 2-stroke gasoline engine', 'Air cooled 2-stroke gasoline engine'] },
            { label: 'Cooling system', values: ['Air cooled type', 'Air cooled type'] },
            { label: 'No of cylinder', values: ['1 cylinder', '1 cylinder'] },
            { label: 'Fuel system', values: ['Auto choke carburetor', 'Auto choke carburetor'] },
            { label: 'Displacement', values: ['182 cc', '11.1 cu in'] },
            { label: 'Bore x Stroke', values: ['65 mm x 55 mm', '2.56 x 2.17 in'] },
            { label: 'Rated output', values: ['8.1 kW / 11 PS', '10.8 hp'] },
            { label: 'Starting', values: ['Electric starter & manual starter', 'Electric starter & manual starter'] },
            { label: 'Fuel tank capacity', values: ['4.2 L', '1.11 gal'] },
            { label: 'Fuel consumption', values: ['4.6 L/h', '1.22 gal/h'] },
            { label: 'Fuel type', values: ['Regular unleaded gasoline', 'Regular unleaded gasoline'] }
          ]
        },
        {
          title: 'Vacuum Pump',
          rows: [
            { label: 'Type', values: ['4-Vane eccentric rotary type', '4-Vane eccentric rotary type'] },
            { label: 'Blade type', values: ['High strength carbon', 'High strength carbon'] },
            { label: 'Maximum suction height', values: ['9 m', '29.5 ft'] }
          ]
        },
        {
          title: 'Features',
          rows: [
            { label: 'Shibaura Original 2 cycle Gasoline Engine', values: ['Yes', 'Yes'] },
            { label: 'Shibaura Original Centrifugal Pump', values: ['Yes', 'Yes'] },
            { label: 'Shibaura Original Vacuum Pump', values: ['Yes', 'Yes'] },
            { label: 'Alert Monitoring System', values: ['Yes', 'Yes'] },
            { label: 'Quick Discharge Valve', values: ['Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '560 L/min' },
      { label: 'Discharge performance (0.8MPa, 1 m suction head)', value: '280 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '3.6 sec' }
    ]
  },
  {
    slug: 'p572s-a',
    title: 'P572S-A',
    subtitle: 'Highest discharge performance of our lineup',
    description: 'Delivers the highest discharge performance. A large oil-less vacuum pump combined with a high-output engine enables faster priming and a greater volume of water discharge within its class.',
    valueProp: 'High-output fire pump built for demanding operations and rapid priming.',
    icon: shibauraLogoIcon,
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
        value: { en: '0.5 MPa @ 1,650 L/min\n1.0 MPa @ 1,100 L/min', fr: '0,5 MPa @ 1,650 L/min\n1,0 MPa @ 1,100 L/min' },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 2.1 sec', fr: '1 m : 2,1 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '1.0 MPa', fr: '1,0 MPa' }, icon: pressureIcon },
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
            { label: 'Dimensions LxWxH (mm)', values: ['657 x 584 x 720', '25.9 x 23.0 x 28.3 in'] },
            { label: 'Dry Weight', values: ['94 kg', '207 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { label: 'Model', values: ['SHIBAURA P572', 'SHIBAURA P572'] },
            { label: 'Type', values: ['High pressure, single stage centrifugal pump', 'High pressure, single stage centrifugal pump'] },
            { label: 'Discharge performance (0.5MPa, 1m suction head)', values: ['1,650 L/min', '436 gpm @ 72.5 psi, 3.3 ft'] },
            { label: 'Discharge performance (0.7MPa, 1m suction head)', values: ['1,600 L/min', '423 gpm @ 101.5 psi, 3.3 ft'] },
            { label: 'Discharge performance (1.0MPa, 1m suction head)', values: ['1,100 L/min', '291 gpm @ 145 psi, 3.3 ft'] },
            { label: 'Discharge performance (1.0MPa, 3m suction head)', values: ['1,070 L/min', '283 gpm @ 145 psi, 9.8 ft'] },
            { label: 'Priming performance at 1m suction head', values: ['2.1 Seconds', '2.1 Seconds (3.3 ft suction head)'] },
            { label: 'Discharge Diameter JIS', values: ['65 mm', '2.6 in'] },
            { label: 'Suction Diameter JIS', values: ['75 mm', '3.0 in'] }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { label: 'Model', values: ['SHIBAURA EP572', 'SHIBAURA EP572'] },
            { label: 'Type', values: ['Water cooled 2-stroke gasoline engine', 'Water cooled 2-stroke gasoline engine'] },
            { label: 'Cooling system', values: ['Water cooled type', 'Water cooled type'] },
            { label: 'No of cylinder', values: ['2 cylinder', '2 cylinder'] },
            { label: 'Fuel system', values: ['Auto choke carburetor', 'Auto choke carburetor'] },
            { label: 'Displacement', values: ['723 cc', '44.1 cu in'] },
            { label: 'Bore x Stroke', values: ['80 mm x 72 mm', '3.15 x 2.83 in'] },
            { label: 'Rated output', values: ['34.3 kW / 46 PS', '45.3 hp'] },
            { label: 'Starting', values: ['Electric starter & manual starter', 'Electric starter & manual starter'] },
            { label: 'Fuel tank capacity', values: ['12.0 L', '3.17 gal'] },
            { label: 'Fuel consumption', values: ['17.5 L/h', '4.62 gal/h'] },
            { label: 'Fuel type', values: ['Regular unleaded gasoline', 'Regular unleaded gasoline'] }
          ]
        },
        {
          title: 'Vacuum Pump',
          rows: [
            { label: 'Type', values: ['4-Vane eccentric rotary type', '4-Vane eccentric rotary type'] },
            { label: 'Blade type', values: ['High strength carbon', 'High strength carbon'] },
            { label: 'Maximum suction height', values: ['9 m', '29.5 ft'] }
          ]
        },
        {
          title: 'Features',
          rows: [
            { label: 'Shibaura Original 2 cycle Gasoline Engine', values: ['Yes', 'Yes'] },
            { label: 'Shibaura Original Centrifugal Pump', values: ['Yes', 'Yes'] },
            { label: 'Shibaura Original Vacuum Pump', values: ['Yes', 'Yes'] },
            { label: 'Alert Monitoring System', values: ['Yes', 'Yes'] },
            { label: 'Quick Discharge Valve', values: ['Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '1,650 L/min' },
      { label: 'Discharge performance (1.0MPa, 1 m suction head)', value: '1,100 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.1 sec' }
    ]
  },
  {
    slug: 'fk500-a',
    title: 'FK500-A',
    subtitle: 'Durable, well-balanced performance',
    description: "A well-balanced, durable pump featuring Shibaura's proprietary engine-cooling system. The fully water-cooled radiator ensures reliable operation and extended service life, even in dirty-water environments.",
    valueProp: 'Balanced, durable pump engineered for long service life in harsh conditions.',
    icon: shibauraLogoIcon,
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
        value: { en: '0.5 MPa @ 1,595 L/min\n1.0 MPa @ 1,020 L/min', fr: '0,5 MPa @ 1,595 L/min\n1,0 MPa @ 1,020 L/min' },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 2.2 sec', fr: '1 m : 2,2 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '1.0 MPa', fr: '1,0 MPa' }, icon: pressureIcon },
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
            {
              label: 'Dimensions LxWxH (mm)',
              values: ['701 x 652 x 709', '27.6 x 25.7 x 27.9 in', '701 x 652 x 709', '27.6 x 25.7 x 27.9 in']
            },
            { label: 'Dry Weight', values: ['85 kg', '187 lb', '85 kg', '187 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            {
              label: 'Model',
              values: ['SHIBAURA B716', 'SHIBAURA B716', 'SHIBAURA B716', 'SHIBAURA B716']
            },
            {
              label: 'Type',
              values: [
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump',
                'High pressure, single stage centrifugal pump'
              ]
            },
            {
              label: 'Discharge performance (0.5MPa, 1m suction head)',
              values: [
                '1,595 L/min',
                '421 gpm @ 72.5 psi, 3.3 ft',
                '1,560 L/min',
                '412 gpm @ 72.5 psi, 3.3 ft'
              ]
            },
            {
              label: 'Discharge performance (0.5MPa, 3m suction head)',
              values: [
                '1,580 L/min',
                '417 gpm @ 72.5 psi, 9.8 ft',
                '1,550 L/min',
                '409 gpm @ 72.5 psi, 9.8 ft'
              ]
            },
            {
              label: 'Discharge performance (1.0MPa, 1m suction head)',
              values: [
                '1,020 L/min',
                '269 gpm @ 145 psi, 3.3 ft',
                '1,000 L/min',
                '264 gpm @ 145 psi, 3.3 ft'
              ]
            },
            {
              label: 'Discharge performance (1.0MPa, 3m suction head)',
              values: [
                '975 L/min',
                '258 gpm @ 145 psi, 9.8 ft',
                '950 L/min',
                '251 gpm @ 145 psi, 9.8 ft'
              ]
            },
            {
              label: 'Priming performance at 1m suction head',
              values: [
                '2.2 Seconds',
                '2.2 Seconds (3.3 ft suction head)',
                '2.2 Seconds',
                '2.2 Seconds (3.3 ft suction head)'
              ]
            },
            {
              label: 'Discharge Diameter JIS',
              values: ['65 mm', '2.6 in', '65 mm', '2.6 in']
            },
            {
              label: 'Suction Diameter JIS',
              values: ['75 mm', '3.0 in', '75 mm', '3.0 in']
            }
          ]
        },
        {
          title: 'Engine',
          rows: [
            {
              label: 'Model',
              values: ['SHIBAURA L618Z', 'SHIBAURA L618Z', 'SHIBAURA L618Z', 'SHIBAURA L618Z']
            },
            {
              label: 'Type',
              values: [
                'Water cooled 2-stroke gasoline engine',
                'Water cooled 2-stroke gasoline engine',
                'Water cooled 2-stroke gasoline engine',
                'Water cooled 2-stroke gasoline engine'
              ]
            },
            {
              label: 'Cooling system',
              values: ['Water cooled type', 'Water cooled type', 'Water cooled type', 'Water cooled type']
            },
            {
              label: 'No of cylinder',
              values: ['2 cylinder', '2 cylinder', '2 cylinder', '2 cylinder']
            },
            {
              label: 'Fuel system',
              values: ['Auto choke carburetor', 'Auto choke carburetor', 'Auto choke carburetor', 'Auto choke carburetor']
            },
            {
              label: 'Displacement',
              values: ['618 cc', '37.7 cu in', '618 cc', '37.7 cu in']
            },
            {
              label: 'Bore x Stroke',
              values: ['75 mm x 70 mm', '2.95 x 2.76 in', '75 mm x 70 mm', '2.95 x 2.76 in']
            },
            {
              label: 'Rated output',
              values: ['33.1 kW / 45 PS', '44.3 hp', '33.1 kW / 45 PS', '44.3 hp']
            },
            {
              label: 'Starting',
              values: [
                'Electric starter & manual starter',
                'Electric starter & manual starter',
                'Electric starter & manual starter',
                'Electric starter & manual starter'
              ]
            },
            {
              label: 'Fuel tank capacity',
              values: ['14.5 L', '3.83 gal', '14.5 L', '3.83 gal']
            },
            {
              label: 'Fuel type',
              values: [
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
            {
              label: 'Type',
              values: [
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type',
                '4-Vane eccentric rotary type'
              ]
            },
            {
              label: 'Blade type',
              values: ['High strength carbon', 'High strength carbon', 'High strength carbon', 'High strength carbon']
            },
            {
              label: 'Maximum suction height',
              values: ['9 m', '29.5 ft', '9 m', '29.5 ft']
            }
          ]
        },
        {
          title: 'Features',
          rows: [
            { label: 'Shibaura Original 2 cycle Gasoline Engine', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { label: 'Shibaura Original Centrifugal Pump', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { label: 'Shibaura Original Vacuum Pump', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { label: 'Alert Monitoring System', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
            { label: 'Quick Discharge Valve', values: ['Yes', 'Yes', 'Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '1,595 L/min' },
      { label: 'Discharge performance (1.0MPa, 1 m suction head)', value: '1,020 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec' }
    ]
  },
  {
    slug: 'ff500ar-a',
    title: 'FF500AR-A',
    subtitle: 'Auto Relay for long-distance water delivery',
    description: 'Enables long-distance water delivery by automatically relaying flow between pumps without operator intervention. Electronic fuel injection ensures easy starting and efficient fuel consumption.',
    valueProp: 'Auto-relay pump for long-distance water delivery and efficient operations.',
    icon: shibauraLogoIcon,
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
        value: { en: '0.5 MPa @ 1,550 L/min\n1.0 MPa @ 980 L/min', fr: '0,5 MPa @ 1,550 L/min\n1,0 MPa @ 980 L/min' },
        icon: dischargeIcon
      },
      { key: 'primingTime', value: { en: '1 m : 2.2 sec', fr: '1 m : 2,2 s' }, icon: timerIcon },
      { key: 'maxPressure', value: { en: '1.0 MPa', fr: '1,0 MPa' }, icon: pressureIcon },
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
            { label: 'Dimensions LxWxH (mm)', values: ['681 x 639 x 774', '26.8 x 25.2 x 30.5 in'] },
            { label: 'Dry Weight', values: ['98 kg', '216 lb'] }
          ]
        },
        {
          title: 'Pump',
          rows: [
            { label: 'Model', values: ['SHIBAURA P556', 'SHIBAURA P556'] },
            { label: 'Type', values: ['High pressure, single stage centrifugal pump', 'High pressure, single stage centrifugal pump'] },
            { label: 'Discharge performance (0.5MPa, 1m suction head)', values: ['1,550 L/min', '409 gpm @ 72.5 psi, 3.3 ft'] },
            { label: 'Discharge performance (0.5MPa, 3m suction head)', values: ['1,320 L/min (0.7MPa)', '349 gpm @ 101.5 psi, 9.8 ft'] },
            { label: 'Discharge performance (1.0MPa, 1m suction head)', values: ['980 L/min', '259 gpm @ 145 psi, 3.3 ft'] },
            { label: 'Discharge performance (1.0MPa, 3m suction head)', values: ['960 L/min', '254 gpm @ 145 psi, 9.8 ft'] },
            { label: 'Priming performance at 1m suction head', values: ['2.2 Seconds', '2.2 Seconds (3.3 ft suction head)'] },
            { label: 'Discharge Diameter JIS', values: ['65 mm', '2.6 in'] },
            { label: 'Suction Diameter JIS', values: ['75 mm', '3.0 in'] }
          ]
        },
        {
          title: 'Engine',
          rows: [
            { label: 'Model', values: ['SHIBAURA EP556', 'SHIBAURA EP556'] },
            { label: 'Type', values: ['Water cooled 2-stroke gasoline engine', 'Water cooled 2-stroke gasoline engine'] },
            { label: 'Cooling system', values: ['Water cooled type', 'Water cooled type'] },
            { label: 'No of cylinder', values: ['2 cylinder', '2 cylinder'] },
            { label: 'Fuel system', values: ['Electronic control fuel injection', 'Electronic control fuel injection'] },
            { label: 'Displacement', values: ['635 cc', '38.8 cu in'] },
            { label: 'Bore x Stroke', values: ['76 mm x 70 mm', '2.99 x 2.76 in'] },
            { label: 'Rated output', values: ['32.0 kW / 43 PS', '42.4 hp'] },
            { label: 'Starting', values: ['Electric starter & manual starter', 'Electric starter & manual starter'] },
            { label: 'Fuel tank capacity', values: ['11.0 L', '2.91 gal'] },
            { label: 'Fuel consumption', values: ['17.0 L/h', '4.49 gal/h'] },
            { label: 'Fuel type', values: ['Regular unleaded gasoline', 'Regular unleaded gasoline'] }
          ]
        },
        {
          title: 'Vacuum Pump',
          rows: [
            { label: 'Type', values: ['4-Vane eccentric rotary type', '4-Vane eccentric rotary type'] },
            { label: 'Blade type', values: ['High strength carbon', 'High strength carbon'] },
            { label: 'Maximum suction height', values: ['9 m', '29.5 ft'] }
          ]
        },
        {
          title: 'Features',
          rows: [
            { label: 'Shibaura Original 2 cycle Gasoline Engine', values: ['Yes', 'Yes'] },
            { label: 'Shibaura Original Centrifugal Pump', values: ['Yes', 'Yes'] },
            { label: 'Shibaura Original Vacuum Pump', values: ['Yes', 'Yes'] },
            { label: 'Alert Monitoring System', values: ['Yes', 'Yes'] },
            { label: 'Quick Discharge Valve', values: ['Yes', 'Yes'] }
          ]
        }
      ]
    },
    performance: [
      { label: 'Discharge performance (0.5MPa, 1 m suction head)', value: '1,550 L/min' },
      { label: 'Discharge performance (1.0MPa, 1 m suction head)', value: '980 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec' }
    ]
  }
];

type FirepumpLocale = 'en' | 'fr';

const frReplacements: Array<[string, string]> = [
  ["Strong power with Shibaura's original air-cooled engine", 'Grande puissance grâce au moteur Shibaura refroidi à l’air'],
  ["Shibaura's largest air-cooled engine delivers strong power without influencing water quality.", 'Le plus puissant moteur Shibaura refroidi à l’air offre un rendement élevé sans altérer la qualité de l’eau.'],
  ['Big-bore air-cooled performance with fast starting and quick valve control for demanding field use.', 'Performance élevée du moteur refroidi à l’air, avec démarrage rapide et commande de vanne précise pour les interventions exigeantes.'],
  ['Compact and light weight', 'Compacte et légère'],
  ['A compact, lightweight pump delivering class-leading performance. The newly installed 5.3 L fuel tank supports extended operating time.', 'Pompe compacte et légère offrant un rendement de premier ordre. Le réservoir de 5,3 L permet une autonomie prolongée.'],
  ['Lightweight portable fire pump designed for fast setup and reliable output.', 'Pompe à incendie portative légère conçue pour une mise en œuvre rapide et un débit fiable.'],
  ['The smallest pump in its class, offering superior mobility', 'La plus compacte de sa catégorie'],
  ["Its compact, lightweight design with Shibaura's proprietary air-cooled engine allows for simple installation on small vehicles.", 'Son format léger et compact, associé au moteur Shibaura refroidi à l’air, permet une installation simplifiée sur des véhicules légers.'],
  ['Smallest-in-class pump for rapid deployment and easy vehicle mounting.', 'Pompe la plus compacte de sa catégorie, conçue pour un déploiement rapide et une installation facile sur véhicule.'],
  ['Highest discharge performance of our lineup', 'Débit de refoulement le plus élevé de la gamme'],
  ['Delivers the highest discharge performance. A large oil-less vacuum pump combined with a high-output engine enables faster priming and a greater volume of water discharge within its class.', 'Une pompe à vide sans huile de grande capacité, combinée à un moteur haute puissance, permet un amorçage accéléré et un volume de refoulement supérieur dans sa catégorie.'],
  ['High-output fire pump built for demanding operations and rapid priming.', 'Pompe incendie portative à haut débit conçue pour les interventions exigeantes et un amorçage rapide.'],
  ['Durable, well-balanced performance', 'Performance durable et équilibrée'],
  ["A well-balanced, durable pump featuring Shibaura's proprietary engine-cooling system. The fully water-cooled radiator ensures reliable operation and extended service life, even in dirty-water environments.", 'Pompe robuste et équilibrée dotée du système de refroidissement moteur Shibaura. Le radiateur entièrement refroidi à l’eau assure un fonctionnement fiable et une longue durée de service, même en eau chargée.'],
  ['Balanced, durable pump engineered for long service life in harsh conditions.', 'Pompe équilibrée et robuste, conçue pour une longue durée de service dans des conditions difficiles.'],
  ['Auto Relay for long-distance water delivery', 'Auto-relais pour l’acheminement d’eau sur longue distance'],
  ['Enables long-distance water delivery by automatically relaying flow between pumps without operator intervention. Electronic fuel injection ensures easy starting and efficient fuel consumption.', 'Permet l’acheminement d’eau sur de longues distances grâce au relais automatique du débit entre les pompes, sans intervention de l’opérateur. Le système d’injection de carburant assure un démarrage fiable et une consommation optimisée.'],
  ['Auto-relay pump for long-distance water delivery and efficient operations.', 'Pompe auto-relais conçue pour l’acheminement d’eau sur longue distance et l’efficacité opérationnelle.'],
  ['Air-cooled Shibaura engine', 'Moteur Shibaura refroidi à l’air'],
  ['Water-cooled Shibaura engine', 'Moteur Shibaura refroidi à l’eau'],
  ['Fuel Injection System', 'Système d’injection de carburant'],
  ['Quick Starting', 'Démarrage rapide'],
  ['Fast Valve Control', 'Commande rapide de la vanne'],
  ['Clean Operation', 'Fonctionnement propre'],
  ['High Discharge', 'Refoulement élevé'],
  ['Lightweight Build', 'Construction légère'],
  ['Consistent Output', 'Débit régulier'],
  ['Extended Runtime', 'Autonomie prolongée'],
  ['Fast Priming', 'Amorçage rapide'],
  ['Compact Footprint', 'Format compact'],
  ['Reliable Air Cooling', 'Refroidissement à l’air fiable'],
  ['Solid Discharge', 'Refoulement stable'],
  ['Highest Output', 'Débit maximal'],
  ['Water-Cooled Durability', 'Durabilité du refroidissement à l’eau'],
  ['Balanced Output', 'Débit équilibré'],
  ['Water-Cooled System', 'Système refroidi à l’eau'],
  ['Durable Build', 'Construction robuste'],
  ['Auto Relay', 'Auto-relais'],
  ['EFI Fuel System', 'Système EFI'],
  ['High Output', 'Haut débit'],
  ['Automatic choke starts the engine without warm-up.', 'Le starter automatique lance le moteur sans préchauffage.'],
  ['Quick valve lever enables rapid discharge control.', 'Le levier de vanne rapide permet un contrôle immédiat du refoulement.'],
  ['Oilless vacuum pump avoids oily discharge.', "La pompe à vide sans huile évite tout rejet huileux."],
  ['Delivers 1,450 L/min at 0.5 MPa for demanding operations.', 'Fournit 1 450 L/min à 0,5 MPa pour les interventions exigeantes.'],
  ['Compact chassis makes transport and setup easy.', 'Le châssis compact facilite le transport et la mise en œuvre.'],
  ['568 L/min at 0.5 MPa for steady flow.', '568 L/min à 0,5 MPa pour un débit régulier.'],
  ['Fuel tank supports longer operation windows.', 'Le réservoir permet une autonomie d’utilisation prolongée.'],
  ['2.2–3.5 sec priming at 1 m suction head.', 'Amorçage de 2,2 à 3,5 s à 1 m de hauteur d’aspiration.'],
  ['Smallest-in-class size for tight vehicle mounts.', 'Format le plus compact de sa catégorie, adapté aux montages sur véhicules exigus.'],
  ['Simplified cooling with easy maintenance access.', 'Refroidissement simplifié avec accès facile à la maintenance.'],
  ['560 L/min at 0.5 MPa for consistent output.', '560 L/min à 0,5 MPa pour un débit constant.'],
  ['3.6 sec priming at 1 m suction head.', 'Amorçage en 3,6 s à 1 m de hauteur d’aspiration.'],
  ['1,650 L/min at 0.5 MPa for peak performance.', '1 650 L/min à 0,5 MPa pour des performances maximales.'],
  ['2.1 sec priming at 1 m suction head.', 'Amorçage en 2,1 s à 1 m de hauteur d’aspiration.'],
  ['Stable operation during longer duty cycles.', 'Fonctionnement stable lors des cycles prolongés.'],
  ['1.0 MPa performance for challenging scenarios.', 'Performance à 1,0 MPa pour les situations exigeantes.'],
  ['1,595 L/min at 0.5 MPa for steady flow.', '1 595 L/min à 0,5 MPa pour un débit régulier.'],
  ['Reliable cooling in dirty-water environments.', 'Refroidissement fiable en environnement d’eau chargée.'],
  ['2.2 sec priming at 1 m suction head.', 'Amorçage en 2,2 s à 1 m de hauteur d’aspiration.'],
  ['Designed for extended service life.', 'Conçue pour une longue durée de vie.'],
  ['Automated relay supports long-distance water delivery.', 'Le relais automatique assure l’acheminement d’eau sur longue distance.'],
  ['Electronic injection for easier starting and efficiency.', 'Le système d’injection de carburant facilite le démarrage et améliore l’efficacité.'],
  ['1,550 L/min at 0.5 MPa for sustained flow.', '1 550 L/min à 0,5 MPa pour un débit soutenu.'],
  ['High-Performance', 'Haute performance'],
  ['Portable Fire Pumps', 'Pompes incendie portatives'],
  ['Air-cooled', 'Refroidi à l’air'],
  ['Water-cooled', 'Refroidi à l’eau'],
  ['air-cooled', 'refroidi à l’air'],
  ['water-cooled', 'refroidi à l’eau'],
  ['Cooling system', 'Système de refroidissement'],
  ['Discharge performance', 'Débit'],
  ['Priming performance', 'Temps d’amorçage'],
  ['Max pressure', 'Pression maximale'],
  ['Engine type', 'Type de moteur'],
  ['Pump model', 'Modèle de pompe'],
  ['Water cooled 2-stroke gasoline engine', 'Moteur essence 2 temps refroidi par eau'],
  ['Air cooled 2-stroke gasoline engine', 'Moteur essence 2 temps refroidi par air'],
  ['Water cooled Moteur 2 temps à essence', 'Moteur essence 2 temps refroidi par eau'],
  ['Air cooled Moteur 2 temps à essence', 'Moteur essence 2 temps refroidi par air'],
  ['2-stroke gasoline engine', 'Moteur 2 temps à essence'],
  ['2-Stroke gasoline engine', 'Moteur 2 temps à essence'],
  ['Carburetor with automatic choke', 'Carburateur avec système de démarrage automatique'],
  ['automatic choke', 'starter automatique'],
  ['High pressure, single stage centrifugal pump', 'Pompe centrifuge haute pression mono-étagée'],
  ['single stage centrifugal pump', 'pompe centrifuge à un étage'],
  ['Yes', 'Oui'],
  ['Seconds', 'secondes'],
  ['Regular unleaded gasoline', 'Essence sans plomb ordinaire'],
  ['Electric starter & manual starter', 'Démarreur électrique et manuel'],
  ['Auto choke carburetor', 'Carburateur à starter automatique'],
  ['Electronic control fuel injection', 'Injection électronique de carburant'],
  ['type refroidi à l’air', 'Refroidissement par air'],
  ['type refroidi à l’eau', 'Refroidissement par eau'],
  ['Air cooled type', 'Refroidissement par air'],
  ['Water cooled type', 'Refroidissement par eau'],
  ['1 m suction head:', '1 m :'],
  ['3 m suction head:', '3 m :'],
  ['1m suction head:', '1 m :'],
  ['3m suction head:', '3 m :'],
  ['1m SH:', '1 m :'],
  ['3m SH:', '3 m :'],
  ['4-Vane eccentric rotary type', 'Pompe rotative excentrique à 4 palettes'],
  ['High strength carbon', 'Carbone haute résistance'],
  ['0.5MPa', '0,5 MPa'],
  ['0.7MPa', '0,7 MPa'],
  ['0.8MPa', '0,8 MPa'],
  ['1.0MPa', '1,0 MPa'],
  ['1m suction head', 'hauteur d’aspiration 1 m'],
  ['3m suction head', 'hauteur d’aspiration 3 m'],
  [' x ', ' × '],
  ['Démarrage', 'Système de démarrage'],
  ['2 cylinder', '2 cylindres'],
  ['1 cylinder', '1 cylindre'],
  ['Strong power', 'Grande puissance'],
  ['Discharge performance: 0.5MPa: 1,450L/min, 1.0MPa: 830L/min', 'Débit de refoulement : 0,5 MPa : 1 450 L/min | 1,0 MPa : 830 L/min'],
  ['Priming performance, 1 m suction head: 3.5sec', 'Temps d’amorçage (hauteur d’aspiration de 1 m) : 3,5 s'],
  ['Discharge performance:\nFT300-A 0.5MPa: 568L/min, 0.8MPa: 318L/min\nFT400-A1 0.5MPa: 568L/min, 0.8MPa: 330L/min', 'Débit de refoulement :\nFT300-A – 0,5 MPa : 568 L/min | 0,8 MPa : 318 L/min\nFT400-A1 – 0,5 MPa : 568 L/min | 0,8 MPa : 330 L/min'],
  ['Priming performance, 1 m suction head:\nFT300-A 2.2sec\nFT400-A1 3.5sec', 'Temps d’amorçage (hauteur d’aspiration de 1 m) :\nFT300-A – 2,2 s\nFT400-A1 – 3,5 s'],
  ['Discharge performance: 0.5MPa: 560L/min, 1.0MPa: 280L/min', 'Débit de refoulement : 0,5 MPa : 560 L/min | 1,0 MPa : 280 L/min'],
  ['Priming performance, 1 m suction head: 3.6sec', 'Temps d’amorçage (hauteur d’aspiration de 1 m) : 3,6 s'],
  ['Discharge performance: 0.5MPa: 1,650L/min, 1.0MPa: 1,100L/min', 'Débit de refoulement : 0,5 MPa : 1 650 L/min | 1,0 MPa : 1 100 L/min'],
  ['Priming performance, 1 m suction head: 2.1sec', 'Temps d’amorçage (hauteur d’aspiration de 1 m) : 2,1 s'],
  ['Discharge performance: 0.5MPa: 1,595L/min, 1.0MPa: 1,020L/min', 'Débit de refoulement : 0,5 MPa : 1 595 L/min | 1,0 MPa : 1 020 L/min'],
  ['Priming performance, 1 m suction head: 2.2sec', 'Temps d’amorçage (hauteur d’aspiration de 1 m) : 2,2 s'],
  ['Discharge performance: 0.5MPa: 1,550L/min, 1.0MPa: 980L/min', 'Débit de refoulement : 0,5 MPa : 1 550 L/min | 1,0 MPa : 980 L/min'],
];

const replaceAllFr = (input: string): string =>
  frReplacements.reduce((text, [source, target]) => text.split(source).join(target), input);

const localizeString = (value: string, locale: FirepumpLocale): string => {
  if (locale !== 'fr') return value;
  return replaceAllFr(value)
    .replace(/\b(\d+)\.(\d+)\b/g, '$1,$2')
    .replace(/(\d(?:,\d+)?)\s*sec\b/g, '$1 s')
    .replace(/(\d(?:,\d+)?)\s*in\b/g, '$1 po')
    .replace(/(\d(?:,\d+)?)\s*ft\b/g, '$1 pi');
};

const localizeHeroFeatureValue = (value: string | LocalizedValue, locale: FirepumpLocale): string =>
  typeof value === 'string' ? localizeString(value, locale) : value[locale];

const localizePump = (pump: Firepump, locale: FirepumpLocale): Firepump => {
  return {
    ...pump,
    subtitle: localizeString(pump.subtitle, locale),
    description: localizeString(pump.description, locale),
    valueProp: localizeString(pump.valueProp, locale),
    features: pump.features.map((feature) => ({
      ...feature,
      label: localizeString(feature.label, locale),
    })),
    keySpecs: pump.keySpecs.map((spec) => ({
      ...spec,
      label: getHeroFeatureLabel(spec.key, locale),
      value: localizeHeroFeatureValue(spec.value, locale),
    })),
    benefits: pump.benefits.map((benefit) => ({
      title: localizeString(benefit.title, locale),
      description: localizeString(benefit.description, locale),
    })),
    specsTable: {
      columns: pump.specsTable.columns.map((column) => localizeSpecLabel(column, locale)),
      groups: pump.specsTable.groups.map((group) => ({
        title: localizeSpecGroupTitle(group.title, locale),
        rows: group.rows.map((row) => ({
          label: localizeSpecLabel(row.label, locale),
          values: row.values.map((value) => localizeString(value, locale)),
        })),
      })),
    },
    performance: pump.performance.map((item) => ({
      label: localizeSpecLabel(item.label, locale),
      value: localizeString(item.value, locale),
    })),
  };
};

export const getFirepumps = (locale: FirepumpLocale = 'en'): Firepump[] =>
  firepumps.map((pump) => localizePump(pump, locale));
