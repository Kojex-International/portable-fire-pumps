import type { ImageMetadata } from 'astro';

import ft510Img from '@assets/ft510.jpg';
import ft400Img from '@assets/ft400.jpg';
import tf516mhImg from '@assets/tf516mh.jpg';
import p572sImg from '@assets/p572s.jpg';
import fk500Img from '@assets/fk500.jpg';
import ff500arImg from '@assets/ff500ar.jpg';

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
  features: FirepumpFeature[];
  keySpecs: { label: string; value: string; icon: string }[];
  benefits: { title: string; description: string }[];
  specs: { label: string; value: string }[];
  performance: { label: string; value: string }[];
}

const shibauraLogoIcon = shibauraLogoMark;

export const firepumps: Firepump[] = [
  {
    slug: 'p510-a',
    title: 'P510-A',
    subtitle: "Powerful performance with Shibaura's air-cooled engine",
    description: 'Delivers powerful performance, providing reliable output without affecting water quality.',
    valueProp: 'Compact, high-performance portable fire pump for rapid deployment in remote environments.',
    icon: shibauraLogoIcon,
    image: ft510Img,
    features: [
      { label: 'Air-cooled Shibaura engine', icon: aircooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 1,450L/min, 1.0MPa: 830L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1m suction head: 3.5sec', icon: timerIcon }
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
      { title: 'Rapid Deployment', description: 'Compact frame and strong output for quick response in the field.' },
      { title: 'Air-Cooled Reliability', description: 'Simplified cooling for dependable operation in rugged conditions.' },
      { title: 'Clean Output', description: 'Engine design preserves water quality during extended use.' },
      { title: 'High Discharge', description: 'Delivers 1,450 L/min at 0.5 MPa for demanding operations.' }
    ],
    specs: [
      { label: 'Pump model', value: 'Shibaura B612B' },
      { label: 'Max discharge', value: '1,450 L/min (0.5 MPa, 1 m suction head)' },
      { label: 'Max pressure', value: '1.0 MPa' },
      { label: 'Suction height (test condition)', value: '1 m' },
      { label: 'Dimensions (LxWxH)', value: '737 x 572 x 765 mm' },
      { label: 'Weight (dry)', value: '90 kg' },
      { label: 'Engine model', value: 'Shibaura E440C' },
      { label: 'Engine type', value: '2-stroke gasoline engine' },
      { label: 'Cooling system', value: 'Air-cooled' },
      { label: 'Discharge diameter', value: 'JIS 65 mm' },
      { label: 'Suction diameter', value: 'JIS 75 mm' },
      { label: 'Discharge (0.5 MPa, 3 m suction head)', value: '1,436 L/min' },
      { label: 'Discharge (1.0 MPa, 3 m suction head)', value: '790 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '3.5 sec' },
      { label: 'Pump type', value: 'High pressure, single stage centrifugal pump' },
      { label: 'Cylinders', value: '2' },
      { label: 'Fuel system', value: 'Auto choke carburetor' },
      { label: 'Displacement', value: '436 cc' },
      { label: 'Bore x stroke', value: '68 mm x 60 mm' },
      { label: 'Rated output', value: '22.8 kW / 31 PS' },
      { label: 'Starting', value: 'Electric starter & manual starter' },
      { label: 'Fuel tank capacity', value: '14.5 L' },
      { label: 'Fuel consumption', value: '14 L/h' },
      { label: 'Fuel type', value: 'Regular unleaded gasoline' },
      { label: 'Vacuum pump type', value: '4-vane eccentric rotary type' },
      { label: 'Blade type', value: 'High strength carbon' }
    ],
    performance: [
      { label: 'Discharge performance (0.5MPa, 1m suction head)', value: '1,450 L/min' },
      { label: 'Discharge performance (1.0MPa, 1m suction head)', value: '830 L/min' },
      { label: 'Priming performance (1m suction head)', value: '3.5 sec' }
    ]
  },
  {
    slug: 'ft300-a-ft400-a1',
    title: 'FT300-A / FT400-A1',
    subtitle: 'Compact and light weight',
    description: 'A compact, lightweight pump delivering class-leading performance. The newly installed 5.3 L fuel tank supports extended operating time.',
    valueProp: 'Lightweight portable fire pump designed for fast setup and reliable output.',
    icon: shibauraLogoIcon,
    image: ft400Img,
    features: [
      { label: 'Air-cooled Shibaura engine', icon: aircooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance:\nFT300-A 0.5MPa: 568L/min, 0.8MPa: 318L/min\nFT400-A1 0.5MPa: 568L/min, 0.8MPa: 330L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1m suction head:\nFT300-A 2.2sec\nFT400-A1 3.5sec', icon: timerIcon }
    ],
    keySpecs: [
      { label: 'Pump model', value: 'Shibaura C505', icon: modelIcon },
      { label: 'Cooling system', value: 'Air-cooled', icon: aircooledIcon },
      { label: 'Discharge performance', value: '0.5 MPa @ 568 L/min\n0.8 MPa @ 318/330 L/min', icon: dischargeIcon },
      { label: 'Priming performance', value: '1 m suction head: 2.2 sec (FT300-A), 3.5 sec (FT400-A1)', icon: timerIcon },
      { label: 'Max pressure', value: '0.8 MPa', icon: pressureIcon },
      { label: 'Engine type', value: '2-stroke gasoline engine', icon: engineIcon }
    ],
    benefits: [
      { title: 'Lightweight Build', description: 'Compact chassis makes transport and setup easy.' },
      { title: 'Consistent Output', description: '568 L/min at 0.5 MPa for steady flow.' },
      { title: 'Extended Runtime', description: 'Fuel tank supports longer operation windows.' },
      { title: 'Fast Priming', description: '2.2–3.5 sec priming at 1 m suction head.' }
    ],
    specs: [
      { label: 'Pump model', value: 'Shibaura C505' },
      { label: 'Max discharge', value: '568 L/min (0.5 MPa, 1 m suction head)' },
      { label: 'Max pressure', value: '0.8 MPa' },
      { label: 'Suction height (test condition)', value: '1 m' },
      { label: 'Dimensions (LxWxH)', value: '601 x 463 x 559 mm' },
      { label: 'Weight (dry)', value: '48 kg' },
      { label: 'Engine model', value: 'Shibaura E200' },
      { label: 'Engine type', value: '2-stroke gasoline engine' },
      { label: 'Cooling system', value: 'Air-cooled' },
      { label: 'Discharge diameter', value: 'JIS 65 mm' },
      { label: 'Suction diameter', value: 'JIS 65 mm' },
      { label: 'Discharge (0.5 MPa, 3 m suction head)', value: '550 L/min (FT300-A), 556 L/min (FT400-A1)' },
      { label: 'Discharge (1.0 MPa, 3 m suction head)', value: '300 L/min (FT300-A), 309 L/min (FT400-A1)' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec (FT300-A), 3.5 sec (FT400-A1)' },
      { label: 'Pump type', value: 'High pressure, single stage centrifugal pump' },
      { label: 'Cylinders', value: '1' },
      { label: 'Fuel system', value: 'Auto choke carburetor' },
      { label: 'Displacement', value: '200 cc' },
      { label: 'Bore x stroke', value: '68 mm x 55 mm' },
      { label: 'Rated output', value: '8.8 kW / 12 PS' },
      { label: 'Starting', value: 'Electric starter & manual starter' },
      { label: 'Fuel tank capacity', value: '6.3 L' },
      { label: 'Fuel consumption', value: '5.4 L/h' },
      { label: 'Fuel type', value: 'Regular unleaded gasoline' },
      { label: 'Vacuum pump type', value: '4-vane eccentric rotary type' },
      { label: 'Blade type', value: 'High strength carbon' }
    ],
    performance: [
      { label: 'Discharge performance (0.5MPa, 1m suction head)', value: '568 L/min' },
      { label: 'Discharge performance (0.8MPa, 1m suction head)', value: '318 L/min (FT300-A), 330 L/min (FT400-A1)' },
      { label: 'Priming performance (1m suction head)', value: '2.2 sec (FT300-A), 3.5 sec (FT400-A1)' }
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
    features: [
      { label: 'Air-cooled Shibaura engine', icon: aircooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 560L/min, 1.0MPa: 280L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1m suction head: 3.6sec', icon: timerIcon }
    ],
    keySpecs: [
      { label: 'Pump model', value: 'Not specified', icon: modelIcon },
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
    specs: [
      { label: 'Pump model', value: 'SHIBAURA C505' },
      { label: 'Max discharge', value: '560 L/min (0.5 MPa, 1 m suction head)' },
      { label: 'Max pressure', value: '1.0 MPa' },
      { label: 'Suction height (test condition)', value: '1 m' },
      { label: 'Dimensions (LxWxH)', value: '555 x 466 x 520 mm' },
      { label: 'Weight (dry)', value: '41 kg' },
      { label: 'Engine model', value: 'Shibaura E180A' },
      { label: 'Engine type', value: '2-stroke gasoline engine' },
      { label: 'Cooling system', value: 'Air-cooled' },
      { label: 'Discharge diameter', value: 'JIS 65 mm' },
      { label: 'Suction diameter', value: 'JIS 75 mm' },
      { label: 'Discharge (0.5 MPa, 3 m suction head)', value: '533 L/min' },
      { label: 'Discharge (1.0 MPa, 3 m suction head)', value: '257 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '3.6 sec' },
      { label: 'Pump type', value: 'High pressure, single stage centrifugal pump' },
      { label: 'Cylinders', value: '1' },
      { label: 'Fuel system', value: 'Auto choke carburetor' },
      { label: 'Displacement', value: '182 cc' },
      { label: 'Bore x stroke', value: '65 mm x 55 mm' },
      { label: 'Rated output', value: '8.1 kW / 11 PS' },
      { label: 'Starting', value: 'Electric starter & manual starter' },
      { label: 'Fuel tank capacity', value: '4.2 L' },
      { label: 'Fuel consumption', value: '4.6 L/h' },
      { label: 'Fuel type', value: 'Regular unleaded gasoline' },
      { label: 'Vacuum pump type', value: '4-vane eccentric rotary type' },
      { label: 'Blade type', value: 'High strength carbon' }
    ],
    performance: [
      { label: 'Discharge performance (0.5MPa, 1m suction head)', value: '560 L/min' },
      { label: 'Discharge performance (0.8MPa, 1m suction head)', value: '280 L/min' },
      { label: 'Priming performance (1m suction head)', value: '3.6 sec' }
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
    features: [
      { label: 'Water-cooled Shibaura engine', icon: watercooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 1,650L/min, 1.0MPa: 1,100L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1m suction head: 2.1sec', icon: timerIcon }
    ],
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
    specs: [
      { label: 'Pump model', value: 'Shibaura P572' },
      { label: 'Max discharge', value: '1,650 L/min (0.5 MPa, 1 m suction head)' },
      { label: 'Max pressure', value: '1.0 MPa' },
      { label: 'Suction height (test condition)', value: '1 m' },
      { label: 'Dimensions (LxWxH)', value: '657 x 584 x 720 mm' },
      { label: 'Weight (dry)', value: '94 kg' },
      { label: 'Engine model', value: 'Shibaura EPS72' },
      { label: 'Engine type', value: '2-stroke gasoline engine' },
      { label: 'Cooling system', value: 'Water-cooled' },
      { label: 'Discharge diameter', value: 'JIS 65 mm' },
      { label: 'Suction diameter', value: 'JIS 75 mm' },
      { label: 'Discharge (0.5 MPa, 3 m suction head)', value: '1,530 L/min (0.7 MPa)' },
      { label: 'Discharge (1.0 MPa, 3 m suction head)', value: '1,070 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.1 sec' },
      { label: 'Pump type', value: 'Single stage, high pressure turbine pump' },
      { label: 'Cylinders', value: '2' },
      { label: 'Fuel system', value: 'Auto choke carburetor' },
      { label: 'Displacement', value: '723 cc' },
      { label: 'Bore x stroke', value: '80 mm x 72 mm' },
      { label: 'Rated output', value: '34.3 kW / 46 PS' },
      { label: 'Starting', value: 'Electric starter & manual starter' },
      { label: 'Fuel tank capacity', value: '12.0 L' },
      { label: 'Fuel consumption', value: '17.5 L/h' },
      { label: 'Fuel type', value: 'Regular unleaded gasoline' },
      { label: 'Vacuum pump type', value: '4-vane eccentric rotary type' },
      { label: 'Blade type', value: 'High strength carbon' }
    ],
    performance: [
      { label: 'Discharge performance (0.5MPa, 1m suction head)', value: '1,650 L/min' },
      { label: 'Discharge performance (1.0MPa, 1m suction head)', value: '1,100 L/min' },
      { label: 'Priming performance (1m suction head)', value: '2.1 sec' }
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
    features: [
      { label: 'Water-cooled Shibaura engine', icon: watercooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Carburetor with automatic choke', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 1,595L/min, 1.0MPa: 1,020L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1m suction head: 2.2sec', icon: timerIcon }
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
    specs: [
      { label: 'Pump model', value: 'Shibaura B716' },
      { label: 'Max discharge', value: '1,595 L/min (0.5 MPa, 1 m suction head)' },
      { label: 'Max pressure', value: '1.0 MPa' },
      { label: 'Suction height (test condition)', value: '1 m' },
      { label: 'Dimensions (LxWxH)', value: '701 x 652 x 709 mm' },
      { label: 'Weight (dry)', value: '85 kg' },
      { label: 'Engine model', value: 'Shibaura L618Z' },
      { label: 'Engine type', value: '2-stroke gasoline engine' },
      { label: 'Cooling system', value: 'Water-cooled' },
      { label: 'Discharge diameter', value: 'JIS 65 mm' },
      { label: 'Suction diameter', value: 'JIS 75 mm' },
      { label: 'Discharge (0.5 MPa, 3 m suction head)', value: '1,580 L/min' },
      { label: 'Discharge (1.0 MPa, 3 m suction head)', value: '975 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec' },
      { label: 'Pump type', value: 'Single stage, high pressure turbine pump' },
      { label: 'Cylinders', value: '2' },
      { label: 'Fuel system', value: 'Auto choke carburetor' },
      { label: 'Displacement', value: '618 cc' },
      { label: 'Bore x stroke', value: '75 mm x 70 mm' },
      { label: 'Rated output', value: '33.1 kW / 45 PS' },
      { label: 'Starting', value: 'Electric starter & manual starter' },
      { label: 'Fuel tank capacity', value: '14.5 L' },
      { label: 'Fuel consumption', value: '14.0 L/h' },
      { label: 'Fuel type', value: 'Regular unleaded gasoline' },
      { label: 'Vacuum pump type', value: '4-vane eccentric rotary type' },
      { label: 'Blade type', value: 'High strength carbon' }
    ],
    performance: [
      { label: 'Discharge performance (0.5MPa, 1m suction head)', value: '1,595 L/min' },
      { label: 'Discharge performance (1.0MPa, 1m suction head)', value: '1,020 L/min' },
      { label: 'Priming performance (1m suction head)', value: '2.2 sec' }
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
    features: [
      { label: 'Water-cooled Shibaura engine', icon: watercooledIcon },
      { label: '2-Stroke gasoline engine', icon: engineIcon },
      { label: 'Fuel Injection System', icon: carburatorIcon },
      { label: 'Discharge performance: 0.5MPa: 1,550L/min, 1.0MPa: 980L/min', icon: dischargeIcon },
      { label: 'Priming performance, 1m suction head: 2.2sec', icon: timerIcon }
    ],
    keySpecs: [
      { label: 'Pump model', value: 'Shibaura PS556', icon: modelIcon },
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
    specs: [
      { label: 'Pump model', value: 'Shibaura PS556' },
      { label: 'Max discharge', value: '1,550 L/min (0.5 MPa, 1 m suction head)' },
      { label: 'Max pressure', value: '1.0 MPa' },
      { label: 'Suction height (test condition)', value: '1 m' },
      { label: 'Dimensions (LxWxH)', value: '681 x 639 x 774 mm' },
      { label: 'Weight (dry)', value: '98 kg' },
      { label: 'Engine model', value: 'Shibaura EPS56' },
      { label: 'Engine type', value: '2-stroke gasoline engine' },
      { label: 'Cooling system', value: 'Water-cooled' },
      { label: 'Discharge diameter', value: 'JIS 65 mm' },
      { label: 'Suction diameter', value: 'JIS 75 mm' },
      { label: 'Discharge (0.5 MPa, 3 m suction head)', value: '1,320 L/min (0.7 MPa)' },
      { label: 'Discharge (1.0 MPa, 3 m suction head)', value: '960 L/min' },
      { label: 'Priming performance (1 m suction head)', value: '2.2 sec' },
      { label: 'Pump type', value: 'Single stage, high pressure turbine pump' },
      { label: 'Cylinders', value: '2' },
      { label: 'Fuel system', value: 'Electronic fuel injection' },
      { label: 'Displacement', value: '635 cc' },
      { label: 'Bore x stroke', value: '76 mm x 70 mm' },
      { label: 'Rated output', value: '32.0 kW / 43 PS' },
      { label: 'Starting', value: 'Electric starter & manual starter' },
      { label: 'Fuel tank capacity', value: '11.0 L' },
      { label: 'Fuel consumption', value: '16 L/h' },
      { label: 'Fuel type', value: 'Regular unleaded gasoline' },
      { label: 'Vacuum pump type', value: '4-vane eccentric rotary type' },
      { label: 'Blade type', value: 'High strength carbon' }
    ],
    performance: [
      { label: 'Discharge performance (0.5MPa, 1m suction head)', value: '1,550 L/min' },
      { label: 'Discharge performance (1.0MPa, 1m suction head)', value: '980 L/min' },
      { label: 'Priming performance (1m suction head)', value: '2.2 sec' }
    ]
  }
];
