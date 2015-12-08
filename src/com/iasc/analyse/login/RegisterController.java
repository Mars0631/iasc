package com.iasc.analyse.login;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.iasc.analyse.derby.dao.DerbyDao;
import com.iasc.analyse.derby.util.CreateTableUtil;
import com.iasc.analyse.derby.vo.UserInfo;
import com.iasc.core.util.SpringContextUtil;

public class RegisterController implements Controller {

	private static final int USER_EXITS=1;
	private static final int USER_ADD_SUCCESS=0;
	private static final int USER_ADD_FAILED=-1;
	
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// 扫描是否需要创建表
		if (!CreateTableUtil.checkedTables) {
			DerbyDao dd = (DerbyDao) SpringContextUtil.getBean("derbyDao");
			dd.createTable(new CreateTableUtil().getTableInfoList());

			CreateTableUtil.checkedTables = true;
		}

		if (request != null) {
			UserInfo user=new UserInfo();
			user.setLoginName(request.getParameter("loginName").toString());
			user.setPasswd(request.getParameter("passwd").toString());
			user.setEmail(request.getParameter("email").toString());
			user.setNikeName(request.getParameter("nikeName").toString());
			user.setSex(request.getParameter("sex").toString());

			DerbyDao dd = (DerbyDao) SpringContextUtil.getBean("derbyDao");
			boolean exit=dd.validateUserExits(user);
			PrintWriter pw = response.getWriter();
			
			if(exit){
				pw.print(USER_EXITS);//用户已存在
			}else{
				boolean added=dd.addUser(user);
				if(added){
					pw.print(USER_ADD_SUCCESS);//添加用户成功	
				}else{
					pw.print(USER_ADD_FAILED);//添加用户失败
				}
			}
			pw.close();
		}
		return null;
	}

}
