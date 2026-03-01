import * as Label from '@radix-ui/react-label';
import { User, Building2, Briefcase, Calendar, Package, Flame, Droplets, Wrench, MapPin, Users, FileText } from 'lucide-react';
import { useState } from 'react';

interface RFQFormProps {
  action?: string;
  locale?: 'en' | 'fr';
}

export default function RFQForm({ action = '/contact-us/thanks', locale = 'en' }: RFQFormProps) {
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const isFrench = locale === 'fr';
  const t = {
    contactInfo: isFrench ? 'Coordonnées' : 'Contact Information',
    firstName: isFrench ? 'Prénom' : 'First Name',
    lastName: isFrench ? 'Nom' : 'Last Name',
    email: isFrench ? 'Adresse courriel' : 'Email Address',
    phone: isFrench ? 'Téléphone' : 'Phone Number',
    emailHint: isFrench ? 'nom@entreprise.com' : 'name@company.com',
    emailInvalid: isFrench ? "Veuillez entrer une adresse courriel valide." : 'Please enter a valid email address.',
    phoneInvalid: isFrench ? 'Au moins 10 chiffres.' : 'At least 10 digits.',
    orgInfo: isFrench ? "Informations de l'organisation" : 'Organization Information',
    orgName: isFrench ? "Nom de l'organisation" : 'Organization Name',
    industry: isFrench ? 'Secteur' : 'Industry',
    selectIndustry: isFrench ? 'Sélectionnez un secteur' : 'Select an industry',
    inquiry: isFrench ? 'Demande pompe' : 'Pump Inquiry',
    needs: isFrench ? 'De quoi avez-vous besoin ?' : 'What do you need?',
    ifQuote: isFrench ? 'Si vous demandez un devis :' : 'If requesting a quote:',
    timeline: isFrench ? "Échéancier d'achat" : 'Purchase Timeline',
    selectTimeline: isFrench ? "Sélectionnez l'échéancier" : 'Select timeline',
    quantity: isFrench ? 'Quantité estimée' : 'Estimated Quantity',
    qtyPlaceholder: isFrench ? 'ex. : 1-5 unités' : 'e.g., 1-5 units',
    details: isFrench ? 'Détails de la demande' : 'Inquiry Details',
    detailsPlaceholder: isFrench
      ? "Veuillez inclure votre demande ainsi que des détails sur l'usage prévu, les conditions du site, la source d'eau et les modèles ou accessoires souhaités."
      : 'Please include your inquiry and any details about your use case, site conditions, water source, and any preferred models or accessories.',
    submit: isFrench ? 'Envoyer la demande' : 'Submit Request',
  };
  return (
    <form
      className="space-y-6"
      id="rfq-form"
      name="pump-inquiry"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action={action}
      onSubmitCapture={() => setShowValidationErrors(true)}
    >
      <input type="hidden" name="form-name" value="pump-inquiry" />
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="locale" value={locale} />
      {/* Contact Information */}
      <div>
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-amber-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t.contactInfo}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label.Root
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.firstName} <span className="text-red-500">*</span>
            </Label.Root>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.lastName} <span className="text-red-500">*</span>
            </Label.Root>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.email} <span className="text-red-500">*</span>
            </Label.Root>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t.emailHint}
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition ${
                showValidationErrors
                  ? 'invalid:border-rose-300 focus:invalid:border-rose-400 placeholder-shown:invalid:border-gray-300'
                  : ''
              }`}
            />
            <p className={`mt-1 text-xs text-rose-600 ${showValidationErrors ? 'hidden peer-invalid:block peer-placeholder-shown:hidden' : 'hidden'}`}>
              {t.emailInvalid}
            </p>
          </div>
          <div>
            <Label.Root
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.phone}
            </Label.Root>
            <input
              type="tel"
              id="phone"
              name="phone"
              inputMode="tel"
              pattern={"(?:[0-9][\\s-]?){10,}"}
              minLength={10}
              title={isFrench ? 'Veuillez entrer au moins 10 chiffres.' : 'Please enter at least 10 digits.'}
              placeholder={isFrench ? '555-123-4567' : '555-123-4567'}
              className={`peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition ${
                showValidationErrors
                  ? 'invalid:border-rose-300 focus:invalid:border-rose-400'
                  : ''
              }`}
            />
            <p className={`mt-1 text-xs text-rose-600 ${showValidationErrors ? 'hidden peer-invalid:block peer-placeholder-shown:hidden' : 'hidden'}`}>
              {t.phoneInvalid}
            </p>
          </div>
        </div>
      </div>

      {/* Organization Information */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center mr-3">
            <Building2 className="w-5 h-5 text-orange-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t.orgInfo}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label.Root
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.orgName} <span className="text-red-500">*</span>
            </Label.Root>
            <input
              type="text"
              id="organization"
              name="organization"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="industry"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.industry} <span className="text-red-500">*</span>
            </Label.Root>
            <select
              id="industry"
              name="industry"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition"
            >
              <option value="">{t.selectIndustry}</option>
              <option value="municipal">{isFrench ? 'Services incendie municipaux' : 'Municipal Fire Services'}</option>
              <option value="government">{isFrench ? 'Organismes gouvernementaux' : 'Government Agencies'}</option>
              <option value="wildland">{isFrench ? 'Lutte contre les feux de végétation' : 'Wildland Firefighting'}</option>
              <option value="industrial">{isFrench ? 'Sécurité industrielle et usine' : 'Industrial & Plant Safety'}</option>
              <option value="utilities">{isFrench ? 'Services publics et infrastructures' : 'Utilities & Infrastructure'}</option>
              <option value="forestry">{isFrench ? 'Foresterie et opérations éloignées' : 'Forestry & Remote Operations'}</option>
              <option value="contractor">{isFrench ? 'Entrepreneurs en lutte incendie' : 'Firefighting Contractors'}</option>
              <option value="emergency">{isFrench ? 'Gestion des urgences' : 'Emergency Management'}</option>
              <option value="dealer">{isFrench ? 'Distributeur / revendeur' : 'Dealer / Reseller'}</option>
              <option value="other">{isFrench ? 'Autre' : 'Other'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Service Requirements */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center mr-3">
            <Flame className="w-5 h-5 text-rose-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
              {t.inquiry}
            </h2>
        </div>
        <div className="space-y-6">
          <div>
            <Label.Root className="block text-sm font-medium text-gray-700 mb-3">
              {t.needs}
            </Label.Root>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'pump-selection', label: isFrench ? 'Recommandation de pompe' : 'Pump recommendation', icon: Flame },
                { id: 'accessories', label: isFrench ? 'Accessoires et raccords' : 'Accessories & fittings', icon: Droplets },
                { id: 'deployment', label: isFrench ? "Conseils de déploiement" : 'Deployment advice', icon: MapPin },
                { id: 'service-parts', label: isFrench ? 'Support pièces et service' : 'Parts & service support', icon: Wrench },
                { id: 'training', label: isFrench ? 'Formation opérateur' : 'Operator training', icon: Users },
                { id: 'request-quote', label: isFrench ? 'Demander un devis' : 'Request a quote', icon: FileText },
              ].map((service) => {
                const IconComponent = service.icon;
                return (
                <Label.Root
                  key={service.id}
                  htmlFor={service.id}
                  className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-rose-200 hover:bg-rose-50 transition-all cursor-pointer group"
                >
                    <input
                      id={service.id}
                      type="checkbox"
                      name="services"
                      value={service.id}
                      className="w-5 h-5 border-2 border-gray-300 rounded accent-red-700 focus:outline-none focus:ring-0 shrink-0"
                    />
                    <div className="w-8 h-8 rounded-lg bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors">
                      <IconComponent className="w-4 h-4 text-rose-600 group-hover:text-rose-700 transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 cursor-pointer flex-1 group-hover:text-gray-900 transition-colors">
                      {service.label}
                    </span>
                  </Label.Root>
                );
              })}
            </div>
          </div>

          <div className="text-sm font-medium text-gray-700">
            {t.ifQuote}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label.Root
                htmlFor="timeline"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {t.timeline}
              </Label.Root>
              <div className="relative">
                <select
                  id="timeline"
                  name="timeline"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition appearance-none bg-white"
                >
                  <option value="">{t.selectTimeline}</option>
                  <option value="1-4-months">1-4 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-plus-months">6+ months</option>
                  <option value="planning">{isFrench ? 'Planification / budget' : 'Planning / Budgeting'}</option>
                  <option value="other">{isFrench ? 'Autre' : 'Other'}</option>
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
                {t.quantity}
              </Label.Root>
              <div className="relative">
                <input
                  type="text"
                  id="volume"
                  name="volume"
                  placeholder={t.qtyPlaceholder}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition"
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
              {t.details} <span className="text-red-500">*</span>
            </Label.Root>
            <textarea
              id="details"
              name="details"
              rows={6}
              required
              placeholder={t.detailsPlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-slate-400 transition resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full brand-cta px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center space-x-2"
        >
          <span>{t.submit}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
