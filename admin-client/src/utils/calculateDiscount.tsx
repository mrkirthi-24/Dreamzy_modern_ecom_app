
export function calculateDiscount(mrp: number, sell: number) {
    if (mrp === 0 || sell === 0) return 0;
    const discount = (mrp - sell) / mrp;
    return Math.round(discount * 100);
  }