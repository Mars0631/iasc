/**
 * 
 * Package: com.nsn.sbap.framework.base
 * FileName: JDBCResultSetSpringImpl.java
 * @author lisc
 * @created 2009-8-22
 */
package com.iasc.core.base;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 封装JDBCTemplate查询返回的List
 * 
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
public class QueryResultSpringImpl implements QueryResult {

	private List<?> list = null;
	public final static String HIDE_CODE = "****";
	
	public List<?> getList(){
		return list;
	}
	
	/**
	 * 用于迭代器的位置指示。
	 */
	private int pos = -1;
	
	public QueryResultSpringImpl(List<?> list) {
		this.list = list;
	}


	public boolean next() {

		int size = list.size();

		if (pos < size - 1) {
			pos++;
			return true;
		} else {
			return false;
		}
	}

	public String getColumn(String colName) {
		Object obj = getColumnExplict(colName);
		return obj != null ? obj.toString().trim() : "";
	}

	public String getString(String colName) {
		return getColumn(colName);
	}
	public String getHideMobile(String colName){
		String namevip = getString(colName);
		String result = namevip;
		if(namevip.length()>7){
			String left = namevip.substring(0, 3);
			String right = namevip.substring(7);
			result = left+HIDE_CODE+right;
		}
		return result;
	}
	public Date getDate(String colName) {
		Object obj = getColumnExplict(colName);
		return (Date) obj;
	}

	public Date getTimeStamp(String colName) {
		Object obj = getColumnExplict(colName);
		return (Date) obj;
	}

	public int getInt(String colName) {
		Object obj = getColumnExplict(colName);
		if (null == obj)
			return 0;
		else
			return ((Number) obj).intValue();
	}
	
	public char getChar(String colName) {
		Object obj = getColumnExplict(colName);
		if (null == obj)
			return 0;
		else
			return ((Character) obj).charValue();
	}
	
	public long getLong(String colName) {
		Object obj = getColumnExplict(colName);
		if (null == obj)
			return 0;
		else
			return ((Number) obj).longValue();
	}

	public double getDouble(String colName) {
		Object obj = getColumnExplict(colName);
		if (null == obj)
			return 0;
		else
			return ((Number) obj).doubleValue();
	}
	
	public BigDecimal getBigDecimal(String colName) {
		Object obj = getColumnExplict(colName);
		if (null == obj)
			return null;
		else
			return new BigDecimal(obj.toString());
	}
	
	public Object getColumnExplict(String colName) {

		Map<?,?> map = (Map<?,?>) list.get(pos);
		return map.get(colName.toUpperCase());
	}

	public Map<?,?> getRecord() {
		Map<?,?> map = (Map<?,?>) list.get(pos);
		return map;
	}
	
	public void first() {
		pos = -1;
	}

	public void close() {
		if (null != list)
			list.clear();
		list = null;
	}

}
