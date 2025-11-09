/**
 * normal tax rate is 15% and for high income individuals 23% as stated here:
 * https://portal.gov.cz/en/informace/personal-income-taxes-INF-293
 * 
 * The tax rate amounts to 15% for the part of the tax base up to an average salary multiplied by 36 and 23% for the part of the tax base exceeding an average salary multiplied by 36.
 */
export type taxRate = 0.15 | 0.23;
