import { generateAccountCode } from '..';

describe('generateAccountCode', () => {
  describe('Generate first child (without lastAccountCode)', () => {
    it('should generate first child code for level 1 parent', () => {
      expect(generateAccountCode('1')).toBe('1.01');
      expect(generateAccountCode('2')).toBe('2.01');
    });

    it('should generate first child code for level 2 parent', () => {
      expect(generateAccountCode('1.01')).toBe('1.01.001');
      expect(generateAccountCode('2.05')).toBe('2.05.001');
    });

    it('should generate first child code for level 3 parent', () => {
      expect(generateAccountCode('1.01.001')).toBe('1.01.001.001');
      expect(generateAccountCode('2.05.003')).toBe('2.05.003.001');
    });
  });

  describe('Generate next sibling (with lastAccountCode)', () => {
    it('should generate next sibling code for level 2', () => {
      expect(generateAccountCode('1', '1.01')).toBe('1.02');
      expect(generateAccountCode('1', '1.09')).toBe('1.10');
    });

    it('should generate next sibling code for level 3', () => {
      expect(generateAccountCode('1.01', '1.01.001')).toBe('1.01.002');
      expect(generateAccountCode('1.01', '1.01.009')).toBe('1.01.010');
      expect(generateAccountCode('1.01', '1.01.099')).toBe('1.01.100');
    });

    it('should generate next sibling code for level 4', () => {
      expect(generateAccountCode('1.01.001', '1.01.001.001')).toBe('1.01.001.002');
      expect(generateAccountCode('1.01.001', '1.01.001.009')).toBe('1.01.001.010');
    });
  });

  describe('Edge cases and format validation', () => {
    it('should maintain correct padding format for each level', () => {
      // Level 2 should always have 2 digits
      expect(generateAccountCode('1', '1.09')).toBe('1.10');

      // Level 3 and beyond should always have 3 digits
      expect(generateAccountCode('1.01', '1.01.009')).toBe('1.01.010');
      expect(generateAccountCode('1.01', '1.01.099')).toBe('1.01.100');
    });

    it('should handle single digit parent codes', () => {
      expect(generateAccountCode('1')).toBe('1.01');
      expect(generateAccountCode('9')).toBe('9.01');
    });

    it('should handle multi-level parent codes', () => {
      expect(generateAccountCode('1.01.001.001')).toBe('1.01.001.001.001');
      expect(generateAccountCode('1.01.001.001', '1.01.001.001.002')).toBe('1.01.001.001.003');
    });
  });
});
