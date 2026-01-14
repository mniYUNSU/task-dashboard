const categoryLabels: Record<string, string> = {
  Work: '業務',
  Personal: '個人',
  Study: '学習'
};

export function getCategoryLabel(category: string) {
  return categoryLabels[category] ?? category;
}
