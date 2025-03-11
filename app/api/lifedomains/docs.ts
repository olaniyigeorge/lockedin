/**
 * ===========================
 * Life Domains API Documentation
 * ===========================
 * @description API documentation for the `/api/lifedomains` route. 
 * This file defines the types and interfaces used for handling life domains
 * and their related operations.
 */

/**
 * @interface LifeDomainType
 * @description Defines the structure of a Life Domain.
 */
export interface LifeDomainType {
    _id: string;
    name: string;
    description: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @interface GetLifeDomainsResponse
 * @description Response structure for fetching life domains.
 */
export interface GetLifeDomainsResponse {
    message: string;
    data: LifeDomainType[] | null;
    pagination: {
        totalLifeDomains: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    } | null;
}

/**
 * @interface PostLifeDomainRequest
 * @description Request payload structure for creating a new life domain.
 */
export interface PostLifeDomainRequest {
    name: string;
    description: string;
    owner: string;
}

/**
 * @interface PostLifeDomainResponse
 * @description Response structure for creating a new life domain.
 */
export interface PostLifeDomainResponse {
    message: string;
    data: LifeDomainType | null;
}
