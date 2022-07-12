import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <MUIBreadcrumbs aria-label="breadcrumb">
            {pathnames.length > 0 ? (
            <Link onClick={() => navigate("/")}>Home</Link>
            ) : (
            <Typography>Home</Typography>
            )}
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index+1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                return name !== 'main' ? (isLast ? (<Typography key={name}>{name}</Typography>) : (
                    <Link key={name} onClick={() => navigate(routeTo)}>{name}</Link>
                )) : '';
            })}
        </MUIBreadcrumbs>
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default Breadcrumbs;