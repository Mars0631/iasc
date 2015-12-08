package com.iasc.core.websocket;

import java.util.Date;

import org.quartz.JobDetail;
import org.quartz.SchedulerFactory;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.quartz.impl.StdSchedulerFactory;

import com.iasc.core.util.SystemInfo;

import static org.quartz.JobBuilder.*;
import static org.quartz.TriggerBuilder.*;
import static org.quartz.CronScheduleBuilder.*;
import static org.quartz.SimpleScheduleBuilder.*;
import static org.quartz.DateBuilder.*;

public class QuartzTest {

	public static void main(String[] args) throws SchedulerException {
		
		SchedulerFactory schedFact = new StdSchedulerFactory();
		Scheduler sched = schedFact.getScheduler();

		sched.start();
		
		JobDetail job = newJob(SystemInfoJob.class).withIdentity("myJob", "group1").build();

		Trigger trigger = newTrigger().withIdentity("myTrigger", "group1")
				.startNow().withSchedule(
						simpleSchedule().withIntervalInSeconds(1)
								.repeatForever()).build();
		//指定一个时间点开始执行
		SimpleTrigger spTrigger1 = (SimpleTrigger) newTrigger().withIdentity(
				"smTrigger1", "group1").startAt(
				new Date(new Date().getTime() + 1000 * 5))
				.build();
		
		//指定一个时间点开始执行，间隔1秒并执行10次
		SimpleTrigger spTrigger2 = (SimpleTrigger) newTrigger().withIdentity(
				"smTrigger2", "group1").startAt(
				new Date(new Date().getTime() + 1000 * 5)).withSchedule(
				simpleSchedule().withIntervalInSeconds(1).withRepeatCount(10))
				.build();
		//利用DateBuilder创建一个将来的日期，并且执行
		SimpleTrigger spTrigger3 = (SimpleTrigger) newTrigger().withIdentity(
				"smTrigger3", "group1").startAt(
				futureDate(5, IntervalUnit.SECOND)).build();

		//如果不指定startAt(myStartTime)则立即运行
		//立即执行，每隔1s执行一次，直到15:08:30结束
		//当我们需要创建一个每间隔10秒钟触发一次直到指定的结束时间的 Trigger，
		//而无需去计算从开始到结束的所重复的次数，我们只需简单的指定结束时间和使用REPEAT_INDEFINITELY作为重复次数的属性值即可
		//（我们也可以指定一个比在指定结束时间到达时实际执行次数大的重复次数）。
//		SimpleTrigger spTrigger4 = (SimpleTrigger) newTrigger().withIdentity(
//				"smTrigger4", "group1").startNow().withSchedule(
//				simpleSchedule().withIntervalInMilliseconds(100).withRepeatCount(SimpleTrigger.REPEAT_INDEFINITELY)) 
//				.endAt(dateOf(15, 8, 30)).build();
//
//		//evenSecondDate(null)获得下一个偶数秒
//		SimpleTrigger spTrigger5 = (SimpleTrigger) newTrigger().withIdentity(
//				"smTrigger5","group1").startAt(evenSecondDate(null)).withSchedule(
//				simpleSchedule().withIntervalInMilliseconds(100).repeatForever())
//				.build();
		

		
		//指定每 5/10  the seconds 5,15,25,35,45,55 秒开始执行  共7位操作符,
		//分别代表 second,minute,hour,day,day-of-month,day-of-week,year(optional fields)
		Trigger cronTrigger = newTrigger()
				.withIdentity("cronTrigger", "group1").withSchedule(
						cronSchedule("5/10 * * * * ? 2014")).build();
		
		
		//使用dataMap
//		Trigger dataMapTest = newTrigger()
//				.withIdentity("testDataMap", "group1").usingJobData("jobSays",
//						"hello world").usingJobData("myFloatValue", 3.141f)
//				.build();
		
   		sched.scheduleJob(job,spTrigger2);
		
	}
}
