package com.iasc.core.websocket;

import java.math.BigDecimal;

import org.hyperic.sigar.CpuPerc;
import org.hyperic.sigar.FileSystem;
import org.hyperic.sigar.FileSystemUsage;
import org.hyperic.sigar.Mem;
import org.hyperic.sigar.Sigar;
import org.hyperic.sigar.SigarException;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

public class SystemInfoJob implements Job {
	BigDecimal bgTotal;
	BigDecimal bgUsed;
	BigDecimal memUsedScale;
	
	BigDecimal diskUsedScale;
	BigDecimal bdToal;
	BigDecimal bdUsed;
	
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Sigar sigar=new Sigar();
		
		try {
			CpuPerc cpu = null;
			try {
				cpu = sigar.getCpuPerc();
				Mem mem = sigar.getMem();  
				
				bgTotal=new BigDecimal(mem.getTotal());
				bgUsed=new BigDecimal(mem.getUsed());
				
				memUsedScale=new BigDecimal(bgUsed.doubleValue()/bgTotal.doubleValue() *100);
				memUsedScale=memUsedScale.setScale(2, BigDecimal.ROUND_HALF_UP);
				
				SocketServer.queue.put("USER$"+CpuPerc.format(cpu.getUser())+"|SYS$"+CpuPerc.format(cpu.getSys())+"|MEM$"+memUsedScale.toString()+"|DISK$"+getDiskUsage(sigar));
				 
			} catch (SigarException e) {
				e.printStackTrace();
				sigar.close();
			}
			
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally{
			sigar.close();
		}
	}
	
	private String getDiskUsage(Sigar sigar) throws SigarException{
		FileSystem fslist[] = sigar.getFileSystemList();  
		long total=0L;
		long used=0L;
		//String dir = System.getProperty("user.home");// 当前用户文件夹路径  
		//System.out.println(dir + "   " + fslist.length);  
		for (int i = 0; i < fslist.length; i++) {  
			FileSystem fs = fslist[i];  
//			// 分区的盘符名称  
//			System.out.println("fs.getDevName() = " + fs.getDevName());  
//			// 分区的盘符名称  
//			System.out.println("fs.getDirName() = " + fs.getDirName());  
//			System.out.println("fs.getFlags() = " + fs.getFlags());//  
//			// 文件系统类型，比如 FAT32、NTFS  
//			System.out.println("fs.getSysTypeName() = " + fs.getSysTypeName());  
//			// 文件系统类型名，比如本地硬盘、光驱、网络文件系统等  
//			System.out.println("fs.getTypeName() = " + fs.getTypeName());  
//			// 文件系统类型  
//			System.out.println("fs.getType() = " + fs.getType());  
			FileSystemUsage usage = null;  
			try {  
			    usage = sigar.getFileSystemUsage(fs.getDirName());  
			} catch (SigarException e) {  
			    if (fs.getType() == 2)  {
			        throw e;  
			    }
			    continue;  
			}  
			switch (fs.getType()) {  
			case 0: // TYPE_UNKNOWN ：未知  
			    break;  
			case 1: // TYPE_NONE  
			    break;  
			case 2: // TYPE_LOCAL_DISK : 本地硬盘  
			    // 文件系统总大小  
				total+=usage.getTotal();
				used+=usage.getUsed();
			    break;  
			case 3:// TYPE_NETWORK ：网络  
			    break;  
			case 4:// TYPE_RAM_DISK ：闪存  
			    break;  
			case 5:// TYPE_CDROM ：光驱  
			    break;  
			case 6:// TYPE_SWAP ：页面交换  
			    break;  
			}  
//			System.out.println(" DiskReads = " + usage.getDiskReads());  
//			System.out.println(" DiskWrites = " + usage.getDiskWrites());  
		} 
		bdToal=new BigDecimal(total);
		bdUsed=new BigDecimal(used);
		
		diskUsedScale=new BigDecimal(bdUsed.doubleValue()/bdToal.doubleValue()*100);
		diskUsedScale=diskUsedScale.setScale(2,BigDecimal.ROUND_HALF_UP);
		
		return diskUsedScale.toString();
	}

}
