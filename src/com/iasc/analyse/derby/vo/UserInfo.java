package com.iasc.analyse.derby.vo;

import java.util.List;

public class UserInfo {

	private String userId; //用户id
	private String loginName; //登录名称
	private String passwd;//登录密码
	private String email;//email
	private String sex;//性别
	private String nikeName;//昵称
	
	private List<RoleInfo> userRoles;//用户角色
	
	public String getLoginName() {
		return loginName;
	}
	public List<RoleInfo> getUserRoles() {
		return userRoles;
	}
	public void setUserRoles(List<RoleInfo> userRoles) {
		this.userRoles = userRoles;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getNikeName() {
		return nikeName;
	}
	public void setNikeName(String nikeName) {
		this.nikeName = nikeName;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public UserInfo(String userId, String loginName, String passwd,
			String email, String sex, String nikeName, List<RoleInfo> userRoles) {
		super();
		this.userId = userId;
		this.loginName = loginName;
		this.passwd = passwd;
		this.email = email;
		this.sex = sex;
		this.nikeName = nikeName;
		this.userRoles = userRoles;
	}
	public UserInfo() {
		super();
	}

}
