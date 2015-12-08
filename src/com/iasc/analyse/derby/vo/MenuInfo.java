package com.iasc.analyse.derby.vo;

public class MenuInfo {

	private String menuId;//菜单id
	
	private String menuName;//菜单名称
	
	private String parentMenuId;//父菜单

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getParentMenuId() {
		return parentMenuId;
	}

	public void setParentMenuId(String parentMenuId) {
		this.parentMenuId = parentMenuId;
	}

	public MenuInfo(String menuId, String menuName, String parentMenuId) {
		super();
		this.menuId = menuId;
		this.menuName = menuName;
		this.parentMenuId = parentMenuId;
	}

	public MenuInfo() {
		super();
	}

	
}
