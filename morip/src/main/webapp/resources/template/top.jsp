<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${memEmail eq null}">
  <jsp:include page="header.jsp"/>
</c:if>      

<c:if test="${memEmail ne null }">
  <jsp:include page="header2.jsp"/>   
</c:if>      
