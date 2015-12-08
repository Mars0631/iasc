package com.iasc.core.websocket;


import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Date;
import java.util.concurrent.LinkedBlockingQueue;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleTrigger;
import org.quartz.impl.StdSchedulerFactory;



public class SocketServer extends WebSocketServlet {
	
	public static LinkedBlockingQueue<String> queue=new LinkedBlockingQueue<String>();

	
	
	private static final long serialVersionUID = 1L;
	
	
    
	@Override
	protected StreamInbound createWebSocketInbound(String arg0,
			HttpServletRequest arg1) {
		
		return new IascWebSocket();
	}
	
	public class IascWebSocket extends MessageInbound {
		
		private boolean isRun = true;  
		
		MessageThread mt=new MessageThread();
		
		
		private int interval=3000;
		 
		//Quarts 
		SchedulerFactory schedFact ;
		Scheduler sched;
		SimpleTrigger spTrigger1;
		JobDetail job ;
		
		WsOutbound outbound =null;
		
		@Override
		protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
			
		}
		
		@Override
		protected void onOpen(WsOutbound outbound) {
			this.outbound=outbound;
				
			mt.setOutBound(this.outbound);
			isRun=false;
			
			schedFact=new StdSchedulerFactory();
			spTrigger1= (SimpleTrigger) newTrigger().withIdentity(
					"smTrigger1", "group1").startAt(
					new Date()).withSchedule(simpleSchedule().withIntervalInSeconds(3).repeatForever()).build();
			job=newJob(SystemInfoJob.class).withIdentity("systemInofjob", "group1").build();
			try {
				sched = schedFact.getScheduler();
				sched.clear();
				sched.scheduleJob(job,spTrigger1);
				sched.start();
				
			} catch (SchedulerException e1) {
				e1.printStackTrace();
			}
			
			System.out.println("Connection opened!");
			
		}
		
		
		@Override
		protected void onClose(int status) {
			try {
				if(sched.isStarted()){
					sched.shutdown();
				}
				if(isRun){
					mt.close();
					mt.interrupt();
				}
				queue.clear();
				schedFact=null;
				outbound=null;
				sched=null;
				spTrigger1=null;
				job=null ;
				
			} catch (SchedulerException e) {
				e.printStackTrace();
			}
			System.out.println("Connection closed!");
		}

		@Override
		protected void onTextMessage(CharBuffer arg0) throws IOException {
			if(!isRun){
				isRun=true;
				mt.start();
			}
			
		}
		
		public class MessageThread extends Thread{
			
			private WsOutbound outBound;
			
			
			public WsOutbound getOutBound() {
				return outBound;
			}

			public void setOutBound(WsOutbound outBound) {
				this.outBound = outBound;
			}

			public void close() {  
				isRun = false;  
			}  

			@Override
			public void run(){
				
				while (isRun) {
					try {
						try {
							Thread.sleep(interval);
							CharBuffer buffer = CharBuffer.wrap(SocketServer.queue.take());
							this.outBound.writeTextMessage(buffer);
							this.outBound.flush();
						} catch (InterruptedException e) {
						}

					} catch (IOException e) {
					}
				}
				
			}
			
		}
	
	}
}
