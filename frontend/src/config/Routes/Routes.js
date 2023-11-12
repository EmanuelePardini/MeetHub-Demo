import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register, Home, PersonalArea, AddEvent, Demo, V1, FilteredSearch } from "../../pages";
import withAuth from "../../components/withAuth/withAuth";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/personal-area" element={<ProtectedRoute component={PersonalArea} />} />
        <Route path="/filtered-search" element={<ProtectedRoute component={FilteredSearch} />} />
        <Route path="/add-event" element={<ProtectedRoute component={AddEvent} />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/demo" element={<ProtectedRoute component={Demo} />} />
        <Route path="/v1" element={<ProtectedRoute component={V1} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ component }) {
  const Component = withAuth(component);

  return <Component />;
}

function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default AppRoutes;
