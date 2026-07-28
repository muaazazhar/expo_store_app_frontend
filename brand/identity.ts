/**
 * Novalith Labs — brand identity constants
 * Shared across NovaCart, NovaFlow, NovaHire, and NovaStore.
 */

export const COMPANY = {
  name: 'Novalith Labs',
  legalName: 'Novalith Labs, Inc.',
  shortName: 'Novalith',
  tagline: 'Software with crystalline clarity.',
  domain: 'novalith.app',
} as const;

export type ProductId = 'novacart' | 'novaflow' | 'novahire' | 'novastore' | 'novalith';

export interface ProductIdentity {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  noreplyEmail: string;
  supportEmail: string;
}

export const PRODUCTS: Record<ProductId, ProductIdentity> = {
  novalith: {
    id: 'novalith',
    name: 'Novalith Labs',
    tagline: 'Software with crystalline clarity.',
    description: 'The company behind NovaCart, NovaFlow, NovaHire, and NovaStore.',
    domain: 'novalith.app',
    noreplyEmail: 'noreply@novalith.app',
    supportEmail: 'support@novalith.app',
  },
  novacart: {
    id: 'novacart',
    name: 'NovaCart',
    tagline: 'Commerce, refined.',
    description: 'Premium eCommerce for modern brands.',
    domain: 'novacart.app',
    noreplyEmail: 'noreply@novacart.app',
    supportEmail: 'support@novacart.app',
  },
  novaflow: {
    id: 'novaflow',
    name: 'NovaFlow',
    tagline: 'Work that moves.',
    description: 'Workflow automation for high-performing teams.',
    domain: 'novaflow.app',
    noreplyEmail: 'noreply@novaflow.app',
    supportEmail: 'support@novaflow.app',
  },
  novahire: {
    id: 'novahire',
    name: 'NovaHire',
    tagline: 'Hiring without friction.',
    description: 'Recruiting software for deliberate teams.',
    domain: 'novahire.app',
    noreplyEmail: 'noreply@novahire.app',
    supportEmail: 'support@novahire.app',
  },
  novastore: {
    id: 'novastore',
    name: 'NovaStore',
    tagline: 'Local commerce, clarified.',
    description: 'Mobile-first storefront for everyday ordering and delivery.',
    domain: 'novastore.app',
    noreplyEmail: 'noreply@novastore.app',
    supportEmail: 'support@novastore.app',
  },
} as const;

/** Active product for this frontend package */
export const ACTIVE_PRODUCT: ProductId = 'novastore';

export const APP = PRODUCTS[ACTIVE_PRODUCT];
