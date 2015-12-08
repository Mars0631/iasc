/**
 * 
 * Package: com.nsn.sbap.framework.base
 * FileName: JDBCResultSet.java
 * @author lisc
 * @created 2009-8-22
 * 
 * 2009-8-27 
 * 增加public String getString(String colName);方法
 * 增加public double getDouble(String colName);方法
 * 修改人:赵明远
 * 2009-8-29 
 * 增加public int getInt(String colName);方法
 * 增加public char getChar(String colName);方法
 * 修改人:赵明远
 */
package com.iasc.core.base;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 封装查询返回的集合
 * @author lisc
 * @created 2009-8-22
 */
public interface QueryResult {

	/**
	 * 是否还有下一条记录
	 * 
	 * @return
	 * @author lisc
	 * @created 2009-8-22
	 */
	public boolean next();

	/**
	 * 获得当前记录中列名称为colName的值
	 *
	 * @param colName 列名
	 * @return 
	 * @author lisc
	 * @created 2009-8-22
	 */
	public String getColumn(String colName);
	
	public String getString(String colName);
	
	public String getHideMobile(String colName);

	public Date getDate(String colName);

	public Date getTimeStamp(String colName);

	public int getInt(String colName);
	
	public char getChar(String colName);
	
	public long getLong(String colName);
	
	public double getDouble(String colName);
	
	public BigDecimal getBigDecimal(String BigDecimal);
	
	public Map<?,?> getRecord();
	
	public List<?> getList();
	
	/**
	 * 关闭打开的结果集
	 *
	 * @author lisc
	 * @created 2009-8-22
	 */
	public void close();
}
