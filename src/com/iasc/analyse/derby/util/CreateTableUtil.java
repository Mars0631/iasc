package com.iasc.analyse.derby.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.iasc.analyse.derby.vo.FieldInfo;
import com.iasc.analyse.derby.vo.OperationInfo;
import com.iasc.analyse.derby.vo.TableCreateAfterInfo;
import com.iasc.analyse.derby.vo.TableInfo;

public class CreateTableUtil{
	
	public static boolean checkedTables=false;
	
	private static String TABLE_FILE_NAME="table.xml";
	private static String TABLE_CHAINING_FILE_NAME="table_chaining.xml";
	
	/**
	 * 读取表配置xml
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public  List<TableInfo> getTableInfoList(){
		SAXReader reader=new SAXReader();
		List<TableInfo> result=new ArrayList<TableInfo>();
		TableInfo tableBean=null;
		List<FieldInfo> fields=null;
		FieldInfo fieldBean=null;
		try {
			File tableXml=new File(CreateTableUtil.class.getClassLoader().getResource("").getPath()+TABLE_FILE_NAME);
			Document doc=reader.read(tableXml);
			Element tableElm=doc.getRootElement();
			List<Element> tableList = tableElm.elements();
			for(Element table:tableList){
				tableBean=new TableInfo();
				fields=new ArrayList<FieldInfo>();
				tableBean.setTableName(table.attributeValue("name"));
				List<Element> fieldList = table.elements();
				for(Element field:fieldList){
					fieldBean=new FieldInfo();
					fieldBean.setFieldName(field.attributeValue("name"));
					fieldBean.setFieldType(field.attributeValue("type"));
					fieldBean.setNotNull(Boolean.parseBoolean(field.attributeValue("isNotNull")));
					fieldBean.setPrimarykey(Boolean.parseBoolean(field.attributeValue("isPrimarykey")));
					fieldBean.setPrimarykeyGenerate(Boolean.parseBoolean(field.attributeValue("isPrimarykeyGenerate")));
					fields.add(fieldBean);
				}
				tableBean.setTableFields(fields);
				result.add(tableBean);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * 读取table_chainng配置信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<TableCreateAfterInfo> getTableCreateAfterInfoList(){
			SAXReader reader=new SAXReader();
			List<TableCreateAfterInfo> result=new ArrayList<TableCreateAfterInfo>();
			TableCreateAfterInfo tca;	
			OperationInfo operation;
			List<OperationInfo> operations=null;
			try {
				File tableXml=new File(CreateTableUtil.class.getClassLoader().getResource("").getPath()+TABLE_CHAINING_FILE_NAME);
				Document doc=reader.read(tableXml);
				Element tableElm=doc.getRootElement();
				List<Element> tableList = tableElm.elements();
				for(Element table:tableList){
					tca=new TableCreateAfterInfo();
					tca.setTableName(table.attributeValue("name"));
					operations=new ArrayList<OperationInfo>();
					List<Element> opts=table.elements();
					for(Element opt:opts){
						operation=new OperationInfo();
						operation.setOperationType(opt.getName());
						operation.setOperationSql(opt.attributeValue("sql"));
						operations.add(operation);
					}
					tca.setOperationList(operations);
					result.add(tca);
				}
			} catch (Exception e) {
				e.printStackTrace(); 
			}
			
			return result;
	 }
	
	
	/**
	 * 简单判断表信息是否满足生产表结构（v1.0:非空判断）
	 * @param tables
	 * @return
	 */
	public static boolean check4TableInfo(List<TableInfo> tables){
		if(tables!=null && tables.size()>0){
			for(TableInfo table: tables){
				if(StringUtils.isEmpty(table.getTableName())){
					System.out.println("Table Name is null!!");
					return false;
				}
				
				if(table.getTableFields().size()>0){
					for(FieldInfo field:table.getTableFields()){
						if(StringUtils.isEmpty(field.getFieldName())){
							System.out.println("Table fieldName is null!");
							return false;
						}
						if(StringUtils.isEmpty(field.getFieldType())){
							System.out.println("Tabel fieldType is null!");
							return false;
						}
						
						if(!field.isPrimarykey() && field.isPrimarykeyGenerate()){
							System.out.println("When PrimaryKey has not set, it cann't use primary key generate.");
							return false;
						}
					}
				}
			}
		}
		
		return true;
	}
	

	public static void main(String[] args) {
		List<TableCreateAfterInfo> result=new CreateTableUtil().getTableCreateAfterInfoList();
		
		System.out.println(result.size());
	}
	
	
}
