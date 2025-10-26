export const generateAccountCode = (parentAccountCode: string, lastAccountCode?: string): string => {
  // Split parent code into segments
  const segments = parentAccountCode.split('.');

  // If there's no lastAccountCode, generate first child
  if (!lastAccountCode) {
    // For first level, append "01"
    if (segments.length === 1) {
      return `${parentAccountCode}.01`;
    }
    // For second level and beyond, append "001"
    return `${parentAccountCode}.001`;
  }

  // Split last account code to get the last segment
  const lastSegments = lastAccountCode.split('.');
  const lastNumber = lastSegments[lastSegments.length - 1];

  // Increment the last number
  const incrementedNumber = parseInt(lastNumber) + 1;

  // Format based on level
  let newLastSegment: string;
  if (segments.length === 1) {
    // Level 2 (XX format)
    newLastSegment = incrementedNumber.toString().padStart(2, '0');
  } else {
    // Level 3+ (XXX format)
    newLastSegment = incrementedNumber.toString().padStart(3, '0');
  }

  // Replace last segment with new number
  lastSegments[lastSegments.length - 1] = newLastSegment;

  return lastSegments.join('.');
};
