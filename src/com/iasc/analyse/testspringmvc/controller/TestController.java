package com.iasc.analyse.testspringmvc.controller;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.iasc.analyse.derby.dao.DerbyDao;
import com.iasc.core.util.SpringContextUtil;

public class TestController implements Controller {

	@Override
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		
		DerbyDao dd=(DerbyDao)SpringContextUtil.getBean("derbyDao");
		System.out.println(dd.isTableExists("C_SYS"));
		System.out.println(request.getParameter("num"));
		List<Map<String,String>> list = new ArrayList<Map<String,String>>();  
        Map<String,String> m1 = new HashMap<String,String>();  
        m1.put("activityId", "000001");  
        m1.put("activityName", "阿斯蒂芬1");  
        Map<String,String> m2 = new HashMap<String,String>();  
        m2.put("activityId", "000002");  
        m2.put("activityName", "阿斯蒂芬2");  
        Map<String,String> m3 = new HashMap<String,String>();  
        m3.put("activityId", "000003");  
        m3.put("activityName", "阿斯蒂芬3");  
        Map<String,String> m4 = new HashMap<String,String>();  
        m4.put("activityId", "000004");  
        m4.put("activityName", "阿斯蒂芬4");  
        Map<String,String> m5 = new HashMap<String,String>();  
        m5.put("activityId", "000005");  
        m5.put("activityName", "阿斯蒂芬5");  
        list.add(m1);  
        list.add(m2);  
        list.add(m3);  
        list.add(m4);  
        list.add(m5);  
        
        PrintWriter out=response.getWriter();
        String s = JSONArray.fromObject(list).toString();  
        out.print(s);  
        out.close();  
        
		return null;
	}

}
