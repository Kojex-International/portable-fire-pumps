import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

interface Capability {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: { label: string; icon: string }[];
}

interface Props {
  capabilities: Capability[];
}

export default function FirepumpAccordion({ capabilities }: Props) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-4">
      {capabilities.map((capability, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-[3.125rem] h-[3.125rem] rounded-lg brand-gradient-bg text-white shadow-md shrink-0">
                  <img src={capability.icon} alt="" className="w-9 h-9" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {capability.title}
                  </h3>
                  <h4 className="text-sm font-semibold text-gray-700 mt-1">
                    {capability.subtitle}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {capability.description}
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-6 py-5 border-t border-gray-200 bg-gray-50">
            <ul className="space-y-3">
              {capability.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <div className="flex items-center justify-center shrink-0 w-5 h-5">
                    <img
                      src={feature.icon}
                      alt=""
                      className="block object-contain w-5 h-5"
                      aria-hidden="true"
                    />
                  </div>
                  <span className={`text-gray-700 whitespace-pre-line ${idx === 0 ? 'font-semibold' : ''}`}>
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
