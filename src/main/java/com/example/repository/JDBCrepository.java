package com.example.repository;

import com.example.RepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;

@Component
public class JDBCrepository implements RepositoryInterface {

    @Autowired
    private DataSource dataSource;

    @Override
    public void addLog(String Country, String City) throws Exception {
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement("INSERT INTO Log(Country, CityName) VALUES (?,?) ", new String[]{"id"})) {
            ps.setString(1, Country);
            ps.setString(2, City);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new Exception(e);
        }
    }

//
//    public Logs getLog(int LogId) throws Exception {
//        try (Connection conn = dataSource.getConnection();
//             PreparedStatement ps = conn.prepareStatement("SELECT LogID,Country,CityName FROM Log WHERE LogID = ?")) {
//            ps.setInt(1, LogId);
//            try (ResultSet rs = ps.executeQuery()) {
//                if (!rs.next()) return null;
//                else return rsMessage(rs);
//
//            }
//        } catch (SQLException e) {
//            throw new Exception(e);
//        }
//    }
//
//    private Logs rsMessage(ResultSet rs) throws SQLException {
//        return new Logs(
//                rs.getInt("MessageId"),
//                rs.getString("MessageText")
//        );
//    }
//
//    @Override
//    public void addPoints(int quizzedcompleted, int id) throws Exception{
//        try (Connection conn = dataSource.getConnection();
//             PreparedStatement ps = conn.prepareStatement("UPDATE [dbo].[user]" +
//                     "SET CurrentPoints = ? " +
//                     "WHERE id = ?;", new int[] {quizzedcompleted})) {
//            ps.setInt(1, quizzedcompleted);
//            ps.setInt(2, id);
//            ps.executeUpdate();
//        } catch (SQLException e) {
//            throw new Exception(e);
//        }
//
}
