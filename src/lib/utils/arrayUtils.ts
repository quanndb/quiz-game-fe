export function getNextElement<T>(array: T[], index?: number) {
  if (index === undefined) return array[0];
  if (index !== -1 && index < array.length - 1) {
    const nextElement = array[index + 1];
    return nextElement;
  }
  return null;
}

export function getPreviousElement<T>(array: T[], index?: number) {
  if (!index) return array[array.length - 1];
  if (index !== -1 && index > 0) {
    const previousElement = array[index - 1];
    return previousElement;
  }
  return null;
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]; // Tạo bản sao để không thay đổi mảng gốc
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Chọn chỉ số ngẫu nhiên
    [result[i], result[j]] = [result[j], result[i]]; // Hoán đổi phần tử
  }
  return result;
}

export function shuffleArrayInPlace<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // chỉ số ngẫu nhiên từ 0 đến i
    [array[i], array[j]] = [array[j], array[i]]; // hoán đổi phần tử
  }
}
