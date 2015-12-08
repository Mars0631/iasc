package com.iasc.core.base;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class BaseDao extends JdbcDaoSupport {

	public QueryResult executeQuery(String sql) throws DataAccessException {
		System.out.println("Run SQL:" + sql.toString());

		List<?> result = getJdbcTemplate().queryForList(sql);

		return new QueryResultSpringImpl(result);
	}

	public void executeSql(String sql) throws DataAccessException {

		getJdbcTemplate().execute(sql);

	}

	public int insert(String sql) {
		return this.update(sql);
	}

	public int insert(StringBuffer sql) {
		return this.update(sql.toString());
	}

	public int delete(String sql) {
		return this.update(sql);
	}

	public int delete(StringBuffer sql) {
		return this.update(sql.toString());
	}

	public int insert(String sql, final Object[] args) {
		return this.update(sql, args);
	}

	public int delete(String sql, final Object[] args) {
		return this.update(sql, args);
	}

	public int update(String sql) throws DataAccessException {

		int updateSize = getJdbcTemplate().update(sql);

		return updateSize;
	}

	public int update(String sql, Object[] args) throws DataAccessException {

		int updateSize = getJdbcTemplate().update(sql, args);

		return updateSize;
	}
}
