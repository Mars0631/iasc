package com.iasc.analyse.derby.dao;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.CannotGetJdbcConnectionException;

import com.iasc.analyse.derby.util.CreateTableUtil;
import com.iasc.analyse.derby.vo.FieldInfo;
import com.iasc.analyse.derby.vo.OperationInfo;
import com.iasc.analyse.derby.vo.RoleInfo;
import com.iasc.analyse.derby.vo.TableCreateAfterInfo;
import com.iasc.analyse.derby.vo.TableInfo;
import com.iasc.analyse.derby.vo.UserInfo;
import com.iasc.core.base.BaseDao;
import com.iasc.core.base.QueryResult;

public class DerbyDao extends BaseDao {

	/**
	 * 创建表
	 * 包含对基础数据的插入，配置详见table_chaining.xml
	 * @param tables
	 */
	public void createTable(List<TableInfo> tables) {
		if (CreateTableUtil.check4TableInfo(tables)) {
			List<TableCreateAfterInfo> tableChaining = new CreateTableUtil()
					.getTableCreateAfterInfoList();

			String createSql = "";
			for (TableInfo table : tables) {
				if (!isTableExists(table.getTableName())) {
					createSql = buildCreateSql(table);
					
					// 创建表
					this.executeSql(createSql);
					//执行创建后操作，例如插入默认角色，插入基础menu等等。
					for (TableCreateAfterInfo chaining : tableChaining) {
						if (table.getTableName()
								.equals(chaining.getTableName())) {
							for (OperationInfo operation : chaining
									.getOperationList()) {
								this.executeSql(operation.getOperationSql());
							}
						}
					}
				}
			}

		}
	}

	/**
	 * 构建表sql
	 * 
	 * @param table
	 * @return
	 */
	private String buildCreateSql(TableInfo table) {

		StringBuffer createSql = new StringBuffer();
		createSql.append("CREATE TABLE " + table.getTableName() + " (");

		StringBuffer columnsInfo = new StringBuffer();
		FieldInfo field;
		for (int i = 0; i < table.getTableFields().size(); i++) {
			field = table.getTableFields().get(i);
			if (field.isPrimarykey()) {
				columnsInfo
						.append(field.getFieldName()
								+ " "
								+ field.getFieldType()
								+ (field.isNotNull() ? " NOT NULL " : "")
								+ (field.isPrimarykeyGenerate() ? " GENERATED ALWAYS AS IDENTITY"
										: ""));
			} else {
				columnsInfo.append(field.getFieldName() + " "
						+ field.getFieldType()
						+ (field.isNotNull() ? " NOT NULL " : ""));
			}
			columnsInfo.append(",");
		}

		String columnsInfoNew = columnsInfo.substring(0,
				columnsInfo.length() - 1);
		createSql.append(columnsInfoNew + ")");
		return createSql.toString();
	}

	/**
	 * 验证表是否存在
	 * 
	 * @param tableName
	 * @return
	 */
	public boolean isTableExists(String tableName) {
		if (!StringUtils.isEmpty(tableName)) {
			DatabaseMetaData meta;
			try {
				meta = this.getConnection().getMetaData();
				ResultSet res = meta.getTables(null, null, null,
						new String[] { "TABLE" });
				Set<String> set = new HashSet<String>();
				while (res.next()) {
					set.add(res.getString("TABLE_NAME"));
				}
				return set.contains(tableName);
			} catch (CannotGetJdbcConnectionException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return false;
	}

	/**
	 * 验证用户是否存在
	 * 
	 * @param user
	 * @return
	 */
	public boolean validateUserExits(UserInfo user) {
		if (user != null) {
			try {
				String sql = "SELECT * FROM C_SYS_USER WHERE LOGIN_NAME='"
						+ user.getLoginName() + "' OR EMAIL='"
						+ user.getEmail() + "'";
				QueryResult rs = this.executeQuery(sql);
				if (rs.next()) {
					return true;
				}
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}

	/**
	 * 添加一个用户
	 * 
	 * @param user
	 * @return
	 */
	public boolean addUser(UserInfo user) {
		if (user != null) {
			try {
				String sql = "INSERT INTO C_SYS_USER(LOGIN_NAME,LOGIN_PWD,NIKE_NAME,EMAIL,SEX) VALUES('"
						+ user.getLoginName()
						+ "','"
						+ user.getPasswd()
						+ "','"
						+ user.getNikeName()
						+ "','"
						+ user.getEmail()
						+ "'," + user.getSex() + ")";
				int result = this.insert(sql);
				if (result > 0) {
					return true;
				}
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}
	
	
	/**
	 * 添加一个角色
	 * @param role
	 * @return
	 */
	public boolean addRole(RoleInfo role) {
		if (role != null) {
			try {
				String sql = "INSERT INTO C_SYS_ROLE(ROLE_NAME,ROLE_DESC) VALUES('"
						+ role.getRoleName()
						+ "','"
						+ role.getRoleDesc()
						+ "')";

				int result = this.insert(sql);
				if (result > 0) {
					return true;
				}
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}
	
	public boolean addUserRole(UserInfo user,List<RoleInfo> roles){
		
		
		return false;
	}

}
