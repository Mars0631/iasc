package com.iasc.analyse.derby.vo;

import java.util.ArrayList;
import java.util.List;

public class TableInfo {

	
	private String tableName;//表名称
	
	private List<FieldInfo> tableFields=new ArrayList<FieldInfo>();//字段集合

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public List<FieldInfo> getTableFields() {
		return tableFields;
	}

	public void setTableFields(List<FieldInfo> tableFields) {
		this.tableFields = tableFields;
	}
	
	
	
}
