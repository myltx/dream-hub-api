// 管理员角色名称
export const ADMIN_ROLE_NAME = '管理员';

/**
 *
 * @description 格式化时间
 * @param time 时间戳
 * @returns 格式化后的时间字符串
 */
export function formatTime(time: number | string): string {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function getAllMonthsBetween(start: string, end: string): string[] {
  const result: string[] = [];

  const [startYear, startMonth] = start.split('-').map(Number);
  const [endYear, endMonth] = end.split('-').map(Number);

  let year = startYear;
  let month = startMonth;

  while (year < endYear || (year === endYear && month <= endMonth)) {
    const mm = month.toString().padStart(2, '0');
    result.push(`${year}-${mm}`);

    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return result;
}

export function getDefaultStartAndEnd(): {
  startMonth: string;
  endMonth: string;
} {
  const now = new Date();
  const endYear = now.getFullYear();
  const endMonth = now.getMonth() + 1; // 0-based

  const endStr = `${endYear}-${String(endMonth).padStart(2, '0')}`;

  // 12个月前
  now.setMonth(now.getMonth() - 11);
  const startYear = now.getFullYear();
  const startMonth = now.getMonth() + 1;
  const startStr = `${startYear}-${String(startMonth).padStart(2, '0')}`;

  return { startMonth: startStr, endMonth: endStr };
}
