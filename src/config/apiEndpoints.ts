import { apiClient } from '../config/http.js';
import { config } from './env.js';

// Dynamically read the OpenAPI definitions from the specified URL
interface OpenApiParameter {
    name: string;
    in: string;
    description: string;
    required?: boolean;
    schema?: {
        type: string;
        default?: any;
    };
}

interface OpenApiMethod {
    operationId: string;
    summary: string;
    parameters?: OpenApiParameter[];
}

interface OpenApiPath {
    [key: string]: {
        [method: string]: OpenApiMethod;
    };
}

interface OpenApiData {
    paths: OpenApiPath;
}

interface ApiEndpoint {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: Record<string, any>;
    } | {};
    path: string;
    method: string;
}

let cachedOpenApiData: OpenApiData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds
/**
 * Fetches OpenAPI data with error handling and caching
 */
const fetchOpenApiData = async (): Promise<OpenApiData> => {
    const currentTime = Date.now();
    
    // Return cached data if it's still valid
    if (cachedOpenApiData && (currentTime - lastFetchTime < CACHE_DURATION)) {
        return cachedOpenApiData;
    }
    
    try {
        const response = await apiClient.get('/v3/api-docs/all');
        cachedOpenApiData = response.data;
        lastFetchTime = currentTime;
        return response.data;
    } catch (error) {
        console.error('Failed to fetch OpenAPI data:', error);
        // If we have cached data, return it even if expired
        if (cachedOpenApiData) {
            console.warn('Using expired cached OpenAPI data due to fetch error');
            return cachedOpenApiData;
        }
        // Otherwise, throw the error
        throw new Error('Failed to fetch OpenAPI data and no cache available');
    }
};

/**
 * Transforms OpenAPI parameter to input schema property
 */
const transformParameterToProperty = (param: OpenApiParameter) => {
    return [
        param.name,
        {
            type: param.schema?.type || 'string',
            description: param.description,
            nullable: param.required ? false : true,
            default: param.schema?.default,
        }
    ];
};

/**
 * Filters out internal parameters that shouldn't be exposed
 */
const isExposableParameter = (param: OpenApiParameter): boolean => {
    const internalParams = ['tenant-id', 'Authorization'];
    return !internalParams.includes(param.name);
};

// Fetch OpenAPI data
const openApiData: { paths: OpenApiPath } = await fetchOpenApiData();

// Filter out disallowed APIs and transform the data
const API_ENDPOINTS = Object.entries(openApiData.paths)
    .filter(([path]) => config.ALLOWED_APIS.includes(path))
    .map(([path, methods]) => {
        return Object.entries(methods).map(([method, details]) => {
            return {
                name: details.operationId,
                description: details.summary,
                inputSchema: details.parameters ? {
                    type: 'object',
                    properties: Object.fromEntries(details.parameters
                        .filter(isExposableParameter)
                        .map(transformParameterToProperty)
                    )
                } : {},
                path: path,
                method: method.toUpperCase()
            };
        });
    }).flat() as ApiEndpoint[];

// Create the tools array
export const tools = API_ENDPOINTS.map(endpoint => ({
    name: endpoint.name,
    description: endpoint.description,
    inputSchema: endpoint.inputSchema
}));

// Create the apiMap
export const apiMap = API_ENDPOINTS.reduce((acc, endpoint) => {
    acc[endpoint.name] = endpoint;
    return acc;
}, {} as Record<string, typeof API_ENDPOINTS[number]>);
