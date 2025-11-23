// ============================================================================
// Edit Client Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
import { cn } from '@/utils';
import {
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

// Brazilian phone validation
const validatePhone = (phone: string): boolean => {
  if (!phone || phone.trim() === '') return true;
  const cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.length < 10 || cleaned.length > 11) return false;
  return true;
};

// Brazilian CPF validation
const validateCPF = (cpf: string): boolean => {
  if (!cpf) return true;
  const cleaned = cpf.replace(/[^\d]/g, '');
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned[10])) return false;

  return true;
};

// Brazilian CNPJ validation
const validateCNPJ = (cnpj: string): boolean => {
  if (!cnpj) return true;
  const cleaned = cnpj.replace(/[^\d]/g, '');
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned[i]) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(cleaned[12])) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleaned[i]) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(cleaned[13])) return false;

  return true;
};

// Validation schema
const clientSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome muito longo'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .max(254, 'E-mail muito longo'),
  phone: z
    .string()
    .optional()
    .refine((phone) => !phone || validatePhone(phone), 'Telefone inválido'),
  company: z
    .string()
    .max(100, 'Nome da empresa muito longo')
    .optional(),
  document: z
    .string()
    .optional(),
  document_type: z
    .enum(['cpf', 'cnpj', ''])
    .optional(),
}).refine((data) => {
  if (data.document && data.document_type === 'cpf') {
    return validateCPF(data.document);
  }
  if (data.document && data.document_type === 'cnpj') {
    return validateCNPJ(data.document);
  }
  return true;
}, {
  message: 'Documento inválido',
  path: ['document'],
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [clientName, setClientName] = useState('');

  const clientId = params.id as string;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      document: '',
      document_type: '',
    },
  });

  const documentType = watch('document_type');

  // Fetch client data
  useEffect(() => {
    const fetchClient = async () => {
      if (!clientId) return;

      try {
        const response = await api.clients.get(clientId);
        if (response.data.success) {
          const client = response.data.data.client;
          setClientName(client.name);
          reset({
            name: client.name || '',
            email: client.email || '',
            phone: client.phone || '',
            company: client.company || '',
            document: client.document || '',
            document_type: client.document_type || '',
          });
        } else {
          throw new Error(response.data.error || 'Erro ao carregar cliente');
        }
      } catch (err: any) {
        console.error('Error fetching client:', err);
        toast.error('Erro ao carregar cliente');
        router.push('/dashboard/clients');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [clientId, reset, router]);

  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true);
    try {
      const response = await api.clients.update(clientId, {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        document: data.document || null,
        document_type: data.document_type || null,
      });

      // Check for success - API returns 200 with success: true
      if (response.status === 200 || response.data.success) {
        toast.success('Cliente atualizado com sucesso!');
        router.push(`/dashboard/clients/${clientId}`);
        return;
      } else {
        throw new Error(response.data.error || 'Erro ao atualizar cliente');
      }
    } catch (error: any) {
      // If update was actually successful (200 status), redirect anyway
      if (error.response?.status === 200) {
        toast.success('Cliente atualizado com sucesso!');
        router.push(`/dashboard/clients/${clientId}`);
        return;
      }
      console.error('Error updating client:', error);
      const message = error.response?.data?.error || error.message || 'Erro ao atualizar cliente';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await api.clients.delete(clientId);
      // Check for success - API returns 200 with success: true
      if (response.status === 200 || response.data.success) {
        toast.success('Cliente excluído com sucesso!');
        router.push('/dashboard/clients');
        return;
      } else {
        throw new Error(response.data.error || 'Erro ao excluir cliente');
      }
    } catch (error: any) {
      // If delete was actually successful (200 status), redirect anyway
      if (error.response?.status === 200) {
        toast.success('Cliente excluído com sucesso!');
        router.push('/dashboard/clients');
        return;
      }
      console.error('Error deleting client:', error);
      const message = error.response?.data?.error || error.message || 'Erro ao excluir cliente';
      toast.error(message);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Format functions
  const formatPhone = (value: string) => {
    if (!value) return value;
    const numbers = value.replace(/\D/g, '');
    const limitedNumbers = numbers.slice(0, 11);

    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return limitedNumbers.replace(/(\d{2})(\d+)/, '($1) $2');
    } else if (limitedNumbers.length <= 10) {
      return limitedNumbers.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else {
      return limitedNumbers.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    }
  };

  const formatCPF = (value: string) => {
    if (!value) return value;
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 11);

    if (limited.length <= 3) return limited;
    if (limited.length <= 6) return limited.replace(/(\d{3})(\d+)/, '$1.$2');
    if (limited.length <= 9) return limited.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return limited.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
  };

  const formatCNPJ = (value: string) => {
    if (!value) return value;
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 14);

    if (limited.length <= 2) return limited;
    if (limited.length <= 5) return limited.replace(/(\d{2})(\d+)/, '$1.$2');
    if (limited.length <= 8) return limited.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    if (limited.length <= 12) return limited.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
    return limited.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5');
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando cliente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/dashboard/clients/${clientId}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Voltar para Cliente
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
              <UserIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Editar Cliente</h1>
              <p className="text-gray-600">{clientName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            <TrashIcon className="w-4 h-4" />
            Excluir
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Excluir Cliente</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir <strong>{clientName}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('name')}
              type="text"
              autoComplete="name"
              className={cn(
                'input-field pl-10',
                errors.name && 'border-red-300 focus:border-red-500 focus:ring-red-500'
              )}
              placeholder="Nome do cliente"
              disabled={isSubmitting}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-mail *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className={cn(
                'input-field pl-10',
                errors.email && 'border-red-300 focus:border-red-500 focus:ring-red-500'
              )}
              placeholder="cliente@empresa.com"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('phone', {
                onChange: (e) => {
                  e.target.value = formatPhone(e.target.value);
                }
              })}
              type="tel"
              autoComplete="tel"
              maxLength={15}
              className={cn(
                'input-field pl-10',
                errors.phone && 'border-red-300 focus:border-red-500 focus:ring-red-500'
              )}
              placeholder="(11) 99999-9999"
              disabled={isSubmitting}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Empresa
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('company')}
              type="text"
              autoComplete="organization"
              className={cn(
                'input-field pl-10',
                errors.company && 'border-red-300 focus:border-red-500 focus:ring-red-500'
              )}
              placeholder="Nome da empresa"
              disabled={isSubmitting}
            />
          </div>
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        {/* Document Type & Document */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="document_type" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Documento
            </label>
            <select
              {...register('document_type')}
              className={cn(
                'input-field',
                errors.document_type && 'border-red-300 focus:border-red-500 focus:ring-red-500'
              )}
              disabled={isSubmitting}
              onChange={(e) => {
                setValue('document_type', e.target.value as 'cpf' | 'cnpj' | '');
                setValue('document', '');
              }}
            >
              <option value="">Selecione...</option>
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
            </select>
          </div>

          <div>
            <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-2">
              {documentType === 'cpf' ? 'CPF' : documentType === 'cnpj' ? 'CNPJ' : 'Documento'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IdentificationIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('document', {
                  onChange: (e) => {
                    if (documentType === 'cpf') {
                      e.target.value = formatCPF(e.target.value);
                    } else if (documentType === 'cnpj') {
                      e.target.value = formatCNPJ(e.target.value);
                    }
                  }
                })}
                type="text"
                maxLength={documentType === 'cpf' ? 14 : documentType === 'cnpj' ? 18 : 20}
                className={cn(
                  'input-field pl-10',
                  errors.document && 'border-red-300 focus:border-red-500 focus:ring-red-500'
                )}
                placeholder={
                  documentType === 'cpf' ? '000.000.000-00' :
                  documentType === 'cnpj' ? '00.000.000/0000-00' :
                  'Selecione o tipo primeiro'
                }
                disabled={isSubmitting || !documentType}
              />
            </div>
            {errors.document && (
              <p className="mt-1 text-sm text-red-600">{errors.document.message}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Link
            href={`/dashboard/clients/${clientId}`}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors',
              isSubmitting && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </span>
            ) : (
              'Salvar Alterações'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
