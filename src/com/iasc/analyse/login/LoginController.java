package com.iasc.analyse.login;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.iasc.analyse.derby.dao.DerbyDao;
import com.iasc.analyse.derby.util.CreateTableUtil;
import com.iasc.core.util.SpringContextUtil;

@Controller
public class LoginController {

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ModelAndView login(@RequestParam("uname") String username,
			@RequestParam("upwd") String passwd,HttpServletResponse response) throws IOException {

		// 扫描是否缺表
		if (!CreateTableUtil.checkedTables) {
			DerbyDao dd = (DerbyDao) SpringContextUtil.getBean("derbyDao");
			dd.createTable(new CreateTableUtil().getTableInfoList());

			CreateTableUtil.checkedTables = true;
		}

		if(StringUtils.isEmpty(username) || StringUtils.isEmpty(passwd)){
			
			return null;
		}
		
		String uname = username;
		String upwd = passwd;
		
//		PrintWriter pw=response.getWriter();
//		pw.print("认证成功");
//		pw.close();

		System.out.println("uname:" + uname);
		System.out.println("pwd:" + upwd);
		//return new ModelAndView("redirect:index") ;
		response.sendRedirect("index");
		return null;
	}
	@RequestMapping("/index")
	public String index(){
		return "index";
	}
}
