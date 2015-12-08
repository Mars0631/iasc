package com.iasc.analyse.derby.vo;

public class OperationInfo {

	public OperationInfo() {
	}

	private String operationType;//插入，删除，更新，其他等等。
	
	private String operationSql;//操作sql


	public String getOperationType() {
		return operationType;
	}

	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}

	public String getOperationSql() {
		return operationSql;
	}

	public void setOperationSql(String operationSql) {
		this.operationSql = operationSql;
	}
	
}
