'use client';

import { useState } from 'react';
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  IdentificationIcon,
  PhotoIcon,
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface CompanySettings {
  profile: {
    name: string;
    legalName: string;
    businessType: 'MEI' | 'LTDA' | 'SA' | 'Individual';
    document: string;
    description: string;
    logo?: string;
    coverImage?: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
    website?: string;
    socialMedia: {
      linkedin?: string;
      instagram?: string;
      facebook?: string;
    };
  };
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessHours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  timezone: string;
  language: string;
  currency: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function CompanySettingsPage() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock initial data
  const [settings, setSettings] = useState<CompanySettings>({
    profile: {
      name: 'Arquitetura Silva & Santos',
      legalName: 'Silva & Santos Projetos Arquitetônicos LTDA',
      businessType: 'LTDA',
      document: '12.345.678/0001-90',
      description: 'Escritório de arquitetura especializado em projetos residenciais e comerciais de alto padrão.',
      logo: undefined,
      coverImage: undefined,
    },
    contact: {
      email: 'contato@arquiteturasilva.com.br',
      phone: '(11) 3456-7890',
      whatsapp: '(11) 98765-4321',
      website: 'https://www.arquiteturasilva.com.br',
      socialMedia: {
        linkedin: 'https://linkedin.com/company/arquiteturasilva',
        instagram: '@arquiteturasilva',
        facebook: 'facebook.com/arquiteturasilva',
      },
    },
    address: {
      street: 'Av. Paulista',
      number: '1578',
      complement: 'Conjunto 1402',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-200',
      country: 'Brasil',
    },
    businessHours: {
      monday: { open: '08:00', close: '18:00', isOpen: true },
      tuesday: { open: '08:00', close: '18:00', isOpen: true },
      wednesday: { open: '08:00', close: '18:00', isOpen: true },
      thursday: { open: '08:00', close: '18:00', isOpen: true },
      friday: { open: '08:00', close: '18:00', isOpen: true },
      saturday: { open: '09:00', close: '13:00', isOpen: true },
      sunday: { open: '00:00', close: '00:00', isOpen: false },
    },
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    currency: 'BRL',
    branding: {
      primaryColor: '#3b82f6',
      secondaryColor: '#1e40af',
    },
  });

  const updateField = (section: keyof CompanySettings, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const updateNestedField = (
    section: keyof CompanySettings,
    nestedSection: string,
    field: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [nestedSection]: {
          ...(prev[section] as any)[nestedSection],
          [field]: value,
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasUnsavedChanges(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    // In real app, would reload from API
    setHasUnsavedChanges(false);
  };

  const businessTypes = [
    { value: 'MEI', label: 'MEI - Microempreendedor Individual' },
    { value: 'LTDA', label: 'LTDA - Sociedade Limitada' },
    { value: 'SA', label: 'SA - Sociedade Anônima' },
    { value: 'Individual', label: 'Individual - Pessoa Física' },
  ];

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  const weekDays = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configurações da Empresa</h1>
              <p className="text-sm text-gray-600 mt-1">
                Gerencie as informações e preferências da sua organização
              </p>
            </div>
            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <InformationCircleIcon className="w-5 h-5" />
                  <span>Alterações não salvas</span>
                </div>
              )}
              {showSuccessMessage && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Configurações salvas com sucesso!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-3">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-1">
                {[
                  { id: 'profile', label: 'Perfil da Empresa', icon: BuildingOfficeIcon },
                  { id: 'contact', label: 'Informações de Contato', icon: EnvelopeIcon },
                  { id: 'address', label: 'Endereço', icon: MapPinIcon },
                  { id: 'hours', label: 'Horário de Funcionamento', icon: ClockIcon },
                  { id: 'branding', label: 'Identidade Visual', icon: PaintBrushIcon },
                  { id: 'preferences', label: 'Preferências', icon: GlobeAltIcon },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-9">
            <div className="space-y-6">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Perfil da Empresa</h2>
                      <p className="text-sm text-gray-600">Informações básicas da organização</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Logo and Cover Image */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logo da Empresa
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Clique para fazer upload</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG até 2MB</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Imagem de Capa
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Clique para fazer upload</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG até 5MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Fantasia *
                      </label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => updateField('profile', 'name', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nome da empresa"
                      />
                    </div>

                    {/* Legal Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razão Social *
                      </label>
                      <input
                        type="text"
                        value={settings.profile.legalName}
                        onChange={(e) => updateField('profile', 'legalName', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Razão social completa"
                      />
                    </div>

                    {/* Business Type and Document */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Empresa *
                        </label>
                        <select
                          value={settings.profile.businessType}
                          onChange={(e) =>
                            updateField('profile', 'businessType', e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {businessTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CNPJ/CPF *
                        </label>
                        <input
                          type="text"
                          value={settings.profile.document}
                          onChange={(e) => updateField('profile', 'document', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="00.000.000/0000-00"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Empresa
                      </label>
                      <textarea
                        value={settings.profile.description}
                        onChange={(e) => updateField('profile', 'description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Descreva sua empresa, serviços e diferenciais..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {settings.profile.description.length} / 500 caracteres
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === 'contact' && (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Informações de Contato
                      </h2>
                      <p className="text-sm text-gray-600">
                        Dados de contato e redes sociais
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Email and Phone */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail Principal *
                        </label>
                        <input
                          type="email"
                          value={settings.contact.email}
                          onChange={(e) => updateField('contact', 'email', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="contato@empresa.com.br"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone Comercial *
                        </label>
                        <input
                          type="tel"
                          value={settings.contact.phone}
                          onChange={(e) => updateField('contact', 'phone', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="(11) 3456-7890"
                        />
                      </div>
                    </div>

                    {/* WhatsApp and Website */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={settings.contact.whatsapp || ''}
                          onChange={(e) => updateField('contact', 'whatsapp', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="(11) 98765-4321"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={settings.contact.website || ''}
                          onChange={(e) => updateField('contact', 'website', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://www.empresa.com.br"
                        />
                      </div>
                    </div>

                    {/* Social Media */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Redes Sociais</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn
                          </label>
                          <input
                            type="url"
                            value={settings.contact.socialMedia.linkedin || ''}
                            onChange={(e) =>
                              updateNestedField('contact', 'socialMedia', 'linkedin', e.target.value)
                            }
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://linkedin.com/company/sua-empresa"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instagram
                          </label>
                          <input
                            type="text"
                            value={settings.contact.socialMedia.instagram || ''}
                            onChange={(e) =>
                              updateNestedField('contact', 'socialMedia', 'instagram', e.target.value)
                            }
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="@suaempresa"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facebook
                          </label>
                          <input
                            type="text"
                            value={settings.contact.socialMedia.facebook || ''}
                            onChange={(e) =>
                              updateNestedField('contact', 'socialMedia', 'facebook', e.target.value)
                            }
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="facebook.com/suaempresa"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Address Section */}
              {activeSection === 'address' && (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPinIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Endereço</h2>
                      <p className="text-sm text-gray-600">
                        Localização física da empresa
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* ZIP Code */}
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CEP *
                        </label>
                        <input
                          type="text"
                          value={settings.address.zipCode}
                          onChange={(e) => updateField('address', 'zipCode', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="00000-000"
                        />
                      </div>
                    </div>

                    {/* Street and Number */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logradouro *
                        </label>
                        <input
                          type="text"
                          value={settings.address.street}
                          onChange={(e) => updateField('address', 'street', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Rua, Avenida, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número *
                        </label>
                        <input
                          type="text"
                          value={settings.address.number}
                          onChange={(e) => updateField('address', 'number', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    {/* Complement and Neighborhood */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Complemento
                        </label>
                        <input
                          type="text"
                          value={settings.address.complement || ''}
                          onChange={(e) => updateField('address', 'complement', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Apto, Conjunto, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          value={settings.address.neighborhood}
                          onChange={(e) => updateField('address', 'neighborhood', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nome do bairro"
                        />
                      </div>
                    </div>

                    {/* City, State, Country */}
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          value={settings.address.city}
                          onChange={(e) => updateField('address', 'city', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="São Paulo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado *
                        </label>
                        <select
                          value={settings.address.state}
                          onChange={(e) => updateField('address', 'state', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {brazilianStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          País *
                        </label>
                        <input
                          type="text"
                          value={settings.address.country}
                          onChange={(e) => updateField('address', 'country', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Brasil"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Hours Section */}
              {activeSection === 'hours' && (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <ClockIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Horário de Funcionamento
                      </h2>
                      <p className="text-sm text-gray-600">
                        Configure os horários de atendimento
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {weekDays.map((day) => (
                      <div
                        key={day.key}
                        className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-32">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={settings.businessHours[day.key].isOpen}
                              onChange={(e) =>
                                updateNestedField(
                                  'businessHours',
                                  day.key,
                                  'isOpen',
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {day.label}
                            </span>
                          </label>
                        </div>

                        {settings.businessHours[day.key].isOpen ? (
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-2">
                              <label className="text-sm text-gray-600">Abertura:</label>
                              <input
                                type="time"
                                value={settings.businessHours[day.key].open}
                                onChange={(e) =>
                                  updateNestedField(
                                    'businessHours',
                                    day.key,
                                    'open',
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="text-sm text-gray-600">Fechamento:</label>
                              <input
                                type="time"
                                value={settings.businessHours[day.key].close}
                                onChange={(e) =>
                                  updateNestedField(
                                    'businessHours',
                                    day.key,
                                    'close',
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 text-sm text-gray-500 italic">Fechado</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Branding Section */}
              {activeSection === 'branding' && (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <PaintBrushIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Identidade Visual</h2>
                      <p className="text-sm text-gray-600">
                        Cores e elementos visuais da marca
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cor Primária
                        </label>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl border-2 border-gray-300"
                            style={{ backgroundColor: settings.branding.primaryColor }}
                          />
                          <input
                            type="text"
                            value={settings.branding.primaryColor}
                            onChange={(e) =>
                              updateField('branding', 'primaryColor', e.target.value)
                            }
                            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                            placeholder="#3b82f6"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Cor principal da identidade visual
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cor Secundária
                        </label>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl border-2 border-gray-300"
                            style={{ backgroundColor: settings.branding.secondaryColor }}
                          />
                          <input
                            type="text"
                            value={settings.branding.secondaryColor}
                            onChange={(e) =>
                              updateField('branding', 'secondaryColor', e.target.value)
                            }
                            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                            placeholder="#1e40af"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Cor complementar para detalhes
                        </p>
                      </div>
                    </div>

                    {/* Color Preview */}
                    <div className="p-6 rounded-xl border-2 border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">
                        Pré-visualização das Cores
                      </h3>
                      <div className="flex items-center gap-4">
                        <button
                          style={{ backgroundColor: settings.branding.primaryColor }}
                          className="px-6 py-3 text-white font-medium rounded-xl"
                        >
                          Botão Primário
                        </button>
                        <button
                          style={{
                            backgroundColor: settings.branding.secondaryColor,
                          }}
                          className="px-6 py-3 text-white font-medium rounded-xl"
                        >
                          Botão Secundário
                        </button>
                        <div
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{
                            backgroundColor: `${settings.branding.primaryColor}20`,
                            color: settings.branding.primaryColor,
                          }}
                        >
                          Badge
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Section */}
              {activeSection === 'preferences' && (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <GlobeAltIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Preferências</h2>
                      <p className="text-sm text-gray-600">
                        Configurações regionais e de sistema
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fuso Horário
                        </label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="America/Sao_Paulo">
                            (UTC-03:00) Brasília
                          </option>
                          <option value="America/Manaus">
                            (UTC-04:00) Manaus
                          </option>
                          <option value="America/Rio_Branco">
                            (UTC-05:00) Rio Branco
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Idioma
                        </label>
                        <select
                          value={settings.language}
                          onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="pt-BR">Português (Brasil)</option>
                          <option value="en-US">English (US)</option>
                          <option value="es-ES">Español</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Moeda
                        </label>
                        <select
                          value={settings.currency}
                          onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="BRL">BRL - Real Brasileiro (R$)</option>
                          <option value="USD">USD - Dólar Americano ($)</option>
                          <option value="EUR">EUR - Euro (€)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={handleCancel}
                  disabled={!hasUnsavedChanges}
                  className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges || isSaving}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-5 h-5" />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
