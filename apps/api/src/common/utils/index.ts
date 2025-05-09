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
