export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
}

export interface SchemaOrgWebsite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
}

export interface SchemaOrgOrganization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

/**
 * Generate meta tags for SEO
 */
export function generateMetaTags(props: SEOProps, siteUrl: string) {
  const { title, description, canonical, ogImage, ogType = 'website', twitterCard = 'summary_large_image', noindex = false } = props;

  const canonicalURL = canonical || siteUrl;
  const imageURL = ogImage || `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    canonical: canonicalURL,
    ogTitle: title,
    ogDescription: description,
    ogImage: imageURL,
    ogType,
    ogUrl: canonicalURL,
    twitterCard,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageURL,
    noindex,
  };
}

/**
 * Generate JSON-LD schema for website
 */
export function generateWebsiteSchema(name: string, url: string, description?: string): string {
  const schema: SchemaOrgWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    ...(description && { description }),
  };

  return JSON.stringify(schema);
}

/**
 * Generate JSON-LD schema for organization
 */
export function generateOrganizationSchema(
  name: string,
  url: string,
  logo?: string,
  description?: string,
): string {
  const schema: SchemaOrgOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
  };

  return JSON.stringify(schema);
}
