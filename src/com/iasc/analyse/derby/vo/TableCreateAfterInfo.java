package com.iasc.analyse.derby.vo;

import java.util.ArrayList;
import java.util.List;

public class TableCreateAfterInfo {

	public TableCreateAfterInfo() {
	}
	
	private List<OperationInfo> operationList = new ArrayList<OperationInfo>();
	
	private String tableName;
	
	public List<OperationInfo> getOperationList() {
		return operationList;
	}

	public void setOperationList(List<OperationInfo> operationList) {
		this.operationList = operationList;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
}
