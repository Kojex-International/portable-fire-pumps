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

export interface FirepumpFeature {
  label: string;
  icon: string;
}

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
  keySpecs: { label: string; value: string; icon: string }[];
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
    manualPdf: ft450500ManualPdf,
    features: [
      { label: 'Automatic choke system for quick starting', icon: carburatorIcon },
      { label: 'Separate fuel feeding system for optimum mixing', icon: engineIcon },
      { label: "Shibaura's unique water shut-off valve", icon: dischargeIcon },
      { label: 'Quick valve lever for fast operation', icon: dischargeIcon },
      { label: 'Oilless vacuum pump with carbon blades', icon: timerIcon },
      { label: 'Auto coolant circulation system (NICE valve)', icon: dischargeIcon }
    ],
    keySpecs: [
      { label: 'Pump model', value: 'Shibaura B612B', icon: modelIcon },
      { label: 'Cooling system', value: 'Air-cooled', icon: aircooledIcon },
      { label: 'Discharge performance', value: '0.5 MPa @ 1,450 L/min\n1.0 MPa @ 830 L/min', icon: dischargeIcon },
      { label: 'Priming performance', value: '1 m suction head: 3.5 sec', icon: timerIcon },
      { label: 'Max pressure', value: '1.0 MPa', icon: pressureIcon },
      { label: 'Engine type', value: '2-stroke gasoline engine', icon: engineIcon }
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
    title: 'FT300/400-A',
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
      { label: 'Pump model', value: 'Shibaura C505', icon: modelIcon },
      { label: 'Cooling system', value: 'Air-cooled', icon: aircooledIcon },
      { label: 'Discharge performance', value: '0.5 MPa @ 568 L/min\n0.8 MPa @ 318/330 L/min', icon: dischargeIcon },
      { label: 'Priming performance', value: '1m SH: 2.2 sec (FT300-A)\n1m SH: 3.5 sec (FT400-A1)', icon: timerIcon },
      { label: 'Max pressure', value: '0.8 MPa', icon: pressureIcon },
      { label: 'Engine type', value: '2-stroke gasoline engine', icon: engineIcon }
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
      { label: 'Pump model', value: 'Shibaura C505', icon: modelIcon },
      { label: 'Cooling system', value: 'Air-cooled', icon: aircooledIcon },
      { label: 'Discharge performance', value: '0.5 MPa @ 560 L/min\n1.0 MPa @ 280 L/min', icon: dischargeIcon },
      { label: 'Priming performance', value: '1 m suction head: 3.6 sec', icon: timerIcon },
      { label: 'Max pressure', value: '1.0 MPa', icon: pressureIcon },
      { label: 'Engine type', value: '2-stroke gasoline engine', icon: engineIcon }
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
      { label: 'Pump model', value: 'Shibaura P572', icon: modelIcon },
      { label: 'Cooling system', value: 'Water-cooled', icon: watercooledIcon },
      { label: 'Discharge performance', value: '0.5 MPa @ 1,650 L/min\n1.0 MPa @ 1,100 L/min', icon: dischargeIcon },
      { label: 'Priming performance', value: '1 m suction head: 2.1 sec', icon: timerIcon },
      { label: 'Max pressure', value: '1.0 MPa', icon: pressureIcon },
      { label: 'Engine type', value: '2-stroke gasoline engine', icon: engineIcon }
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
      { label: 'Pump model', value: 'Shibaura B716', icon: modelIcon },
      { label: 'Cooling system', value: 'Water-cooled', icon: watercooledIcon },
      { label: 'Discharge performance', value: '0.5 MPa @ 1,595 L/min\n1.0 MPa @ 1,020 L/min', icon: dischargeIcon },
      { label: 'Priming performance', value: '1 m suction head: 2.2 sec', icon: timerIcon },
      { label: 'Max pressure', value: '1.0 MPa', icon: pressureIcon },
      { label: 'Engine type', value: '2-stroke gasoline engine', icon: engineIcon }
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
      { label: 'Pump model', value: 'Shibaura P556', icon: modelIcon },
      { label: 'Cooling system', value: 'Water-cooled', icon: watercooledIcon },
      { label: 'Discharge performance', value: '0.5 MPa @ 1,550 L/min\n1.0 MPa @ 980 L/min', icon: dischargeIcon },
      { label: 'Priming performance', value: '1 m suction head: 2.2 sec', icon: timerIcon },
      { label: 'Max pressure', value: '1.0 MPa', icon: pressureIcon },
      { label: 'Engine type', value: '2-stroke gasoline engine', icon: engineIcon }
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
