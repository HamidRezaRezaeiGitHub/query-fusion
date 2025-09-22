import { cn } from '../utils';

describe('cn utility function', () => {
  it('should merge class names using clsx and tailwind-merge', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500');
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('should handle conditional class names', () => {
    const isActive = true;
    const isDisabled = false;
    
    const result = cn(
      'base-class',
      isActive && 'active-class',
      isDisabled && 'disabled-class'
    );
    
    expect(result).toBe('base-class active-class');
  });

  it('should handle objects with boolean values', () => {
    const result = cn({
      'class1': true,
      'class2': false,
      'class3': true
    });
    
    expect(result).toBe('class1 class3');
  });

  it('should merge conflicting Tailwind classes correctly', () => {
    // tailwind-merge should resolve conflicts by keeping the last one
    const result = cn('px-4', 'px-8', 'py-2', 'py-4');
    expect(result).toBe('px-8 py-4');
  });

  it('should handle arrays of class names', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
    expect(cn(null)).toBe('');
    expect(cn(undefined)).toBe('');
  });

  it('should handle complex Tailwind class conflicts', () => {
    // Test common Tailwind class conflicts
    const result = cn(
      'bg-red-500 bg-blue-500', // background conflict - should keep blue
      'text-sm text-lg', // font size conflict - should keep lg
      'p-4 px-8' // padding conflict - px should override p horizontally
    );
    
    // tailwind-merge should resolve these conflicts appropriately
    expect(result).toContain('bg-blue-500');
    expect(result).toContain('text-lg');
    expect(result).not.toContain('bg-red-500');
    expect(result).not.toContain('text-sm');
  });

  it('should preserve non-conflicting classes', () => {
    const result = cn(
      'rounded-lg',
      'shadow-md',
      'hover:bg-gray-100',
      'transition-colors'
    );
    
    expect(result).toBe('rounded-lg shadow-md hover:bg-gray-100 transition-colors');
  });

  it('should handle responsive classes', () => {
    const result = cn(
      'block',
      'md:flex',
      'lg:grid',
      'xl:inline-block'
    );
    
    expect(result).toBe('block md:flex lg:grid xl:inline-block');
  });

  it('should handle state variants', () => {
    const result = cn(
      'bg-blue-500',
      'hover:bg-blue-600',
      'focus:bg-blue-700',
      'active:bg-blue-800'
    );
    
    expect(result).toBe('bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800');
  });
});