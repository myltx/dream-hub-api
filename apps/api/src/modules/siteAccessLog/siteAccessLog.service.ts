import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateLogDto } from './dto/create-siteAccessLog.dto';
import {
  getAllMonthsBetween,
  getDefaultStartAndEnd,
} from '../../common/utils/index';

@Injectable()
export class SiteAccessLogService {
  dbName = 'site_access_logs';
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}
  async create(createLogDto: CreateLogDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .insert([createLogDto]);

    if (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase.from(this.dbName).select('*');

    if (error) {
      throw new Error(`Error fetching tags: ${error.message}`);
    }

    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting tag: ${error.message}`);
    }

    return data;
  }

  async findByQuery(query: Record<string, any>) {
    let queryBuilder = this.supabase.from(this.dbName).select('*');

    // 动态构建查询条件
    for (const [key, value] of Object.entries(query)) {
      queryBuilder = queryBuilder.eq(key, value);
    }
    // const limit = query.limit || 10;
    // const offset = query.offset || 0;
    // queryBuilder = queryBuilder.range(offset, offset + limit - 1);
    // if (query.sortBy) {
    //   queryBuilder = queryBuilder.order(query.sortBy, {
    //     ascending: query.order !== 'desc',
    //   });
    // }
    const { data, error } = await queryBuilder;
    if (error) {
      throw new Error(`查询失败: ${error.message}`);
    }
    return data;
  }
  // 每日访问统计
  async increaseTodayVisitCount() {
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // 尝试查找今天的记录
    const { data, error } = await this.supabase
      .from('daily_site_visits')
      .select('*')
      .eq('visit_date', today)
      .single();

    if (error && error.code !== 'PGRST116') {
      // 非 "找不到记录" 的错误，抛出
      throw new Error(`Error fetching daily visit: ${error.message}`);
    }

    if (data) {
      // 如果已有记录，则更新访问量 +1
      const { error: updateError } = await this.supabase
        .from('daily_site_visits')
        .update({
          visit_count: data.visit_count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('visit_date', today);

      if (updateError) {
        throw new Error(`Error updating visit count: ${updateError.message}`);
      }

      return { message: 'Visit count updated for today' };
    } else {
      // 如果没有记录，插入一条新的
      const { error: insertError } = await this.supabase
        .from('daily_site_visits')
        .insert([
          {
            visit_date: today,
            visit_count: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        throw new Error(`Error inserting visit count: ${insertError.message}`);
      }

      return { message: 'Visit count inserted for today' };
    }
  }
  async getRecent7DaysVisitStats() {
    const { data, error } = await this.supabase
      .from('daily_site_visits')
      .select('visit_date, visit_count')
      .order('visit_date', { ascending: false })
      .limit(7);

    if (error) {
      throw new Error(`Error fetching 7-day stats: ${error.message}`);
    }

    // 如果前端希望按照时间升序显示（从旧到新），可以反转：
    return data.reverse();
  }
  async getVisitStatsByDateRange(startDate: string, endDate: string) {
    const { data, error } = await this.supabase
      .from('daily_site_visits')
      .select('visit_date, visit_count')
      .gte('visit_date', startDate)
      .lte('visit_date', endDate)
      .order('visit_date', { ascending: true });

    if (error) {
      throw new Error(`Error fetching visit stats: ${error.message}`);
    }

    return data;
  }
  async getMonthlyVisitStatsWithFill(start?: string, end?: string) {
    const { startMonth, endMonth } = getDefaultStartAndEnd();
    const actualStart = start || startMonth;
    const actualEnd = end || endMonth;

    const { data, error } = await this.supabase.rpc('get_monthly_visit_stats', {
      start_month: actualStart,
      end_month: actualEnd,
    });

    if (error) {
      throw new Error(`Error fetching monthly stats: ${error.message}`);
    }

    const allMonths = getAllMonthsBetween(actualStart, actualEnd);
    const dataMap = new Map(
      data.map((item) => [item.month, item.total_visits]),
    );

    return allMonths.map((month) => ({
      month,
      total_visits: dataMap.get(month) ?? 0,
    }));
  }

  async syncDailySiteVisits() {
    const { error } = await this.supabase.rpc('sync_daily_site_visits');

    if (error) {
      throw new Error(`Failed to sync daily site visits: ${error.message}`);
    }
  }
}
