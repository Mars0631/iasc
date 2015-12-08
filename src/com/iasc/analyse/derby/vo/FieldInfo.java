package com.iasc.analyse.derby.vo;

public class FieldInfo {

	private String fieldName;//表字段名称

	private String fieldType;//表字段类型
	
	//private String description;//字段描述

	private boolean isPrimarykey = false;//是否主键
	
	private boolean isPrimarykeyGenerate = false;//是否主键自增（id generated always as identity）

	private boolean isNotNull = false;//非空
	
	
	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public boolean isPrimarykey() {
		return isPrimarykey;
	}

	public void setPrimarykey(boolean isPrimarykey) {
		this.isPrimarykey = isPrimarykey;
	}

	public boolean isNotNull() {
		return isNotNull;
	}

	public void setNotNull(boolean isNotNull) {
		this.isNotNull = isNotNull;
	}
	
//	public String getDescription() {
//		return description;
//	}
//
//	public void setDescription(String description) {
//		this.description = description;
//	}
	
	public boolean isPrimarykeyGenerate() {
		return isPrimarykeyGenerate;
	}

	public void setPrimarykeyGenerate(boolean isPrimarykeyGenerate) {
		this.isPrimarykeyGenerate = isPrimarykeyGenerate;
	}

	public FieldInfo() {
		super();
	}
	
	

}
