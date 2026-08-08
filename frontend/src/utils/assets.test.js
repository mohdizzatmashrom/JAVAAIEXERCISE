import { describe, it, expect } from 'vitest';
import { countByStatus, filterAssets } from './assets';
import { sampleAssets } from '../test/testUtils.jsx';

describe('asset utility functions', () => {
    it('filers assets by search text', () => {
        const result = filterAssets(sampleAssets, 'ipad', 'ALL');

        expect(result).toHaveLength(1);
        expect(result[0].assetTag).toBe('TAB-2026-001');
    });

    it('filters assets by status', () => {
        const result = filterAssets(sampleAssets, '', 'ASSIGNED');

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Samsung Monitor');
    });

    it('filter assets by both search text and status', () => {
        const result = filterAssets(sampleAssets, 'hq', 'AVAILABLE');

        expect(result).toHaveLength(1);
        expect(result[0].assetTag).toBe('LAP-2026-001');
    });

    it('counts assets by status', () => {
        expect(countByStatus(sampleAssets, 'AVAILABLE')).toBe(1);
        expect(countByStatus(sampleAssets, 'ASSIGNED')).toBe(1);
        expect(countByStatus(sampleAssets, 'MAINTENANCE')).toBe(1);
    });
});