import * as Label from '@radix-ui/react-label';
import { User, Building2, Briefcase, Calendar, Package, Flame, Droplets, Wrench, MapPin, Users, FileText } from 'lucide-react';

interface RFQFormProps {
  action?: string;
}

export default function RFQForm({ action = '/contact-us/thanks' }: RFQFormProps) {
  return (
    <form
      className="space-y-6"
      id="rfq-form"
      name="pump-inquiry"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action={action}
    >
      <input type="hidden" name="form-name" value="pump-inquiry" />
      <input type="hidden" name="bot-field" />
      {/* Contact Information */}
      <div>
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Contact Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label.Root
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name <span className="text-red-500">*</span>
            </Label.Root>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name <span className="text-red-500">*</span>
            </Label.Root>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </Label.Root>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </Label.Root>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Organization Information */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center mr-3">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Organization Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label.Root
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Organization Name <span className="text-red-500">*</span>
            </Label.Root>
            <input
              type="text"
              id="organization"
              name="organization"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="industry"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Industry <span className="text-red-500">*</span>
            </Label.Root>
            <select
              id="industry"
              name="industry"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            >
              <option value="">Select an industry</option>
              <option value="municipal">Municipal Fire Services</option>
              <option value="government">Government Agencies</option>
              <option value="wildland">Wildland Firefighting</option>
              <option value="industrial">Industrial & Plant Safety</option>
              <option value="utilities">Utilities & Infrastructure</option>
              <option value="forestry">Forestry & Remote Operations</option>
              <option value="contractor">Firefighting Contractors</option>
              <option value="emergency">Emergency Management</option>
              <option value="dealer">Dealer / Reseller</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Service Requirements */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-600 to-emerald-600 flex items-center justify-center mr-3">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
              Pump Inquiry
            </h2>
        </div>
        <div className="space-y-6">
          <div>
            <Label.Root className="block text-sm font-medium text-gray-700 mb-3">
              What do you need?
            </Label.Root>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'pump-selection', label: 'Pump recommendation', icon: Flame },
                { id: 'accessories', label: 'Accessories & fittings', icon: Droplets },
                { id: 'deployment', label: 'Deployment advice', icon: MapPin },
                { id: 'service-parts', label: 'Parts & service support', icon: Wrench },
                { id: 'training', label: 'Operator training', icon: Users },
                { id: 'request-quote', label: 'Request a quote', icon: FileText },
              ].map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
                  >
                    <input
                      id={service.id}
                      type="checkbox"
                      name="services"
                      value={service.id}
                      className="w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 shrink-0"
                    />
                    <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
                      <IconComponent className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <Label.Root
                      htmlFor={service.id}
                      className="text-sm font-medium text-gray-700 cursor-pointer flex-1 group-hover:text-gray-900 transition-colors"
                    >
                      {service.label}
                    </Label.Root>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-sm font-medium text-gray-700">
            If requesting a quote:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label.Root
                htmlFor="timeline"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Purchase Timeline
              </Label.Root>
              <div className="relative">
                <select
                  id="timeline"
                  name="timeline"
                  className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
                >
                  <option value="">Select timeline</option>
                  <option value="1-4-months">1-4 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-plus-months">6+ months</option>
                  <option value="planning">Planning / Budgeting</option>
                  <option value="other">Other</option>
                </select>
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <Label.Root
                htmlFor="volume"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <Package className="w-4 h-4 mr-2 text-gray-500" />
                Estimated Quantity
              </Label.Root>
              <div className="relative">
                <input
                  type="text"
                  id="volume"
                  name="volume"
                  placeholder="e.g., 1-5 units"
                  className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <Label.Root
              htmlFor="details"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Inquiry Details <span className="text-red-500">*</span>
            </Label.Root>
            <textarea
              id="details"
              name="details"
              rows={6}
              required
              placeholder="Please include your inquiry and any details about your use case, site conditions, water source, and any preferred models or accessories."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2"
          style={{ backgroundImage: 'linear-gradient(90deg, #2563eb, #0d9488)' }}
        >
          <span>Submit Request</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
