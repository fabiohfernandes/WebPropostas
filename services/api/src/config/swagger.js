const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WebPropostas API',
      version: '2.0.0',
      description: 'API completa para plataforma de propostas comerciais WebPropostas',
      contact: {
        name: 'WebPropostas Team',
        url: 'https://infigital.net',
        email: 'contato@infigital.net'
      },
      license: {
        name: 'Proprietary',
        url: 'https://infigital.net/license'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://orcamentosonline-production-2693.up.railway.app',
        description: 'Production server (Railway)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtido via login (/api/v1/auth/login)'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do usuário'
            },
            organization_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID da organização do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            name: {
              type: 'string',
              description: 'Nome completo do usuário'
            },
            role: {
              type: 'string',
              enum: ['admin', 'user'],
              description: 'Papel do usuário na organização'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            }
          }
        },
        Client: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do cliente'
            },
            organization_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID da organização'
            },
            name: {
              type: 'string',
              description: 'Nome do cliente'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do cliente'
            },
            company: {
              type: 'string',
              description: 'Empresa do cliente'
            },
            phone: {
              type: 'string',
              description: 'Telefone de contato'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            }
          }
        },
        Proposal: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da proposta'
            },
            organization_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID da organização'
            },
            title: {
              type: 'string',
              description: 'Título da proposta'
            },
            status: {
              type: 'string',
              enum: ['aberta', 'alteracoes_solicitadas', 'fechada', 'rejeitada'],
              description: 'Status atual da proposta'
            },
            client_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do cliente associado'
            },
            content: {
              type: 'object',
              description: 'Conteúdo estruturado da proposta',
              properties: {
                apresentacao: { type: 'object' },
                comercial: { type: 'object' },
                escopo: { type: 'object' },
                termos: { type: 'object' }
              }
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização'
            }
          }
        },
        DashboardStats: {
          type: 'object',
          properties: {
            totalProposals: {
              type: 'integer',
              description: 'Total de propostas criadas'
            },
            totalClients: {
              type: 'integer',
              description: 'Total de clientes cadastrados'
            },
            conversionRate: {
              type: 'number',
              format: 'float',
              description: 'Taxa de conversão (fechadas/total)'
            },
            proposalsByStatus: {
              type: 'object',
              properties: {
                aberta: { type: 'integer' },
                alteracoes_solicitadas: { type: 'integer' },
                fechada: { type: 'integer' },
                rejeitada: { type: 'integer' }
              }
            }
          }
        },
        Template: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do template'
            },
            name: {
              type: 'string',
              description: 'Nome do template'
            },
            description: {
              type: 'string',
              description: 'Descrição do template'
            },
            category: {
              type: 'string',
              description: 'Categoria do template'
            },
            sector: {
              type: 'string',
              description: 'Setor de mercado'
            },
            thumbnail: {
              type: 'string',
              description: 'URL da imagem de preview'
            },
            sections: {
              type: 'object',
              description: 'Estrutura de seções do template'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            details: {
              type: 'string',
              description: 'Detalhes adicionais do erro'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
